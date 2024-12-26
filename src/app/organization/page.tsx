import { OrganizationCard } from "@/components/organization-card";
import { OrganizationSearch } from "@/components/organization-search";
import { prisma } from "@/lib/prisma";

const getOrganizations = async () => {
  const organizations = await prisma.organization.findMany();
  return organizations;
};

export default async function OrganizationsPage() {
  const organizations = await getOrganizations();
  return (
    <div className="space-y-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Charitable Organizations
        </h1>
        <p className="text-lg text-gray-600">
          Discover and support organizations making a real difference in the
          world. Every contribution counts towards creating positive change.
        </p>
      </div>

      <OrganizationSearch />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {organizations.map((org) => (
          <OrganizationCard key={org.id} organization={org} />
        ))}
      </div>
    </div>
  );
}
