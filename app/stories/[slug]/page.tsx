import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import postsData from "@/data/posts.json";

const stories = postsData.filter((p) => p.categories.includes("Stories"));

export async function generateStaticParams() {
  return stories.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = stories.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Stories | REP Kenya Safaris`,
    description: post.excerpt.substring(0, 160),
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = stories.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/stories"
        className="text-amber-600 hover:text-amber-700 text-sm font-medium mb-6 inline-block"
      >
        ← Back to Stories
      </Link>

      <p className="text-stone-400 text-sm mb-2">{post.date}</p>
      <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6 leading-tight">
        {post.title}
      </h1>

      {post.firstImage && (
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
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
        <Link href="/stories" className="text-amber-600 hover:underline font-medium text-sm">
          ← Back to Stories
        </Link>
        <Link
          href="/packages"
          className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-6 py-2.5 rounded transition-colors text-sm"
        >
          View Safari Packages
        </Link>
      </div>
    </div>
  );
}
