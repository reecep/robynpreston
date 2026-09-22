import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { getAboutPage, getHeaderBlockColor } from "@/lib/queries";
import PageBanner from "@/components/PageBanner";
import { sanityImageUrl } from "@/lib/sanity";
import { breadcrumbSchema } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  const ogImage = sanityImageUrl(about?.portraitUrl, 1200);
  return {
    title: "About Robyn",
    description:
      "From a Northland farm to Kenya's wild places — the story of Robyn Preston and REP Kenya Safaris.",
    alternates: {
      canonical: "/about",
    },
    openGraph: ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : undefined,
  };
}

export default async function AboutPage() {
  const [about, blockColor] = await Promise.all([getAboutPage(), getHeaderBlockColor()]);

  const bannerUrl = about?.bannerUrl || null;
  const portraitUrl = about?.portraitUrl || null;
  const mediaFeatures: string[] = about?.mediaFeatures || [
    "New Zealand Herald",
    "Australian Women's Weekly NZ",
    "Radio New Zealand National",
    "TV3 Newsworthy",
    "Virgin Unite",
    "Saving the Wild",
    "Chiiz Magazine (India)",
    "Overlanding Africa",
  ];
  const bioParagraphs: string[] = about?.bio
    ? about.bio.split("\n\n").filter(Boolean)
    : [];

  return (
    <div>
      <PageBanner
        imageUrl={bannerUrl}
        blockColor={blockColor}
        title="About Your Safari Host"
        subtitle="Robyn E. Preston"
      />

      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex flex-col md:flex-row gap-10 md:items-start mb-12">
          {portraitUrl && (
            <div className="w-full md:w-2/5 flex-shrink-0">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={sanityImageUrl(portraitUrl, 600) ?? portraitUrl}
                  alt="Robyn Preston"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 40vw, 100vw"
                  unoptimized
                />
              </div>
            </div>
          )}
          <div className={portraitUrl ? "md:w-3/5 prose prose-stone max-w-none" : "prose prose-stone max-w-none"}>
            {bioParagraphs.length > 0 ? (
              bioParagraphs.map((para, i) => <p key={i}>{para}</p>)
            ) : (
              <>
                <p>
                  Growing up on a farm in Arapohue, Northland, New Zealand, it was inevitable
                  really that I would run around outside with bare feet. Even to this day I am
                  not an indoors kind of person. The fresh air and sunshine is still my
                  favourite space as I enjoy the wild places of Africa.
                </p>
                <p>
                  My first journey to the African continent was in 2009 when I travelled
                  overland through ten different countries. Since then, except in 2011, I have
                  revisited annually and extended two more African countries within my visits.
                  My horizons have broadened each time to include not only travel, but two
                  volunteer wildlife conservation programs. My passion now lies with Kenya and
                  this is where I base myself for six to seven months of the year.
                </p>
                <p>
                  Some years back I formed a Facebook page to show{" "}
                  <a
                    href="https://www.facebook.com/rep.kenya.safaris"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    my wildlife photography
                  </a>
                  . It grew to the stage where I was asked if I did safari tours. At that
                  point, hosting tours had not entered my mind. After some thought, however,
                  in 2014 I ventured off with a friend to see if I could do this. It was the
                  beginning of where I am today.
                </p>
                <p>
                  In 2015 I formed my own safari company specialising in handcrafted safari
                  itineraries for people around the world. This has now gone on, through fine
                  tuning those experiences and my own, into offering packages for those that
                  prefer that option.
                </p>
                <p>
                  When I&apos;m not hosting safaris with guests, I am out doing my wildlife
                  photography. My images have been recognised in numerous publications globally
                  through two media companies I am involved with in England. I have been
                  published in a magazine in India and I have also been chosen as a finalist
                  in several international photography competitions. I have been featured in
                  two New Zealand magazines plus two TV appearances — all of this centred on
                  what I do in Africa.
                </p>
                <p>I look forward to where this journey leads me!</p>
              </>
            )}
          </div>
        </div>

        {/* Featured in */}
        {mediaFeatures.length > 0 && (
          <div className="mb-12">
            <h2 className="text-center text-xs font-bold uppercase tracking-widest text-stone-400 mb-5">
              As Featured In
            </h2>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-stone-500 text-sm font-medium">
              {mediaFeatures.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-block bg-olive-400 hover:bg-olive-500 text-stone-900 font-bold px-10 py-3 rounded transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </div>
      <Script
        id="about-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ])
          ),
        }}
      />
    </div>
  );
}
