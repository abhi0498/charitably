import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const organizations = await prisma.organization.findMany({
      where: { verified: true },
      select: { id: true, updatedAt: true },
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://charitably.in</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${organizations
        .map(
          (org) => `
        <url>
          <loc>https://charitably.in/organization/${org.id}</loc>
          <lastmod>${org.updatedAt.toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join("")}
    </urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    // Return basic sitemap if database fails
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://charitably.in</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
    </urlset>`;

    return new Response(fallbackXml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }
}
