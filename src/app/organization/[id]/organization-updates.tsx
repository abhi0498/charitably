import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Update } from "@prisma/client";

interface OrganizationUpdatesProps {
  updates: Update[];
}

export function OrganizationUpdates({ updates }: OrganizationUpdatesProps) {
  return (
    <div className="space-y-4">
      {updates.map((update) => (
        <Card key={update.id}>
          <CardHeader>
            <CardTitle>{update.title}</CardTitle>
            <CardDescription>
              {update.createdAt.toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{update.title}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
