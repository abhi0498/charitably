import { prisma } from "@/lib/prisma";
import CreateOrganizationPage from "./create-organization";

export default async function AdminOrganizationsPage() {
  const applications = await prisma.organizationApplication.findMany({
    where: {
      status: "PENDING",
    },
  });

  return (
    <>
      <CreateOrganizationPage applications={applications} />
    </>
  );
}
