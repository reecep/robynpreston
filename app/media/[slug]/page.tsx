import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import postsData from "@/data/posts.json";

const mediaPosts = postsData.filter((p) => p.categories.includes("Media"));

export async function generateStaticParams() {
  return mediaPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = mediaPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Media | REP Kenya Safaris`,
    description: post.excerpt.substring(0, 160),
  };
}

export default async function MediaPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = mediaPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/media"
        className="text-amber-600 hover:text-amber-700 text-sm font-medium mb-6 inline-block"
      >
        ← Back to Media
      </Link>

      <p className="text-stone-400 text-sm mb-2">{post.date}</p>
      <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6 leading-tight">
        {post.title}
      </h1>

      {post.firstImage && (
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.firstImage}
            alt={post.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <div
        className="prose max-w-none text-stone-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-10 pt-8 border-t border-stone-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <Link href="/media" className="text-amber-600 hover:underline font-medium text-sm">
          ← Back to Media
        </Link>
        <Link
          href="/contact"
          className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-6 py-2.5 rounded transition-colors text-sm"
        >
          Get In Touch
        </Link>
      </div>
    </div>
  );
}
