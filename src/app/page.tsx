import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold mb-4">Welcome to Charitably</h1>
        <p className="text-xl mb-4">
          Discover charitable organizations and events near you.
        </p>
        <form className="flex space-x-4">
          <Input
            placeholder="Search for causes or organizations"
            className="flex-grow"
          />
          <Button type="submit">Search</Button>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Organizations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredOrganizations.map((org) => (
            <Card key={org.id}>
              <CardHeader>
                <CardTitle>{org.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{org.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button>Donate</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
