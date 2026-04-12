import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPostBySlug, getPostSlugsByCategory } from "@/lib/queries";
import PortableTextContent from "@/components/PortableTextContent";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPostSlugsByCategory("Media");
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Media | REP Kenya Safaris`,
    description: post.excerpt?.substring(0, 160),
  };
}

export default async function MediaPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/media"
        className="text-yellow-600 hover:text-yellow-700 text-sm font-medium mb-6 inline-block"
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

      {post.body?.length
        ? <PortableTextContent value={post.body} />
        : <div className="text-stone-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.htmlContent || "" }} />
      }

      <div className="mt-10 pt-8 border-t border-stone-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <Link href="/media" className="text-yellow-600 hover:underline font-medium text-sm">
          ← Back to Media
        </Link>
        <Link
          href="/contact"
          className="bg-olive-400 hover:bg-olive-500 text-stone-900 font-bold px-6 py-2.5 rounded transition-colors text-sm"
        >
          Get In Touch
        </Link>
      </div>
    </div>
  );
}
