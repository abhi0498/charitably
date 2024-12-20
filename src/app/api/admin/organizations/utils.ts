import { prisma } from "@/lib/prisma";

export async function createOrganization(
  name: string,
  description: string,
  taxId: string,
  adminEmail: string
) {
  // Create organization
  const organization = await prisma.organization.create({
    data: {
      name,
      description,
      taxId,
      verified: true,
    },
  });

  // Link admin user if they exist
  const user = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (user) {
    await prisma.user.update({
      where: { email: adminEmail },
      data: {
        organization: {
          connect: {
            id: organization.id,
          },
        },
      },
    });
  } else {
    //create user
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Admin",
        organization: {
          connect: {
            id: organization.id,
          },
        },
      },
    });
  }
  return organization;
}
