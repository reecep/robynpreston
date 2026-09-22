import { getAllPackages, getPostsByCategory, getSiteSettings } from "@/lib/queries";
import { absoluteUrl, siteName } from "@/lib/seo";

export const revalidate = 3600;

export async function GET() {
  const [settings, packages, stories] = await Promise.all([
    getSiteSettings(),
    getAllPackages(),
    getPostsByCategory("Stories"),
  ]);

  const lines: string[] = [];

  lines.push(`# ${siteName}`);
  lines.push("");
  lines.push(
    "> Small, boutique and personal Kenya safaris — handcrafted itineraries personally hosted by Robyn E. Preston, from airport arrival to farewell departure."
  );
  lines.push("");
  lines.push(
    "REP Kenya Safaris is a boutique safari company based in Kenya, run by New Zealand-born wildlife photographer and safari host Robyn E. Preston. Safaris are small-group, flexible, and personally hosted throughout, with off-road access in the Maasai Mara and itineraries built around wildlife photography."
  );
  lines.push("");

  if (packages.length) {
    lines.push("## Safari Packages");
    lines.push("");
    for (const pkg of packages) {
      const desc = pkg.content?.replace(/\s+/g, " ").trim().slice(0, 200) || "";
      const price = pkg.lowestPrice ? ` From USD ${pkg.lowestPrice} per person.` : "";
      lines.push(`- [${pkg.title}](${absoluteUrl(`/packages/${pkg.slug}`)}): ${desc}${price}`);
    }
    lines.push("");
  }

  lines.push("## Key Pages");
  lines.push("");
  lines.push(`- [Why Safari With Us](${absoluteUrl("/why-us")}): What makes REP Kenya Safaris different.`);
  lines.push(`- [Guest Reviews](${absoluteUrl("/reviews")}): Testimonials from past safari guests.`);
  lines.push(`- [About Robyn](${absoluteUrl("/about")}): The story of Robyn Preston and REP Kenya Safaris.`);
  lines.push(`- [Contact](${absoluteUrl("/contact")}): Get in touch to plan a safari.`);
  lines.push("");

  if (stories.length) {
    lines.push("## Stories");
    lines.push("");
    for (const post of stories.slice(0, 20)) {
      lines.push(`- [${post.title}](${absoluteUrl(`/stories/${post.slug}`)}): ${post.excerpt || ""}`);
    }
    lines.push("");
  }

  lines.push("## Contact");
  lines.push("");
  lines.push(`Email: ${settings?.email || "robyn@robynpreston.com"}`);

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
