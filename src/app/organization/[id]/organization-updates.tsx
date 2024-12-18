import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Update {
  id: number;
  date: string;
  title: string;
  content: string;
}

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
            <CardDescription>{update.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{update.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
