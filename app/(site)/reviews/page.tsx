import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getReviews, getReviewsPage } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Guest Reviews | REP Kenya Safaris",
  description:
    "Read what our guests say about their Kenya safari experience with REP Kenya Safaris and Robyn Preston.",
};

export default async function ReviewsPage() {
  const [reviews, reviewsPage] = await Promise.all([getReviews(), getReviewsPage()]);

  const bannerUrl = reviewsPage?.bannerUrl || "http://www.robynpreston.com/wp-content/uploads/2019/01/rep-kenya-safari-reviews.jpg";
  const introText = reviewsPage?.introText || "Whether your interest lies in taking breathtaking safari photos, enjoying the incredible Kenyan wildlife, or simply getting out of your comfort zone, we\u2019ll make sure you have an unforgettable African experience.";

  return (
    <div>
      {/* Header */}
      <div className="relative h-96 flex items-center justify-center text-white overflow-hidden">
        <Image
          src={bannerUrl}
          alt="Guest reviews"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="relative z-10 text-center px-4 banner-text">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">What Our Guests Say</h1>
          <p className="text-stone-200 text-lg">Stories from the savannah</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-stone-600 text-lg leading-relaxed">{introText}</p>
        </div>

        {reviews.length === 0 ? (
          <p className="text-center text-stone-400 py-12">No reviews yet — check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {reviews.map((r) => (
              <blockquote
                key={r._id}
                className="bg-white rounded-xl p-6 shadow-sm border border-stone-100 flex flex-col"
              >
                {r.rating && (
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <span key={i} className="text-amber-400 text-base">★</span>
                    ))}
                    {Array.from({ length: 5 - r.rating }).map((_, i) => (
                      <span key={i} className="text-stone-200 text-base">★</span>
                    ))}
                  </div>
                )}
                <p className="text-stone-600 italic mb-4 flex-1">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <footer className="text-amber-600 font-semibold text-sm border-t border-stone-100 pt-3 flex items-center justify-between gap-2">
                  <span>— {r.reviewerName}</span>
                  {r.packageTitle && r.packageSlug && (
                    <Link
                      href={`/packages/${r.packageSlug}`}
                      className="text-xs text-stone-400 hover:text-amber-600 transition-colors font-normal"
                    >
                      {r.packageTitle} →
                    </Link>
                  )}
                  {r.packageTitle && !r.packageSlug && (
                    <span className="text-xs text-stone-400 font-normal">{r.packageTitle}</span>
                  )}
                </footer>
              </blockquote>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center bg-amber-50 border border-amber-100 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-stone-800 mb-3">
            Ready to Create Your Own Story?
          </h2>
          <p className="text-stone-600 mb-6 max-w-lg mx-auto">
            Join the many guests who have had the safari of a lifetime in Kenya. Browse
            our packages or get in touch to start planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/packages"
              className="bg-olive-400 hover:bg-olive-500 text-stone-900 font-bold px-8 py-3 rounded transition-colors"
            >
              View Packages
            </Link>
            <Link
              href="/contact"
              className="border-2 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white font-bold px-8 py-3 rounded transition-colors"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
