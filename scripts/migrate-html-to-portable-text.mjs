/**
 * One-off migration: convert htmlContent (WordPress HTML) → body (Portable Text)
 * for all posts that don't yet have a body field.
 *
 * Usage (Windows CMD):
 *   set SANITY_API_TOKEN=your_token
 *   node scripts/migrate-html-to-portable-text.mjs
 *
 * Usage (Mac/Linux/PowerShell):
 *   SANITY_API_TOKEN=your_token node scripts/migrate-html-to-portable-text.mjs
 *
 * Safe to re-run: skips posts that already have body content.
 * Never modifies or deletes htmlContent.
 */

import { createClient } from '@sanity/client'
import { parseDocument, DomUtils } from 'htmlparser2'
import { randomBytes } from 'crypto'

const PROJECT_ID = 'cqw1iau6'
const DATASET = 'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!TOKEN) {
  console.error('❌  SANITY_API_TOKEN env var is required')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function rk() {
  return randomBytes(6).toString('hex')
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

// ---------------------------------------------------------------------------
// Image upload (same pattern as import script)
// ---------------------------------------------------------------------------

const imageCache = new Map()

async function uploadImage(url) {
  if (!url) return null
  const clean = url.split('?')[0]
  if (imageCache.has(clean)) return imageCache.get(clean)

  try {
    console.log(`    📸 Uploading: ${clean.split('/').pop()}`)
    const res = await fetch(clean)
    if (!res.ok) {
      console.warn(`    ⚠️  Fetch failed (${res.status}): ${clean}`)
      return null
    }
    const buffer = await res.arrayBuffer()
    const contentType = res.headers.get('content-type') || 'image/jpeg'
    const filename = clean.split('/').pop()
    const asset = await client.assets.upload('image', Buffer.from(buffer), { filename, contentType })
    const ref = { _type: 'reference', _ref: asset._id }
    imageCache.set(clean, ref)
    return ref
  } catch (err) {
    console.warn(`    ⚠️  Upload failed: ${clean} — ${err.message}`)
    return null
  }
}

// ---------------------------------------------------------------------------
// Inline collector — walks nodes within a block and builds spans + markDefs
// ---------------------------------------------------------------------------

function collectInline(nodes, activeMarks, markDefs) {
  const spans = []

  for (const node of nodes) {
    if (node.type === 'text') {
      // Normalise whitespace but preserve single spaces
      const text = node.data.replace(/[\r\n\t]+/g, ' ')
      if (text) {
        spans.push({ _type: 'span', _key: rk(), text, marks: [...activeMarks] })
      }
    } else if (node.type === 'tag') {
      const tag = node.name.toLowerCase()

      if (tag === 'strong' || tag === 'b') {
        spans.push(...collectInline(node.children, [...activeMarks, 'strong'], markDefs))
      } else if (tag === 'em' || tag === 'i') {
        spans.push(...collectInline(node.children, [...activeMarks, 'em'], markDefs))
      } else if (tag === 'a') {
        const href = node.attribs?.href
        if (href) {
          const linkKey = rk()
          markDefs.push({ _type: 'link', _key: linkKey, href })
          spans.push(...collectInline(node.children, [...activeMarks, linkKey], markDefs))
        } else {
          spans.push(...collectInline(node.children, activeMarks, markDefs))
        }
      } else if (tag === 'br') {
        spans.push({ _type: 'span', _key: rk(), text: '\n', marks: [] })
      } else if (tag === 'img') {
        // Inline image inside a paragraph — treat as block-level pending image
        // (returned as a special marker; caller handles it)
        spans.push({ _type: '__inline_img__', src: node.attribs?.src, alt: node.attribs?.alt || '' })
      } else {
        // Unwrap unknown inline tags
        spans.push(...collectInline(node.children, activeMarks, markDefs))
      }
    }
  }

  return spans
}

// ---------------------------------------------------------------------------
// Build a text block from DOM nodes (handles inline marks)
// ---------------------------------------------------------------------------

function makeTextBlock(style, nodes, listItem, level) {
  const markDefs = []
  const rawChildren = collectInline(nodes, [], markDefs)

  // Split out any __inline_img__ markers so they become their own blocks later
  const pendingImages = rawChildren.filter(c => c._type === '__inline_img__')
  const children = rawChildren.filter(c => c._type !== '__inline_img__')

  const block = {
    _type: 'block',
    _key: rk(),
    style,
    markDefs,
    children: children.length ? children : [{ _type: 'span', _key: rk(), text: '', marks: [] }],
  }

  if (listItem) {
    block.listItem = listItem
    block.level = level
  }

  return { block, pendingImages }
}

// ---------------------------------------------------------------------------
// Top-level DOM walker — returns an array of mixed blocks and pending images
// ---------------------------------------------------------------------------

function walkNodes(nodes, depth = 0) {
  const results = [] // each item: { kind: 'block'|'pending_image', ... }

  for (const node of nodes) {
    if (node.type === 'text') {
      const text = node.data.replace(/[\r\n\t]+/g, ' ').trim()
      if (text && depth === 0) {
        results.push({
          kind: 'block',
          block: {
            _type: 'block',
            _key: rk(),
            style: 'normal',
            markDefs: [],
            children: [{ _type: 'span', _key: rk(), text, marks: [] }],
          },
        })
      }
      continue
    }

    if (node.type !== 'tag') continue

    const tag = node.name.toLowerCase()

    // Skip non-content tags
    if (['script', 'style', 'noscript', 'head', 'meta', 'link'].includes(tag)) continue

    if (tag === 'p') {
      const { block, pendingImages } = makeTextBlock('normal', node.children, null, null)
      const innerText = block.children.map(c => c.text || '').join('').trim()
      if (innerText) results.push({ kind: 'block', block })
      for (const pi of pendingImages) {
        results.push({ kind: 'pending_image', src: pi.src, alt: pi.alt })
      }

    } else if (tag === 'h1' || tag === 'h2') {
      const { block } = makeTextBlock('h2', node.children, null, null)
      results.push({ kind: 'block', block })

    } else if (tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6') {
      const { block } = makeTextBlock('h3', node.children, null, null)
      results.push({ kind: 'block', block })

    } else if (tag === 'ul') {
      for (const li of node.children.filter(n => n.type === 'tag' && n.name === 'li')) {
        const { block } = makeTextBlock('normal', li.children, 'bullet', 1)
        results.push({ kind: 'block', block })
      }

    } else if (tag === 'ol') {
      for (const li of node.children.filter(n => n.type === 'tag' && n.name === 'li')) {
        const { block } = makeTextBlock('normal', li.children, 'number', 1)
        results.push({ kind: 'block', block })
      }

    } else if (tag === 'img') {
      const src = node.attribs?.src
      if (src) results.push({ kind: 'pending_image', src, alt: node.attribs?.alt || '' })

    } else if (tag === 'figure') {
      // May contain img + figcaption
      const imgNode = DomUtils.findOne(n => n.type === 'tag' && n.name === 'img', node.children)
      const captionNode = DomUtils.findOne(n => n.type === 'tag' && n.name === 'figcaption', node.children)
      if (imgNode?.attribs?.src) {
        results.push({
          kind: 'pending_image',
          src: imgNode.attribs.src,
          alt: imgNode.attribs?.alt || '',
          caption: captionNode ? DomUtils.textContent(captionNode).trim() : '',
        })
      }

    } else if (['div', 'section', 'article', 'main', 'aside', 'blockquote', 'figure'].includes(tag)) {
      // Recurse into container elements
      results.push(...walkNodes(node.children, depth + 1))

    } else if (tag === 'br') {
      // Skip standalone br at block level

    } else if (tag === 'a' && !node.children.length) {
      // Skip empty anchor tags (WordPress sometimes inserts these)

    } else {
      // Unknown tag — try to extract as a plain text block if it has text
      const text = DomUtils.textContent(node).trim()
      if (text) {
        results.push({
          kind: 'block',
          block: {
            _type: 'block',
            _key: rk(),
            style: 'normal',
            markDefs: [],
            children: [{ _type: 'span', _key: rk(), text, marks: [] }],
          },
        })
      }
    }
  }

  return results
}

// ---------------------------------------------------------------------------
// Strip WordPress shortcodes and clean up HTML before parsing
// ---------------------------------------------------------------------------

function preprocessHtml(html) {
  return (html || '')
    // [caption ...]<img...>caption text[/caption] → keep inner content
    .replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/g, '$1')
    // Remove all remaining shortcodes
    .replace(/\[[a-zA-Z_-][^\]]*\/?\]/g, '')
    .replace(/\[\/[a-zA-Z_-]+\]/g, '')
    // WordPress alignment classes sometimes wrap content in divs with style — leave for parser
    .trim()
}

