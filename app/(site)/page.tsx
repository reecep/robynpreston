import Link from "next/link";
import Image from "next/image";
import { getAllPackages, getSiteSettings } from "@/lib/queries";

export const revalidate = 60;

const testimonials = [
  {
    quote:
      "The range of animals and birds we saw over the 5 days had to be seen to be believed.",
    package: "5-Day Maasai Mara Safari",
  },
  {
    quote:
      "A highlight was seeing 100–200 elephants crossing a river, then lingering around our van.",
    package: "14-Day Kenya Safari",
  },
  {
    quote:
      "I gained an appreciation for the 'law of nature' within the animal kingdom, and a respect for the people that I met along the way.",
    package: "10-Day Kenya Safari",
  },
  {
    quote:
      "Thank you for making our trip so special, I couldn't recommend (and I do often) your safari highly enough. Each day just got better than the last.",
    package: "Go East Safari",
  },
];

export default async function HomePage() {
  const [packages, settings] = await Promise.all([
    getAllPackages(),
    getSiteSettings(),
  ]);

  const featuredPackages = packages.slice(0, 3);
  const heroVideoUrl = settings?.heroVideoUrl ?? null;
  const heroImageUrl = settings?.heroImageUrl || "http://www.robynpreston.com/wp-content/uploads/2019/01/robyn-preston-in-kenya.jpg";
  const heroHeading = settings?.heroHeading || "Kenya Safari Experiences";
  const heroSubtext = settings?.heroSubtext || "Small, boutique and personal. I'll be with you from airport arrival to farewell departure — making your African dream a reality.";

  return (
    <>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        {heroVideoUrl ? (
          <video
            src={heroVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            src={heroImageUrl}
            alt="Kenya Safari landscape"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-amber-400 text-sm uppercase tracking-[0.3em] font-medium mb-4">
            Robyn E. Preston
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {heroHeading}
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mb-8 leading-relaxed">
            {heroSubtext}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/packages"
              className="bg-olive-400 hover:bg-olive-500 text-stone-900 font-bold px-8 py-3 rounded transition-colors"
            >
              View Packages
            </Link>
            <Link
              href="/why-us"
              className="border-2 border-white hover:bg-white hover:text-stone-900 text-white font-bold px-8 py-3 rounded transition-colors"
            >
              Why Safari With Us
            </Link>
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="bg-amber-50 border-y border-amber-100 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-stone-700 text-lg md:text-xl leading-relaxed italic font-serif">
            &ldquo;We are a small boutique company dedicated to making your safari experience
            in Kenya a wonderful memory you will treasure.&rdquo;
          </p>
        </div>
      </section>

      {/* Featured packages */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-3">
            Safari Packages
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto">
            From 5 to 14 days — each itinerary is carefully crafted to maximise your
            wildlife encounters.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPackages.map((pkg) => (
            <Link
              key={pkg.slug}
              href={`/packages/${pkg.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={pkg.bannerUrl || pkg.coverUrl || heroImageUrl}
                  alt={pkg.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-stone-800 mb-2 group-hover:text-amber-600 transition-colors">
                  {pkg.title}
                </h3>
                {pkg.lowestPrice && (
                  <p className="text-amber-600 font-semibold text-sm mb-2">
                    From USD {pkg.lowestPrice} per person
                  </p>
                )}
                <p className="text-stone-500 text-sm line-clamp-3">{pkg.content?.substring(0, 120)}…</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/packages"
            className="inline-block border-2 border-olive-400 text-amber-600 hover:bg-olive-400 hover:text-stone-900 font-bold px-8 py-3 rounded transition-colors"
          >
            View All Packages
          </Link>
        </div>
      </section>

      {/* Why Us callout */}
      <section className="relative py-20 text-white overflow-hidden">
        <Image
          src="http://www.robynpreston.com/wp-content/uploads/2019/01/about-robyn-preston-kenya-safaris.jpg"
          alt="Robyn on safari"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-stone-900/70" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Safari With REP Kenya Safaris?
          </h2>
          <ul className="text-stone-200 text-base md:text-lg space-y-3 mb-8 text-left max-w-xl mx-auto">
            {[
              "Personally hosted by Robyn from arrival to departure",
              "Dedicated driver/guide with years of experience",
              "Off-road licensed — access places others can't go",
              "Flexible itineraries, not cookie-cutter tours",
              "Small groups for a more intimate experience",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-amber-400 font-bold mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/why-us"
            className="inline-block bg-olive-400 hover:bg-olive-500 text-stone-900 font-bold px-8 py-3 rounded transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-stone-800">
            What Our Guests Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <blockquote
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-amber-400"
              >
                <p className="italic text-stone-600 mb-3">&ldquo;{t.quote}&rdquo;</p>
                <footer className="text-sm font-semibold text-amber-600">
                  — {t.package}
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/reviews"
              className="text-amber-600 hover:text-amber-700 font-semibold underline"
            >
              Read all reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-2/5 flex-shrink-0">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="http://www.robynpreston.com/wp-content/uploads/2019/01/rep-portrait.jpg"
                alt="Robyn Preston"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
          <div className="md:w-3/5">
            <p className="text-amber-500 text-sm uppercase tracking-widest font-medium mb-2">
              About Robyn
            </p>
            <h2 className="text-3xl font-bold text-stone-800 mb-4">
              From New Zealand to Kenya
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Growing up on a farm in Northland, New Zealand, the outdoors was always
              home. My first journey to Africa was in 2009. Since then I&apos;ve visited
              annually, expanded into wildlife photography, and in 2015 founded REP
              Kenya Safaris to share this wild, beautiful continent with the world.
            </p>
            <Link
              href="/about"
              className="inline-block text-amber-600 font-semibold hover:text-amber-700 transition-colors"
            >
              Read my story →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 text-white py-14 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready for Your Kenya Safari?
        </h2>
        <p className="text-stone-300 mb-8 max-w-xl mx-auto">
          Get in touch and let&apos;s start planning your adventure. Whether you have a
          specific package in mind or want something fully custom, I&apos;d love to hear
          from you.
        </p>
        <Link
          href="/contact"
          className="bg-olive-400 hover:bg-olive-500 text-stone-900 font-bold px-10 py-3 rounded transition-colors"
        >
          Get In Touch
        </Link>
      </section>
    </>
  );
}
