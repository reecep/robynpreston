/**
 * Import all content from JSON data files into Sanity,
 * migrating images from WordPress CDN to Sanity assets.
 *
 * Usage: node scripts/import-to-sanity.mjs
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const PROJECT_ID = 'cqw1iau6'
const DATASET = 'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!TOKEN) {
  console.error('❌  SANITY_API_TOKEN env var is required')
  console.error('    Run: SANITY_API_TOKEN=your_token node scripts/import-to-sanity.mjs')
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
// Image uploader
// ---------------------------------------------------------------------------

const imageCache = new Map()

async function uploadImage(url) {
  if (!url) return null
  if (imageCache.has(url)) return imageCache.get(url)

  try {
    console.log(`  📸 Uploading image: ${url.split('/').pop()}`)
    const res = await fetch(url)
    if (!res.ok) {
      console.warn(`  ⚠️  Could not fetch image (${res.status}): ${url}`)
      return null
    }
    const buffer = await res.arrayBuffer()
    const contentType = res.headers.get('content-type') || 'image/jpeg'
    const filename = url.split('/').pop()

    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename,
      contentType,
    })

    const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
    imageCache.set(url, ref)
    return ref
  } catch (err) {
    console.warn(`  ⚠️  Failed to upload image: ${url} — ${err.message}`)
    return null
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function stripHtml(html) {
  return (html || '').replace(/<[^>]*>/g, '').trim()
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

// ---------------------------------------------------------------------------
// Import packages
// ---------------------------------------------------------------------------

async function importPackages() {
  console.log('\n📦 Importing packages...')
  const packages = JSON.parse(readFileSync(join(ROOT, 'data/packages.json'), 'utf8'))

  for (const pkg of packages) {
    console.log(`\n  → ${pkg.title}`)

    const [bannerImage, coverImage] = await Promise.all([
      uploadImage(pkg.bannerUrl),
      uploadImage(pkg.coverUrl),
    ])

    const days = await Promise.all(
      (pkg.days || []).map(async (day) => ({
        _key: `day-${Math.random().toString(36).slice(2, 9)}`,
        number: day.number,
        title: day.title,
        description: day.description || '',
        image: await uploadImage(day.imageUrl),
      }))
    )

    const doc = {
      _id: `packages-${pkg.slug}`,
      _type: 'packages',
      title: pkg.title,
      slug: { _type: 'slug', current: pkg.slug },
      content: stripHtml(pkg.content),
      totalDays: String(pkg.totalDays || ''),
      lowestPrice: String(pkg.lowestPrice || ''),
      bannerImage,
      coverImage,
      testimonial: pkg.testimonial || '',
      lowSeasonDates: pkg.lowSeasonDates || '',
      highSeasonDates: pkg.highSeasonDates || '',
      lowSeasonRates: (pkg.lowSeasonRates || []).map((r, i) => ({
        _key: `low-${i}`,
        people: r.people,
        pricePerPerson: r.pricePerPerson,
      })),
      highSeasonRates: (pkg.highSeasonRates || []).map((r, i) => ({
        _key: `high-${i}`,
        people: r.people,
        pricePerPerson: r.pricePerPerson,
      })),
      days: days.filter(Boolean),
      includes: pkg.includes || [],
      excludes: pkg.excludes || [],
    }

    await client.createOrReplace(doc)
    console.log(`  ✅ ${pkg.title}`)
    await sleep(300)
  }
}

// ---------------------------------------------------------------------------
// Import posts
// ---------------------------------------------------------------------------

async function importPosts() {
  console.log('\n📝 Importing posts...')
  const posts = JSON.parse(readFileSync(join(ROOT, 'data/posts.json'), 'utf8'))

  for (const post of posts) {
    console.log(`  → ${post.title}`)

    const featuredImage = await uploadImage(post.firstImage)

    const doc = {
      _id: `posts-${post.slug}`,
      _type: 'posts',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      date: post.date,
      category: post.categories?.[0] || 'Stories',
      featuredImage,
      excerpt: post.excerpt || '',
      htmlContent: post.content || '',
    }

    await client.createOrReplace(doc)
    await sleep(100)
  }
  console.log(`  ✅ ${posts.length} posts imported`)
}

// ---------------------------------------------------------------------------
// Import singleton pages
// ---------------------------------------------------------------------------

async function importSingletons() {
  console.log('\n⚙️  Importing singleton pages...')

  // siteSettings
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: 'REP Kenya Safaris',
    tagline: 'Robyn E. Preston',
    email: 'robyn@robynpreston.com',
    facebookUrl: 'https://www.facebook.com/rep.kenya.safaris',
    heroImage: await uploadImage('http://www.robynpreston.com/wp-content/uploads/2019/01/robyn-preston-in-kenya.jpg'),
    heroHeading: 'Kenya Safari Experiences',
    heroSubtext: "Small, boutique and personal. I'll be with you from airport arrival to farewell departure — making your African dream a reality.",
  })
  console.log('  ✅ siteSettings')

  // aboutPage
  const portraitImage = await uploadImage('http://www.robynpreston.com/wp-content/uploads/2019/01/rep-portrait.jpg')
  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    bio: `Growing up on a farm in Arapohue, Northland, New Zealand, it was inevitable really that I would run around outside with bare feet. Even to this day I am not an indoors kind of person. The fresh air and sunshine is still my favourite space as I enjoy the wild places of Africa.

My first journey to the African continent was in 2009 when I travelled overland through ten different countries. Since then, except in 2011, I have revisited annually and extended two more African countries within my visits. My horizons have broadened each time to include not only travel, but two volunteer wildlife conservation programs. My passion now lies with Kenya and this is where I base myself for six to seven months of the year.

Some years back I formed a Facebook page to show my wildlife photography. It grew to the stage where I was asked if I did safari tours. At that point, hosting tours had not entered my mind. After some thought, however, in 2014 I ventured off with a friend to see if I could do this. It was the beginning of where I am today. In 2015 I formed my own safari company specialising in handcrafted safari itineraries for people around the world. This has now gone on, through fine tuning those experiences and my own, into offering packages for those that prefer that option.

When I'm not hosting safaris with guests, I am out doing my wildlife photography. My images have been recognised in numerous publications globally through two media companies I am involved with in England. I have been published in a magazine in India and I have also been chosen as a finalist in several international photography competitions. I have been featured in two New Zealand magazines plus two TV appearances. All of this centred on what I do in Africa, where I started and where I am today.

I look forward to where this journey leads me!`,
    portraitImage,
    mediaFeatures: [
      'New Zealand Herald',
      'Australian Women\'s Weekly NZ',
      'Radio New Zealand National',
      'TV3 Newsworthy',
      'Virgin Unite',
      'Saving the Wild',
      'Chiiz Magazine (India)',
      'Overlanding Africa',
    ],
  })
  console.log('  ✅ aboutPage')

  // whyUsPage
  const whyBannerImage = await uploadImage('http://www.robynpreston.com/wp-content/uploads/2019/01/about-robyn-preston-kenya-safaris.jpg')
  await client.createOrReplace({
    _id: 'whyUsPage',
    _type: 'whyUsPage',
    bannerImage: whyBannerImage,
    highlights: [
      { _key: 'h1', icon: '🦁', label: 'Personally hosted by Robyn end-to-end' },
      { _key: 'h2', icon: '🚙', label: 'Experienced KATO-bonded driver/guide' },
      { _key: 'h3', icon: '📍', label: 'Off-road licence access in Maasai Mara' },
      { _key: 'h4', icon: '🕐', label: 'Your time at sightings is up to you' },
      { _key: 'h5', icon: '🌿', label: 'Small groups for an intimate experience' },
      { _key: 'h6', icon: '📸', label: 'Photography-focused game drives' },
    ],
    sections: [
      {
        _key: 's1',
        title: 'Who is REP Kenya Safaris?',
        body: "We are a small boutique company dedicated to making your safari experience in Kenya a wonderful memory you will treasure. I will personally meet you at the airport upon arrival and be with you throughout your whole journey up until our farewell departure at the airport. Everything will be taken care of for your stay in Kenya. I can assist with organising pre/post accommodation and any extra activities you are interested in doing outside of your safari. All you need to do is come, relax and enjoy!",
      },
      {
        _key: 's2',
        title: 'Our Itineraries',
        body: "Our itineraries have been fine tuned based on experiences I have had on my wildlife photographic journey in past years. You have the choice of a handcrafted personal itinerary or an already planned safari package. It's up to you. We cater to single and group travellers. On our game drives, our day is not dictated by using the same routes each time as other companies do. Our aim is to find our guests the best wildlife encounters at any given time and to get you in the best position possible for your photos. In Maasai Mara it is possible to obtain an off road licence if you request. This will allow us to go places others are not permitted. Your time spent at each sighting is up to you; whether that be five minutes or five hours. Flexibility is key here.",
      },
      {
        _key: 's3',
        title: 'Safari Locations',
        body: "Our location order has been carefully chosen to minimise transit times between places. We believe your time in Kenya should be maximised on safari not travelling on a public road. And each location is completely different to the next which makes our itineraries interesting. Along the way you will also experience the palette of colour that is true Africa. There is opportunity to visit both Maasai and Samburu villages if you would like and to embrace their cultures.",
      },
      {
        _key: 's4',
        title: 'Accommodation',
        body: "All our accommodations are clean and comfortable with hot showers and comfy beds. You'll even find a hot water bottle tucked in the sheets on cold nights! The food is plentiful and we can request special requirements for those with food allergies. There's always a cold bevvie to enjoy at the end of the game drive as you relax before dinner with myself and your travel companions. Sharing your daily safari experiences with a good laugh and a vino is food for the soul. We are here to make your safari experience in Kenya as relaxed and enjoyable as possible.",
      },
    ],
  })
  console.log('  ✅ whyUsPage')
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('🚀 Starting Sanity import...')
  console.log(`   Project: ${PROJECT_ID} / ${DATASET}\n`)

  try {
    await importPackages()
    await importPosts()
    await importSingletons()
    console.log('\n🎉 Import complete!')
  } catch (err) {
    console.error('\n❌ Import failed:', err)
    process.exit(1)
  }
}

main()
