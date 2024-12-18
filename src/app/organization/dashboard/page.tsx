import { OrganizationGuard } from "@/components/organization-guard";

export default function OrganizationDashboardPage() {
  return (
    <OrganizationGuard>
      <div>{/* Organization dashboard content */}</div>
    </OrganizationGuard>
  );
}
