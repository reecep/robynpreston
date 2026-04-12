"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch("https://formspree.io/f/xpwzqzgq", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
        <p className="text-green-700">
          Thank you for getting in touch. Robyn will be in contact as soon as possible.
          If she&apos;s out in the wilderness, please be patient!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-1">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 transition resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          Something went wrong. Please email{" "}
          <a href="mailto:robyn@robynpreston.com" className="underline">
            robyn@robynpreston.com
          </a>{" "}
          directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-[olive] hover:bg-[#6b6b00] disabled:opacity-60 text-stone-900 font-bold py-3 rounded-lg transition-colors"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
      <p className="text-xs text-stone-400 text-center">
        Note: This form requires a Formspree account to be connected. Alternatively, email Robyn directly.
      </p>
    </form>
  );
}
