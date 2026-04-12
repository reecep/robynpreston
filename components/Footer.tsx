import Link from "next/link";

type FooterProps = {
  email: string;
  facebookUrl: string | null;
  instagramUrl: string | null;
};

export default function Footer({ email, facebookUrl, instagramUrl }: FooterProps) {
  return (
    <footer className="bg-stone-600 text-stone-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-yellow-600 font-bold text-sm uppercase tracking-widest mb-3">
            REP Kenya Safaris
          </h3>
          <p className="text-sm leading-relaxed">
            Small boutique safari company specialising in handcrafted Kenya safari
            experiences. Personal, flexible, unforgettable.
          </p>
        </div>
        <div>
          <h3 className="text-yellow-600 font-bold text-sm uppercase tracking-widest mb-3">
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
                <Link href={l.href} className="hover:text-yellow-700 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-yellow-600 font-bold text-sm uppercase tracking-widest mb-3">
            Get In Touch
          </h3>
          <p className="text-sm mb-3">
            <a href={`mailto:${email}`} className="hover:text-yellow-700 transition-colors">
              {email}
            </a>
          </p>
          <div className="flex gap-4">
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-yellow-700 transition-colors"
              >
                Facebook
              </a>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-yellow-700 transition-colors"
              >
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-stone-500 py-4 text-center text-xs text-stone-300">
        © {new Date().getFullYear()} REP Kenya Safaris · Robyn E. Preston · All rights reserved
      </div>
    </footer>
  );
}
