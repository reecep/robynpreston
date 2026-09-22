import type { MetadataRoute } from "next";
import {
  getAllPackages,
  getPostSlugsByCategory,
} from "@/lib/queries";
import { siteUrl } from "@/lib/seo";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/packages", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/why-us", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/reviews", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/stories", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [packages, stories] = await Promise.all([
    getAllPackages(),
    getPostSlugsByCategory("Stories"),
  ]);

  const now = new Date();

  return [
    ...staticRoutes.map((r) => ({
      url: `${siteUrl}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...packages.map((pkg) => ({
      url: `${siteUrl}/packages/${pkg.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...stories.map((s) => ({
      url: `${siteUrl}/stories/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
