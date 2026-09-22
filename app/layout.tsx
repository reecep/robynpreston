import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { getSiteSettings } from "@/lib/queries";
import { sanityImageUrl } from "@/lib/sanity";
import { organizationSchema, siteName, siteUrl } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const description =
    "Small boutique safari company specialising in handcrafted Kenya safari experiences. Personal, flexible, unforgettable — personally hosted by Robyn E. Preston.";

  const ogImageUrl =
    sanityImageUrl(settings?.heroImageUrl, 1200) ??
    sanityImageUrl(settings?.logoUrl, 1200) ??
    undefined;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${siteName} | Robyn E. Preston`,
      template: `%s | ${siteName}`,
    },
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      title: siteName,
      description: "Handcrafted Kenya safari experiences with Robyn Preston.",
      url: siteUrl,
      siteName,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: "Handcrafted Kenya safari experiences with Robyn Preston.",
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    icons: settings?.faviconUrl
      ? { icon: settings.faviconUrl, apple: settings.faviconUrl }
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const jsonLd = organizationSchema({
    logoUrl: sanityImageUrl(settings?.logoUrl, 400),
    facebookUrl: settings?.facebookUrl,
    instagramUrl: settings?.instagramUrl,
    email: settings?.email,
  });

  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-800 antialiased">
        {children}
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
