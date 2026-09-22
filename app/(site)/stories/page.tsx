import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { getPostsByCategory, getStoriesPage, getHeaderBlockColor } from "@/lib/queries";
import PageBanner from "@/components/PageBanner";
import { sanityImageUrl } from "@/lib/sanity";
import { breadcrumbSchema } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStoriesPage();
  const ogImage = sanityImageUrl(page?.bannerUrl, 1200);
  return {
    title: "Stories",
    description:
      "Travel narratives and adventure stories from Kenya and across Africa by Robyn Preston.",
    alternates: {
      canonical: "/stories",
    },
    openGraph: ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {},
  };
}

export default async function StoriesPage() {
  const [stories, page, blockColor] = await Promise.all([getPostsByCategory("Stories"), getStoriesPage(), getHeaderBlockColor()]);

  const bannerUrl = page?.bannerUrl || null;
  const introHeading = page?.introHeading || "Stories";
  const introText = page?.introText || null;

  return (
    <div>
      <PageBanner
        imageUrl={bannerUrl}
        blockColor={blockColor}
        title={introHeading}
        subtitle="There is no end to the adventures we can have if only we seek them with our eyes open."
      />

      <div className="max-w-6xl mx-auto px-4 py-14">
        {/* Intro text */}
        {introText && (
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-stone-600 text-lg leading-relaxed">{introText}</p>
          </div>
        )}

        {/* Stories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((post) => (
            <Link
              key={post.slug}
              href={`/stories/${post.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-stone-200">
                {post.firstImage ? (
                  <Image
                    src={sanityImageUrl(post.firstImage, 600) ?? post.firstImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    unoptimized
                  />
                ) : bannerUrl ? (
                  <Image
                    src={sanityImageUrl(bannerUrl, 600) ?? bannerUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    unoptimized
                  />
                ) : null}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs text-stone-400 mb-1">{post.date}</p>
                <h2 className="font-bold text-stone-800 mb-2 group-hover:text-yellow-700 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-stone-500 text-sm flex-1 line-clamp-3">{post.excerpt}</p>
                <span className="mt-3 text-yellow-600 text-sm font-semibold group-hover:underline">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Script
        id="stories-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Stories", path: "/stories" },
            ])
          ),
        }}
      />
    </div>
  );
}