// ---------------------------------------------------------------------------
// Main converter: HTML string → Portable Text array
// ---------------------------------------------------------------------------

async function htmlToPortableText(html) {
  const cleaned = preprocessHtml(html)
  if (!cleaned) return []

  const dom = parseDocument(cleaned, { decodeEntities: true })
  const pending = walkNodes(dom.children)

  const blocks = []

  for (const item of pending) {
    if (item.kind === 'block') {
      blocks.push(item.block)
    } else if (item.kind === 'pending_image') {
      const assetRef = await uploadImage(item.src)
      if (assetRef) {
        blocks.push({
          _type: 'image',
          _key: rk(),
          asset: assetRef,
          alt: item.alt || '',
          ...(item.caption ? { caption: item.caption } : {}),
        })
      } else {
        // Image upload failed — insert a text note so nothing is silently lost
        console.warn(`    ⚠️  Could not upload image, inserting URL as text: ${item.src}`)
        blocks.push({
          _type: 'block',
          _key: rk(),
          style: 'normal',
          markDefs: [],
          children: [{ _type: 'span', _key: rk(), text: `[Image: ${item.src}]`, marks: [] }],
        })
      }
    }
  }

  return blocks
}

// ---------------------------------------------------------------------------
// Migration runner
// ---------------------------------------------------------------------------

async function migrate() {
  console.log('🚀  Starting HTML → Portable Text migration...\n')

  const posts = await client.fetch(
    `*[_type == "posts" && defined(htmlContent) && htmlContent != "" && (!defined(body) || length(body) == 0)]{ _id, title, htmlContent }`
  )

  if (posts.length === 0) {
    console.log('✅  No posts need migrating (all either have body or no htmlContent).')
    return
  }

  console.log(`📝  Found ${posts.length} post(s) to migrate.\n`)

  let success = 0
  let failed = 0

  for (const post of posts) {
    console.log(`  → "${post.title}"`)
    try {
      const body = await htmlToPortableText(post.htmlContent)

      if (body.length === 0) {
        console.log(`    ⚠️  No blocks generated — skipping patch`)
        failed++
        continue
      }

      await client.patch(post._id).set({ body }).commit()
      console.log(`    ✅  ${body.length} block(s) written`)
      success++
    } catch (err) {
      console.error(`    ❌  Failed: ${err.message}`)
      failed++
    }

    await sleep(200)
  }

  console.log(`\n🎉  Done! ${success} migrated, ${failed} failed/skipped.`)
  if (failed > 0) {
    console.log('    Review the warnings above for posts that need manual attention.')
  }
}

migrate().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
