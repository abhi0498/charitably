import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Organization } from "@prisma/client";

interface OrganizationCardProps {
  organization: Organization;
}

export function OrganizationCard({ organization }: OrganizationCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <div className="relative h-48">
        <Image
          src={organization.imageUrl || "/placeholder.svg?height=200&width=300"}
          alt={organization.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardContent className="flex-grow py-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          {organization.name}
        </h3>
        {/* <p className="text-sm text-gray-500 mb-2">{organization.mission}</p> */}
        <p className="text-gray-600 text-sm">{organization.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/organization/${organization.id}`}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
