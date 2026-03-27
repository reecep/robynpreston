import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAboutPage } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Robyn | REP Kenya Safaris",
  description:
    "From a Northland farm to Kenya's wild places — the story of Robyn Preston and REP Kenya Safaris.",
};

export default async function AboutPage() {
  const about = await getAboutPage();

  const portraitUrl = about?.portraitUrl || "http://www.robynpreston.com/wp-content/uploads/2019/01/rep-portrait.jpg";
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
      {/* Header */}
      <div className="relative h-96 flex items-center justify-center text-white overflow-hidden">
        <Image
          src="http://www.robynpreston.com/wp-content/uploads/2019/01/about-robyn-preston-kenya-safaris.jpg"
          alt="Robyn Preston in Kenya"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="relative z-10 text-center px-4 banner-text">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">About Robyn</h1>
          <p className="text-stone-200 text-lg">Robyn E. Preston</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex flex-col md:flex-row gap-10 items-start mb-12">
          <div className="md:w-2/5 flex-shrink-0">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={portraitUrl}
                alt="Robyn Preston"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
          <div className="md:w-3/5 prose prose-stone max-w-none">
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

        {/* Media highlights */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 mb-10">
          <h2 className="text-xl font-bold text-stone-800 mb-4">In the Media</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-700">
            {mediaFeatures.map((m) => (
              <li key={m} className="flex items-center gap-2">
                <span className="text-amber-500">★</span> {m}
              </li>
            ))}
          </ul>
          <Link
            href="/media"
            className="inline-block mt-4 text-amber-600 font-semibold hover:text-amber-700 text-sm"
          >
            Read all media features →
          </Link>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-10 py-3 rounded transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
