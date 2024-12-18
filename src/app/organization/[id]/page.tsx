import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { FundingRequests } from "../funding-requests";
import { OrganizationUpdates } from "./organization-updates";
import { Organization, FundingRequest, Update } from "@prisma/client";

interface OrganizationWithRelations extends Organization {
  fundingRequests: FundingRequest[];
  updates: Update[];
}

const getOrganization = async (
  id: string
): Promise<OrganizationWithRelations | null> => {
  return await prisma.organization.findUnique({
    where: { id },
    include: {
      fundingRequests: true,
      updates: true,
    },
  });
};

function generateOrganizationSchema(org: OrganizationWithRelations) {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: org.name,
    description: org.description,
    mission: org.mission,
    taxID: org.taxId,
    foundingDate: org.createdAt,
    areaServed: "Global",
    // Add more fields as needed
  };
}

export default async function OrganizationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // In a real application, you would fetch the organization data based on the ID
  // For this example, we'll use the mock data
  const { id } = await params;

  const organizationData = await getOrganization(id);
  if (!organizationData) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationSchema(organizationData)),
        }}
      />
      <div className="max-w-4xl mx-auto space-y-8">
        <section>
          <h1 className="text-4xl font-bold mb-4">{organizationData.name}</h1>
          <p className="text-xl text-gray-600 mb-4">
            {organizationData.description}
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{organizationData.mission}</p>
            </CardContent>
          </Card>
        </section>

        <FundingRequests organizationData={organizationData} />

        <section>
          <h2 className="text-2xl font-semibold mb-4">Recent Updates</h2>
          <Tabs defaultValue="updates">
            <TabsList>
              <TabsTrigger value="updates">Updates</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
            </TabsList>
            <TabsContent value="updates">
              <OrganizationUpdates updates={organizationData.updates || []} />
            </TabsContent>
            <TabsContent value="impact">
              <Card>
                <CardHeader>
                  <CardTitle>Our Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Detailed impact metrics and stories will be displayed here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const organization = await getOrganization(id);

  return {
    title: `${organization?.name} - Charitably`,
    description: organization?.description,
    openGraph: {
      title: organization?.name,
      description: organization?.description,
      images: [
        {
          url: "/default-org-image.png",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
