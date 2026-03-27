import type { Metadata } from "next";
import "./globals.css";
import { getSiteSettings } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "REP Kenya Safaris | Robyn E. Preston",
    description:
      "Small boutique safari company specialising in handcrafted Kenya safari experiences. Personal, flexible, unforgettable.",
    openGraph: {
      title: "REP Kenya Safaris",
      description: "Handcrafted Kenya safari experiences with Robyn Preston.",
      url: "https://www.robynpreston.com",
      siteName: "REP Kenya Safaris",
      images: [
        {
          url: "http://www.robynpreston.com/wp-content/uploads/2019/01/robyn-preston-in-kenya.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
    icons: settings?.faviconUrl
      ? { icon: settings.faviconUrl, apple: settings.faviconUrl }
      : undefined,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-800 antialiased">{children}</body>
    </html>
  );
}
