import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let orgEntries: MetadataRoute.Sitemap = [];

  try {
    const organizations = await prisma.organization.findMany({
      where: { verified: true },
      select: { id: true, updatedAt: true },
    });

    orgEntries = organizations.map((org) => ({
      url: `https://charitably.in/organization/${org.id}`,
      lastModified: org.updatedAt,
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to fetch organizations for sitemap:", error);
    // Continue with empty orgEntries if database fetch fails
  }

  // Always return at least the homepage
  return [
    {
      url: "https://charitably.in",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    ...orgEntries,
  ];
}
