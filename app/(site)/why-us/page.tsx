import Link from "next/link";
import type { Metadata } from "next";
import { getWhyUsPage, getHeaderBlockColor } from "@/lib/queries";
import PageBanner from "@/components/PageBanner";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Why Safari With Us | REP Kenya Safaris",
  description:
    "Discover what makes REP Kenya Safaris different — personal hosting, expert guidance, flexible itineraries and off-road access.",
};

const defaultHighlights = [
  { icon: "🦁", label: "Personally hosted by Robyn end-to-end" },
  { icon: "🚙", label: "Experienced KATO-bonded driver/guide" },
  { icon: "📍", label: "Off-road licence access in Maasai Mara" },
  { icon: "🕐", label: "Your time at sightings is up to you" },
  { icon: "🌿", label: "Small groups for an intimate experience" },
  { icon: "📸", label: "Photography-focused game drives" },
];

const defaultSections = [
  {
    title: "Who is REP Kenya Safaris?",
    body: "We are a small boutique company dedicated to making your safari experience in Kenya a wonderful memory you will treasure. I will personally meet you at the airport upon arrival and be with you throughout your whole journey up until our farewell departure at the airport. Everything will be taken care of for your stay in Kenya. I can assist with organising pre/post accommodation and any extra activities you are interested in doing outside of your safari. All you need to do is come, relax and enjoy!",
  },
  {
    title: "Our Itineraries",
    body: "Our itineraries have been fine tuned based on experiences I have had on my wildlife photographic journey in past years. You have the choice of a handcrafted personal itinerary or an already planned safari package. It's up to you. We cater to single and group travellers. On our game drives, our day is not dictated by using the same routes each time as other companies do. Our aim is to find our guests the best wildlife encounters at any given time and to get you in the best position possible for your photos. In Maasai Mara it is possible to obtain an off road licence if you request. This will allow us to go places others are not permitted. Your time spent at each sighting is up to you; whether that be five minutes or five hours. Flexibility is key here.",
  },
  {
    title: "Safari Locations",
    body: "Our location order has been carefully chosen to minimise transit times between places. We believe your time in Kenya should be maximised on safari not travelling on a public road. And each location is completely different to the next which makes our itineraries interesting. Along the way you will also experience the palette of colour that is true Africa. There is opportunity to visit both Maasai and Samburu villages if you would like and to embrace their cultures.",
  },
  {
    title: "Accommodation",
    body: "All our accommodations are clean and comfortable with hot showers and comfy beds. You'll even find a hot water bottle tucked in the sheets on cold nights! The food is plentiful and we can request special requirements for those with food allergies. There's always a cold bevvie to enjoy at the end of the game drive as you relax before dinner with myself and your travel companions. Sharing your daily safari experiences with a good laugh and a vino is food for the soul. We are here to make your safari experience in Kenya as relaxed and enjoyable as possible.",
  },
];

export default async function WhyUsPage() {
  const [whyUs, blockColor] = await Promise.all([getWhyUsPage(), getHeaderBlockColor()]);

  const bannerUrl = whyUs?.bannerUrl || null;
  const highlights: { icon: string; label: string }[] = whyUs?.highlights || defaultHighlights;
  const sections: { title: string; body: string }[] = whyUs?.sections || defaultSections;

  return (
    <div>
      <PageBanner
        imageUrl={bannerUrl}
        blockColor={blockColor}
        title="Why Safari With Us"
        subtitle="Karibu Kenya!"
      />

      <div className="max-w-5xl mx-auto px-4 py-14">
        {/* Highlights grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-14">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3"
            >
              <span className="text-2xl flex-shrink-0">{h.icon}</span>
              <span className="text-sm text-stone-700 font-medium leading-snug">
                {h.label}
              </span>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((s, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 items-start">
              <div className="md:w-1/4">
                <h2 className="text-xl font-bold text-yellow-600 leading-snug">{s.title}</h2>
              </div>
              <div className="md:w-3/4 space-y-4">
                {s.body.split(/\n\n+/).map((para, j) => (
                  <p key={j} className="text-stone-600 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center bg-stone-900 text-white rounded-2xl p-10">
          <h2 className="text-2xl font-bold mb-3">Ready to Start Planning?</h2>
          <p className="text-stone-300 mb-6">
            Browse our packages or reach out to build your own custom itinerary.
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
              className="border-2 border-white hover:bg-white hover:text-stone-900 font-bold px-8 py-3 rounded transition-colors"
            >
              Contact Robyn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
