export const siteUrl = "https://www.robynpreston.com";
export const siteName = "REP Kenya Safaris";

/** Absolute URL for a site-relative path, e.g. "/packages" -> "https://www.robynpreston.com/packages" */
export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

type BreadcrumbItem = { name: string; path: string };

/** JSON-LD BreadcrumbList schema for a page's position in the site hierarchy. */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

type ReviewItem = {
  reviewerName: string;
  quote: string;
  rating: number | null;
  date: string | null;
};

/** JSON-LD Review + AggregateRating schema for the reviews page. */
export function reviewsSchema(reviews: ReviewItem[]) {
  const rated = reviews.filter((r) => r.rating);
  const aggregateRating =
    rated.length > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: (
            rated.reduce((sum, r) => sum + (r.rating || 0), 0) / rated.length
          ).toFixed(1),
          reviewCount: rated.length,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteName,
    url: siteUrl,
    ...(aggregateRating ? { aggregateRating } : {}),
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.reviewerName },
      reviewBody: r.quote,
      ...(r.rating
        ? { reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 } }
        : {}),
      ...(r.date ? { datePublished: r.date } : {}),
    })),
  };
}

/** JSON-LD TouristTrip schema for a safari package detail page. */
export function packageSchema({
  title,
  description,
  slug,
  imageUrl,
  totalDays,
  lowestPrice,
}: {
  title: string;
  description?: string | null;
  slug: string;
  imageUrl?: string | null;
  totalDays?: string | null;
  lowestPrice?: string | null;
}) {
  const days = totalDays && !isNaN(Number(totalDays)) ? Number(totalDays) : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: title,
    ...(description ? { description } : {}),
    url: absoluteUrl(`/packages/${slug}`),
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(days ? { itinerary: { "@type": "ItemList", numberOfItems: days } } : {}),
    provider: {
      "@type": "TravelAgency",
      name: siteName,
      url: siteUrl,
    },
    ...(lowestPrice
      ? {
          offers: {
            "@type": "Offer",
            price: lowestPrice,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: absoluteUrl(`/packages/${slug}`),
          },
        }
      : {}),
  };
}

/** JSON-LD Article schema for a Stories or Media post. */
export function articleSchema({
  title,
  description,
  path,
  imageUrl,
  datePublished,
}: {
  title: string;
  description?: string | null;
  path: string;
  imageUrl?: string | null;
  datePublished?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    ...(description ? { description } : {}),
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    ...(imageUrl ? { image: [imageUrl] } : {}),
    ...(datePublished ? { datePublished } : {}),
    author: {
      "@type": "Person",
      name: "Robyn E. Preston",
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
    },
  };
}

/** JSON-LD Organization schema, reused site-wide. */
export function organizationSchema({
  logoUrl,
  facebookUrl,
  instagramUrl,
  email,
}: {
  logoUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  email?: string | null;
}) {
  const sameAs = [facebookUrl, instagramUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteName,
    url: siteUrl,
    ...(logoUrl ? { logo: logoUrl, image: logoUrl } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    ...(email ? { email } : {}),
    description:
      "Small boutique safari company specialising in handcrafted Kenya safari experiences, personally hosted by Robyn E. Preston.",
    areaServed: {
      "@type": "Country",
      name: "Kenya",
    },
    founder: {
      "@type": "Person",
      name: "Robyn E. Preston",
    },
  };
}
