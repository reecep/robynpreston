import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPostsByCategory, getStoriesPage } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Stories | REP Kenya Safaris",
  description:
    "Travel narratives and adventure stories from Kenya and across Africa by Robyn Preston.",
};

export default async function StoriesPage() {
  const [stories, page] = await Promise.all([getPostsByCategory("Stories"), getStoriesPage()]);

  const bannerUrl = page?.bannerUrl || "http://www.robynpreston.com/wp-content/uploads/2017/08/LK9.jpg";
  const introHeading = page?.introHeading || "Stories";
  const introText = page?.introText || null;

  return (
    <div>
      {/* Banner */}
      <div className="relative h-96 flex items-center justify-center text-white overflow-hidden">
        <Image
          src={bannerUrl}
          alt="Stories from Africa"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="relative z-10 text-center px-4 banner-text">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{introHeading}</h1>
          <p className="text-stone-200 text-lg italic">
            &ldquo;There is no end to the adventures we can have if only we seek them with our eyes open.&rdquo;
          </p>
        </div>
      </div>

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
                    src={post.firstImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                ) : (
                  <Image
                    src={bannerUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs text-stone-400 mb-1">{post.date}</p>
                <h2 className="font-bold text-stone-800 mb-2 group-hover:text-amber-600 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-stone-500 text-sm flex-1 line-clamp-3">{post.excerpt}</p>
                <span className="mt-3 text-amber-600 text-sm font-semibold group-hover:underline">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
