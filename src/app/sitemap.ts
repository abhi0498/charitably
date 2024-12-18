import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const organizations = await prisma.organization.findMany({
    where: { verified: true },
    select: { id: true, updatedAt: true },
  });

  const orgEntries = organizations.map((org) => ({
    url: `https://charitably.in/organization/${org.id}`,
    lastModified: org.updatedAt,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://charitably.in",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...orgEntries,
  ];
}
