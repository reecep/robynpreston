import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPackageBySlug, getPackageSlugs } from "@/lib/queries";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = await getPackageSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return {};
  return {
    title: `${pkg.title} | REP Kenya Safaris`,
    description: pkg.content?.substring(0, 160),
  };
}

function PricingTable({
  title,
  dates,
  rates,
}: {
  title: string;
  dates: string;
  rates: { people: string; pricePerPerson: string }[];
}) {
  if (!rates?.length) return null;
  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-4">
      <h3 className="font-bold text-stone-800 mb-1">{title}</h3>
      {dates && <p className="text-sm text-stone-500 mb-3">{dates}</p>}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-stone-200">
            <th className="text-left py-1 text-stone-600 font-medium">Travellers</th>
            <th className="text-right py-1 text-stone-600 font-medium">Per Person (USD)</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((r, i) => (
            <tr key={i} className="border-b border-stone-100 last:border-0">
              <td className="py-1.5">{r.people} {Number(r.people) === 1 ? "person" : "people"}</td>
              <td className="py-1.5 text-right font-semibold text-amber-700">${r.pricePerPerson}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  return (
    <div>
      {/* Hero banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src={
            pkg.bannerUrl ||
            pkg.coverUrl ||
            "http://www.robynpreston.com/wp-content/uploads/2019/01/robyn-preston-in-kenya.jpg"
          }
          alt={pkg.title}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-4xl mx-auto text-white">
            {pkg.totalDays && (
              <span className="bg-amber-500 text-stone-900 text-xs font-bold px-3 py-1 rounded mb-3 inline-block">
                {isNaN(Number(pkg.totalDays))
                  ? pkg.totalDays
                  : `${pkg.totalDays} Days`}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold">{pkg.title}</h1>
            {pkg.lowestPrice && (
              <p className="text-amber-300 font-semibold mt-2">
                From USD {pkg.lowestPrice} per person
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Overview */}
            {pkg.content && (
              <p className="text-stone-700 leading-relaxed mb-8 whitespace-pre-wrap">
                {pkg.content}
              </p>
            )}

            {/* Testimonial */}
            {pkg.testimonial && (
              <blockquote className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-xl mb-8 italic text-stone-600">
                &ldquo;{pkg.testimonial}&rdquo;
              </blockquote>
            )}

            {/* Day by day */}
            {pkg.days?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-stone-800 mb-5">
                  Day by Day Itinerary
                </h2>
                <div className="space-y-4">
                  {pkg.days.map((day, i) => (
                    <div
                      key={i}
                      className="flex gap-4 bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100"
                    >
                      {day.imageUrl && (
                        <div className="relative w-28 md:w-40 flex-shrink-0">
                          <Image
                            src={day.imageUrl}
                            alt={day.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <span className="text-amber-500 font-bold text-sm">
                          Day {day.number}
                        </span>
                        <h3 className="font-bold text-stone-800 mt-0.5">{day.title}</h3>
                        {day.description && (
                          <p className="text-stone-500 text-sm mt-1">{day.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Includes / Excludes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {pkg.includes?.length > 0 && (
                <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                  <h3 className="font-bold text-green-800 mb-3">✓ Included</h3>
                  <ul className="space-y-1.5">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                        <span className="text-green-500 font-bold flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {pkg.excludes?.length > 0 && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                  <h3 className="font-bold text-red-800 mb-3">✗ Not Included</h3>
                  <ul className="space-y-1.5">
                    {pkg.excludes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                        <span className="text-red-400 font-bold flex-shrink-0">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-20 space-y-4">
              {/* Pricing */}
              <div className="bg-white rounded-2xl shadow-md border border-stone-100 p-6">
                <h2 className="font-bold text-xl text-stone-800 mb-4">Pricing</h2>
                <PricingTable
                  title="Low Season"
                  dates={pkg.lowSeasonDates ?? ""}
                  rates={pkg.lowSeasonRates}
                />
                <PricingTable
                  title="High Season"
                  dates={pkg.highSeasonDates ?? ""}
                  rates={pkg.highSeasonRates}
                />
                <p className="text-xs text-stone-400 mt-3">
                  All prices in USD. Contact us for current availability.
                </p>
              </div>

              {/* Enquire CTA */}
              <div className="bg-amber-500 rounded-2xl p-6 text-center">
                <h3 className="font-bold text-stone-900 text-lg mb-2">
                  Interested in This Package?
                </h3>
                <p className="text-stone-800 text-sm mb-4">
                  Get in touch and let&apos;s start planning your Kenya adventure.
                </p>
                <Link
                  href={`/contact?package=${encodeURIComponent(pkg.title)}`}
                  className="block bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Enquire Now
                </Link>
              </div>

              {/* Back */}
              <Link
                href="/packages"
                className="block text-center text-amber-600 hover:text-amber-700 font-medium text-sm"
              >
                ← Back to all packages
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
