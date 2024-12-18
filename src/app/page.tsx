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

const featuredOrganizations = [
  {
    id: 1,
    name: "Global Health Initiative",
    description: "Providing medical aid to underserved communities worldwide.",
  },
  {
    id: 2,
    name: "Education for All",
    description:
      "Ensuring access to quality education for children in developing countries.",
  },
  {
    id: 3,
    name: "Clean Water Project",
    description: "Bringing clean and safe drinking water to rural areas.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="hero-section">
        <h1 className="text-4xl font-bold mb-4">
          Support Charitable Organizations
        </h1>
        <p className="text-xl mb-4">
          Make a difference by supporting verified charitable organizations
        </p>
      </header>

      <section aria-label="Featured Organizations">
        <h2 className="text-2xl font-semibold mb-4">Featured Organizations</h2>
        <div role="list" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredOrganizations.map((org) => (
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
  );
}
