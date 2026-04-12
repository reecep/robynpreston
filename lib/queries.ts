import { client } from './sanity'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SanityPackageSummary = {
  _id: string
  title: string
  slug: string
  content: string
  totalDays: string
  lowestPrice: string
  testimonial: string
  bannerUrl: string | null
  coverUrl: string | null
}

export type SanityPackage = SanityPackageSummary & {
  lowSeasonDates: string | null
  highSeasonDates: string | null
  lowSeasonRates: { people: string; pricePerPerson: string }[]
  highSeasonRates: { people: string; pricePerPerson: string }[]
  days: { number: string; title: string; description: string; imageUrl: string | null }[]
  includes: string[]
  excludes: string[]
}

export type SanityPost = {
  _id: string
  title: string
  slug: string
  date: string
  category: string
  excerpt: string
  firstImage: string | null
}

export type SanityPostFull = SanityPost & {
  htmlContent: string
  body: unknown[] | null
}

export type SanitySettings = {
  siteTitle: string
  tagline: string
  email: string
  facebookUrl: string
  instagramUrl: string
  heroHeading: string
  heroSubtext: string
  heroImageUrl: string | null
  heroVideoUrl: string | null
  logoUrl: string | null
  contactImageUrl: string | null
  faviconUrl: string | null
}

export type SanityAboutPage = {
  bio: string
  mediaFeatures: string[]
  portraitUrl: string | null
}

export type SanityWhyUsPage = {
  highlights: { icon: string; label: string }[]
  sections: { title: string; body: string }[]
  bannerUrl: string | null
}

export type SanityPageIntro = {
  bannerUrl: string | null
  introHeading: string | null
  introText: string | null
}

export type SanityReview = {
  _id: string
  reviewerName: string
  quote: string
  packageTitle: string | null
  packageSlug: string | null
  date: string | null
  rating: number | null
}

export type SanityHomePage = {
  whyUsHeading: string | null
  whyUsBackgroundImageUrl: string | null
  whyUsItems: string[] | null
  testimonialsHeading: string | null
  testimonials: { quote: string; packageLabel: string }[] | null
  aboutPreviewImageUrl: string | null
  aboutPreviewHeading: string | null
  aboutPreviewText: string | null
}

// ---------------------------------------------------------------------------
// Packages
// ---------------------------------------------------------------------------

export async function getAllPackages(): Promise<SanityPackageSummary[]> {
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

export async function getPackageBySlug(slug: string): Promise<SanityPackage | null> {
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

export async function getPackageSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`*[_type == "packages"]{ "slug": slug.current }`)
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

export async function getPostsByCategory(category: string): Promise<SanityPost[]> {
  return client.fetch(`
    *[_type == "posts" && category == $category] | order(date desc) {
      _id, title,
      "slug": slug.current,
      date, category, excerpt,
      "firstImage": featuredImage.asset->url,
    }
  `, { category })
}

export async function getPostBySlug(slug: string): Promise<SanityPostFull | null> {
  return client.fetch(`
    *[_type == "posts" && slug.current == $slug][0] {
      _id, title,
      "slug": slug.current,
      date, category, excerpt, htmlContent, body,
      "firstImage": featuredImage.asset->url,
    }
  `, { slug })
}

export async function getPostSlugsByCategory(category: string): Promise<{ slug: string }[]> {
  return client.fetch(
    `*[_type == "posts" && category == $category]{ "slug": slug.current }`,
    { category }
  )
}

// ---------------------------------------------------------------------------
// Singletons
// ---------------------------------------------------------------------------

export async function getSiteSettings(): Promise<SanitySettings | null> {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      siteTitle, tagline, email, facebookUrl, instagramUrl,
      heroHeading, heroSubtext,
      "heroImageUrl": heroImage.asset->url,
      "heroVideoUrl": heroVideo.asset->url,
      "logoUrl": logo.asset->url,
      "contactImageUrl": contactImage.asset->url,
      "faviconUrl": favicon.asset->url,
    }
  `)
}

export async function getAboutPage(): Promise<SanityAboutPage | null> {
  return client.fetch(`
    *[_type == "aboutPage"][0] {
      bio, mediaFeatures,
      "portraitUrl": portraitImage.asset->url,
    }
  `)
}

export async function getPackagesPage(): Promise<SanityPageIntro | null> {
  return client.fetch(`
    *[_type == "packagesPage"][0] {
      "bannerUrl": bannerImage.asset->url,
      introHeading, introText,
    }
  `)
}

export async function getStoriesPage(): Promise<SanityPageIntro | null> {
  return client.fetch(`
    *[_type == "storiesPage"][0] {
      "bannerUrl": bannerImage.asset->url,
      introHeading, introText,
    }
  `)
}

export async function getReviewsPage(): Promise<{ bannerUrl: string | null; introText: string | null } | null> {
  return client.fetch(`
    *[_type == "reviewsPage"][0] {
      "bannerUrl": bannerImage.asset->url,
      introText,
    }
  `)
}

export async function getContactPage(): Promise<{ bannerUrl: string | null; introText: string | null } | null> {
  return client.fetch(`
    *[_type == "contactPage"][0] {
      "bannerUrl": bannerImage.asset->url,
      introText,
    }
  `)
}

export async function getReviews(): Promise<SanityReview[]> {
  return client.fetch(`
    *[_type == "reviews"] | order(date desc) {
      _id, reviewerName, quote, date, rating,
      "packageTitle": package->title,
      "packageSlug": package->slug.current,
    }
  `)
}

export async function getHomePage(): Promise<SanityHomePage | null> {
  return client.fetch(`
    *[_type == "homePage"][0] {
      whyUsHeading,
      "whyUsBackgroundImageUrl": whyUsBackgroundImage.asset->url,
      whyUsItems,
      testimonialsHeading, testimonials,
      "aboutPreviewImageUrl": aboutPreviewImage.asset->url,
      aboutPreviewHeading, aboutPreviewText,
    }
  `)
}

export async function getWhyUsPage(): Promise<SanityWhyUsPage | null> {
  return client.fetch(`
    *[_type == "whyUsPage"][0] {
      highlights, sections,
      "bannerUrl": bannerImage.asset->url,
    }
  `)
}
