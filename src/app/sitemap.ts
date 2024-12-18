import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const organizations = await prisma.organization.findMany({
    where: { verified: true },
    select: { id: true, updatedAt: true },
  });

  const orgEntries = organizations.map((org) => ({
    url: `https://charitably.org/organization/${org.id}`,
    lastModified: org.updatedAt,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [
    {
      url: "https://charitably.org",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...orgEntries,
  ];
}
