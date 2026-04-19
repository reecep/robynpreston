import Link from "next/link";
import Image from "next/image";
import { getAllPackages, getPackagesPage, getHeaderBlockColor } from "@/lib/queries";
import PageBanner from "@/components/PageBanner";
import { sanityImageUrl } from "@/lib/sanity";

export const revalidate = 60;

export const metadata = {
  title: "Safari Packages | REP Kenya Safaris",
  description:
    "Choose from our handcrafted Kenya safari packages — from 5 days in the Maasai Mara to 14-day adventures including the Northern White Rhinos.",
};

export default async function PackagesPage() {
  const [packages, page, blockColor] = await Promise.all([getAllPackages(), getPackagesPage(), getHeaderBlockColor()]);

  const bannerUrl = page?.bannerUrl || null;
  const introHeading = page?.introHeading || "Safari Packages";
  const introText = page?.introText || null;

  return (
    <div>
      <PageBanner
        imageUrl={bannerUrl}
        blockColor={blockColor}
        title={introHeading}
        subtitle="Handcrafted Kenya safari experiences"
      />

      <div className="max-w-6xl mx-auto px-4 py-14">
        {/* Intro text */}
        {introText && (
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-stone-600 text-lg leading-relaxed">{introText}</p>
          </div>
        )}

        {/* Packages grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Link
              key={pkg.slug}
              href={`/packages/${pkg.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={sanityImageUrl(pkg.bannerUrl || pkg.coverUrl, 800) ?? '/placeholder.jpg'}
                  alt={pkg.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  unoptimized
                />
                {pkg.totalDays && (
                  <div className="absolute top-3 left-3 bg-olive-400 text-stone-900 text-xs font-bold px-2 py-1 rounded">
                    {isNaN(Number(pkg.totalDays))
                      ? pkg.totalDays
                      : `${pkg.totalDays} Days`}
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h2 className="font-bold text-lg text-stone-800 mb-2 group-hover:text-yellow-700 transition-colors">
                  {pkg.title}
                </h2>
                {pkg.lowestPrice && (
                  <p className="text-yellow-600 font-semibold text-sm mb-3">
                    From USD {pkg.lowestPrice} <span className="text-stone-400 font-normal">per person</span>
                  </p>
                )}
                <p className="text-stone-500 text-sm flex-1 line-clamp-3">
                  {pkg.content?.substring(0, 150)}…
                </p>
                <span className="mt-4 text-yellow-600 font-semibold text-sm group-hover:underline">
                  View itinerary →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Custom itinerary callout */}
        <div className="mt-16 bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-stone-800 mb-3">
            Want Something Custom?
          </h2>
          <p className="text-stone-600 mb-6 max-w-xl mx-auto">
            All our packages can be adjusted, or we can build a completely bespoke
            itinerary around your interests, travel dates and budget. Just get in touch.
          </p>
          <Link
            href="/contact"
            className="bg-olive-400 hover:bg-olive-500 text-stone-900 font-bold px-8 py-3 rounded transition-colors"
          >
            Contact Robyn
          </Link>
        </div>
      </div>
    </div>
  );
}
