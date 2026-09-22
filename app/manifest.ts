import type { MetadataRoute } from "next";
import { siteName } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} | Robyn E. Preston`,
    short_name: siteName,
    description:
      "Small boutique safari company specialising in handcrafted Kenya safari experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#526218",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
