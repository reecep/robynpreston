import Image from "next/image";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Robyn | REP Kenya Safaris",
  description:
    "Get in touch with Robyn Preston to start planning your Kenya safari adventure.",
};

export default function ContactPage() {
  return (
    <div>
      {/* Header */}
      <div className="relative h-64 flex items-center justify-center text-white overflow-hidden">
        <Image
          src="http://www.robynpreston.com/wp-content/uploads/2019/01/robyn-preston-in-kenya.jpg"
          alt="Contact Robyn"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-stone-900/65" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Contact Robyn</h1>
          <p className="text-stone-300 text-lg">Let&apos;s plan your Kenya adventure</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left: info */}
          <div className="md:w-2/5">
            <h2 className="text-xl font-bold text-stone-800 mb-4">Get In Touch</h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              You can get in touch by email on{" "}
              <a
                href="mailto:robyn@robynpreston.com"
                className="text-amber-600 hover:underline"
              >
                robyn@robynpreston.com
              </a>
              . I will get back to you as soon as possible. Your message is important to
              me so if I&apos;m out in the wilderness, please be patient as I may not have
              reliable internet access.
            </p>

            <div className="space-y-4 text-sm text-stone-600">
              <div className="flex items-start gap-3">
                <span className="text-amber-500 text-lg">✉</span>
                <div>
                  <p className="font-semibold text-stone-800">Email</p>
                  <a
                    href="mailto:robyn@robynpreston.com"
                    className="hover:text-amber-600 transition-colors"
                  >
                    robyn@robynpreston.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-500 text-lg">📘</span>
                <div>
                  <p className="font-semibold text-stone-800">Facebook</p>
                  <a
                    href="https://www.facebook.com/rep.kenya.safaris"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-600 transition-colors"
                  >
                    REP Kenya Safaris
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-amber-50 border border-amber-100 rounded-xl p-5 text-sm text-stone-600">
              <p className="font-semibold text-stone-800 mb-1">Response Time</p>
              <p>
                I aim to respond within 24–48 hours. When I&apos;m out on safari I may take a
                little longer — but I will always get back to you!
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="md:w-3/5">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
