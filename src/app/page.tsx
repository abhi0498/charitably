import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // Fetch organizations directly in the component
  const organizations = await prisma.organization.findMany({
    where: { verified: true },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Charitably",
            url: "https://charitably.in",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://charitably.in/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <main>
        <section className="hero">
          <h1>Trusted Platform for Charitable Giving</h1>
          <p>Support verified organizations and make a real impact</p>
          <div className="mt-4">
            <Link
              href="/organization/apply"
              className="text-primary hover:underline"
            >
              Register Your Organization
            </Link>
            <span className="mx-2">•</span>
            <Link href="/about" className="text-primary hover:underline">
              About Us
            </Link>
            <span className="mx-2">•</span>
            <Link
              href="/organizations"
              className="text-primary hover:underline"
            >
              Browse Organizations
            </Link>
          </div>
        </section>

        <section aria-label="Featured Organizations">
          <h2 className="text-2xl font-semibold mb-4">
            Featured Organizations
          </h2>
          <div role="list" className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {organizations.map((org) => (
              <article key={org.id} role="listitem">
                <Link key={org.id} href={`/organization/${org.id}`}>
                  <Card key={org.id} className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle>{org.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{org.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-end align-end">
                      <Button>Donate</Button>
                    </CardFooter>
                  </Card>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
