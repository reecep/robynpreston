import { client } from './sanity'

// ---------------------------------------------------------------------------
// Packages
// ---------------------------------------------------------------------------

export async function getAllPackages() {
  return client.fetch(`
    *[_type == "packages"] | order(_createdAt asc) {
      _id, title,
      "slug": slug.current,
      content, totalDays, lowestPrice, testimonial,
      "bannerUrl": bannerImage.asset->url,
      "coverUrl": coverImage.asset->url,
    }
  `)
}

export async function getPackageBySlug(slug: string) {
  return client.fetch(`
    *[_type == "packages" && slug.current == $slug][0] {
      _id, title,
      "slug": slug.current,
      content, totalDays, lowestPrice, testimonial,
      lowSeasonDates, highSeasonDates,
      lowSeasonRates, highSeasonRates,
      "bannerUrl": bannerImage.asset->url,
      "coverUrl": coverImage.asset->url,
      days[] {
        number, title, description,
        "imageUrl": image.asset->url,
      },
      includes, excludes,
    }
  `, { slug })
}

export async function getPackageSlugs() {
  return client.fetch(`*[_type == "packages"]{ "slug": slug.current }`)
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

export async function getPostsByCategory(category: string) {
  return client.fetch(`
    *[_type == "posts" && category == $category] | order(date desc) {
      _id, title,
      "slug": slug.current,
      date, category, excerpt,
      "firstImage": featuredImage.asset->url,
    }
  `, { category })
}

export async function getPostBySlug(slug: string) {
  return client.fetch(`
    *[_type == "posts" && slug.current == $slug][0] {
      _id, title,
      "slug": slug.current,
      date, category, excerpt, htmlContent,
      "firstImage": featuredImage.asset->url,
    }
  `, { slug })
}

export async function getPostSlugsByCategory(category: string) {
  return client.fetch(
    `*[_type == "posts" && category == $category]{ "slug": slug.current }`,
    { category }
  )
}

// ---------------------------------------------------------------------------
// Singletons
// ---------------------------------------------------------------------------

export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      siteTitle, tagline, email, facebookUrl, heroHeading, heroSubtext,
      "heroImageUrl": heroImage.asset->url,
    }
  `)
}

export async function getAboutPage() {
  return client.fetch(`
    *[_type == "aboutPage"][0] {
      bio, mediaFeatures,
      "portraitUrl": portraitImage.asset->url,
    }
  `)
}

export async function getWhyUsPage() {
  return client.fetch(`
    *[_type == "whyUsPage"][0] {
      highlights, sections,
      "bannerUrl": bannerImage.asset->url,
    }
  `)
}
