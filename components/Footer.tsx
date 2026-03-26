import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-amber-400 font-bold text-sm uppercase tracking-widest mb-3">
            REP Kenya Safaris
          </h3>
          <p className="text-sm leading-relaxed">
            Small boutique safari company specialising in handcrafted Kenya safari
            experiences. Personal, flexible, unforgettable.
          </p>
        </div>
        <div>
          <h3 className="text-amber-400 font-bold text-sm uppercase tracking-widest mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Safari Packages", href: "/packages" },
              { label: "Why Safari With Us", href: "/why-us" },
              { label: "Guest Reviews", href: "/reviews" },
              { label: "About Robyn", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-amber-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-amber-400 font-bold text-sm uppercase tracking-widest mb-3">
            Get In Touch
          </h3>
          <p className="text-sm mb-2">
            <a
              href="mailto:robyn@robynpreston.com"
              className="hover:text-amber-400 transition-colors"
            >
              robyn@robynpreston.com
            </a>
          </p>
          <p className="text-sm">
            <a
              href="https://www.facebook.com/rep.kenya.safaris"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Facebook: REP Kenya Safaris
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-stone-800 py-4 text-center text-xs text-stone-600">
        © {new Date().getFullYear()} REP Kenya Safaris · Robyn E. Preston · All rights reserved
      </div>
    </footer>
  );
}
