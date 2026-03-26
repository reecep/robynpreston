import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import packagesData from "@/data/packages.json";

export const metadata: Metadata = {
  title: "Guest Reviews | REP Kenya Safaris",
  description:
    "Read what our guests say about their Kenya safari experience with REP Kenya Safaris and Robyn Preston.",
};

const extraTestimonials = [
  {
    quote:
      "The range of animals and birds we saw over the 5 days had to be seen to be believed.",
    source: "5-Day Maasai Mara Safari Guest",
  },
  {
    quote:
      "A highlight was seeing 100–200 elephants crossing a river, then lingering around our van.",
    source: "14-Day Kenya Safari Guest",
  },
  {
    quote:
      "I gained an appreciation for the 'law of nature' within the animal kingdom, and a respect for the people that I met along the way.",
    source: "10-Day Kenya Safari Guest",
  },
  {
    quote:
      "Thank you for making our trip so special, I couldn't recommend (and I do often) your safari highly enough. Each day just got better than the last.",
    source: "Go East Safari Guest",
  },
];

export default function ReviewsPage() {
  const packageTestimonials = packagesData
    .filter((p) => p.testimonial)
    .map((p) => ({ quote: p.testimonial, source: p.title }));

  const allTestimonials = [...packageTestimonials, ...extraTestimonials.slice(packageTestimonials.length)];

  return (
    <div>
      {/* Header */}
      <div className="relative h-64 flex items-center justify-center text-white overflow-hidden">
        <Image
          src="http://www.robynpreston.com/wp-content/uploads/2019/01/rep-kenya-safari-reviews.jpg"
          alt="Guest reviews"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-stone-900/65" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">What Our Guests Say</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-stone-600 text-lg leading-relaxed">
            Whether your interest lies in taking breathtaking safari photos, enjoying the
            incredible Kenyan wildlife, or simply getting out of your comfort zone,
            we&apos;ll make sure you have an unforgettable African experience.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {allTestimonials.map((t, i) => (
            <blockquote
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm border border-stone-100 flex flex-col"
            >
              <p className="text-stone-600 italic mb-4 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="text-amber-600 font-semibold text-sm border-t border-stone-100 pt-3">
                — {t.source}
              </footer>
            </blockquote>
          ))}
        </div>

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
              className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-8 py-3 rounded transition-colors"
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
