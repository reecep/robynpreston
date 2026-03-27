import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Media | REP Kenya Safaris",
  description:
    "Press coverage, publications and media features about Robyn Preston and REP Kenya Safaris.",
};

export default async function MediaPage() {
  const mediaPosts = await getPostsByCategory("Media");

  return (
    <div>
      {/* Header */}
      <div className="relative h-64 flex items-center justify-center text-white overflow-hidden">
        <Image
          src="http://www.robynpreston.com/wp-content/uploads/2019/01/media-robyn-preston-next-magazine-january-2019.jpg"
          alt="Media coverage"
          fill
          className="object-cover object-top"
          unoptimized
        />
        <div className="absolute inset-0 bg-stone-900/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Media</h1>
          <p className="text-stone-300 text-lg">
            Press features, publications &amp; TV appearances
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/media/${post.slug}`}
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
                  <div className="w-full h-full flex items-center justify-center bg-stone-100">
                    <span className="text-4xl">📰</span>
                  </div>
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
