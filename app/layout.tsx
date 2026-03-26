import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-800 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
