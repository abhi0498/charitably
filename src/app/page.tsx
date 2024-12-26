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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-20 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent animate-fade-in">
            Trusted Platform for Charitable Giving
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600 animate-slide-up">
            Support verified organizations and make a real impact
          </p>
          <div
            className="flex flex-wrap justify-center gap-4 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Link href="/organization/apply">Register Your Organization</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Link href="/about">About Us</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white transition-colors"
            >
              <Link href="/organizations">Browse Organizations</Link>
            </Button>
          </div>
        </section>

        <section
          aria-label="Featured Organizations"
          className="py-16 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Organizations
          </h2>
          <div role="list" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {organizations.map((org) => (
              <article
                key={org.id}
                role="listitem"
                className="transform transition-all hover:scale-105"
              >
                <Link href={`/organization/${org.id}`}>
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-primary">{org.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-gray-600">
                        {org.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-end pt-4">
                      <Button className="bg-primary hover:bg-primary/90 text-white transition-colors">
                        Donate
                      </Button>
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
