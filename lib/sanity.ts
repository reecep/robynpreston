import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
export const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

const builder = imageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

/**
 * Appends Sanity CDN image transformation params to a resolved asset URL.
 * Non-Sanity URLs (e.g. legacy WordPress) are returned unchanged.
 */
export function sanityImageUrl(
  url: string | null | undefined,
  width: number,
  quality = 80
): string | null {
  if (!url) return null
  if (!url.includes('cdn.sanity.io')) return url
  return `${url}?w=${width}&q=${quality}&fm=webp&fit=max`
}
