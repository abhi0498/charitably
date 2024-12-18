import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface OrganizationInput {
  name: string;
  description: string;
  taxId: string;
}

export async function createOrganization(input: OrganizationInput) {
  const organization = await prisma.organization.create({
    data: {
      name: input.name,
      description: input.description,
      taxId: input.taxId,
      verified: true, // Since you're creating it manually
    },
  });

  console.log(`Created organization: ${organization.name}`);
  return organization;
}

// Example usage:
// createOrganization({
//   name: "Global Health Initiative",
//   description: "Providing medical aid to underserved communities worldwide",
//   taxId: "12345678"
// });
