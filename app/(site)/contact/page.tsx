import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getSiteSettings, getContactPage } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact Robyn | REP Kenya Safaris",
  description:
    "Get in touch with Robyn Preston to start planning your Kenya safari adventure.",
};

export default async function ContactPage() {
  const [settings, contactPage] = await Promise.all([getSiteSettings(), getContactPage()]);

  const bannerUrl = contactPage?.bannerUrl || "http://www.robynpreston.com/wp-content/uploads/2019/01/rep-kenya-safari-reviews.jpg";
  const introText = contactPage?.introText || "I\u2019d love to hear from you! Whether you have a specific package in mind or want to create a completely custom itinerary, just send me an email and let\u2019s start planning.";
  const contactImageUrl = settings?.contactImageUrl || "http://www.robynpreston.com/wp-content/uploads/2019/01/about-robyn-preston-kenya-safaris.jpg";
  const email = settings?.email || "robyn@robynpreston.com";
  const facebookUrl = settings?.facebookUrl || null;
  const instagramUrl = settings?.instagramUrl || null;

  return (
    <div>
      {/* Header */}
      <div className="relative h-96 flex items-center justify-center text-white overflow-hidden">
        <Image
          src={bannerUrl}
          alt="Contact Robyn"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="relative z-10 text-center px-4 banner-text">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Contact Robyn</h1>
          <p className="text-stone-200 text-lg">Let&apos;s plan your Kenya adventure</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left: contact info */}
          <div className="md:w-2/5">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Get In Touch</h2>
            <p className="text-stone-600 leading-relaxed mb-8">{introText}</p>

            <div className="space-y-5 text-sm text-stone-600">
              <div className="flex items-start gap-3">
                <span className="text-amber-500 text-lg mt-0.5">✉</span>
                <div>
                  <p className="font-semibold text-stone-800 mb-0.5">Email</p>
                  <a
                    href={`mailto:${email}`}
                    className="text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {facebookUrl && (
                <div className="flex items-start gap-3">
                  <span className="text-amber-500 text-lg mt-0.5">📘</span>
                  <div>
                    <p className="font-semibold text-stone-800 mb-0.5">Facebook</p>
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-600 transition-colors"
                    >
                      REP Kenya Safaris
                    </a>
                  </div>
                </div>
              )}

              {instagramUrl && (
                <div className="flex items-start gap-3">
                  <span className="text-amber-500 text-lg mt-0.5">📷</span>
                  <div>
                    <p className="font-semibold text-stone-800 mb-0.5">Instagram</p>
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-600 transition-colors"
                    >
                      @repkenyasafaris
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 bg-amber-50 border border-amber-100 rounded-xl p-5 text-sm text-stone-600">
              <p className="font-semibold text-stone-800 mb-1">Response Time</p>
              <p>
                I aim to respond within 24–48 hours. When I&apos;m out on safari I may take
                a little longer — but I will always get back to you!
              </p>
            </div>

            <Link
              href={`mailto:${email}`}
              className="inline-block mt-8 bg-[olive] hover:bg-[#6b6b00] text-stone-900 font-bold px-8 py-3 rounded transition-colors"
            >
              Send an Email
            </Link>
          </div>

          {/* Right: photo */}
          <div className="md:w-3/5">
            <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={contactImageUrl}
                alt="Robyn Preston"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
