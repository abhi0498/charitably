"use server";
import { createOrganization } from "@/app/api/admin/organizations/utils";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approveOrganization(id: string) {
  try {
    const application = await prisma.organizationApplication.findUnique({
      where: { id },
    });

    if (!application) {
      throw new Error("Application not found");
    }

    await prisma.organizationApplication.update({
      where: { id },
      data: { status: "APPROVED" },
    });

    const organization = await createOrganization(
      application.name,
      application.description,
      application.taxId,
      application.adminEmail
    );
    if (!organization) {
      //rollback
      await prisma.organizationApplication.update({
        where: { id },
        data: { status: "PENDING" },
      });
      throw new Error("Failed to create organization");
    }

    revalidatePath("/admin/organizations");
  } catch (error) {
    console.error("Error approving organization:", error);
    await prisma.organizationApplication.update({
      where: { id },
      data: { status: "PENDING" },
    });
    throw new Error("Failed to approve organization");
  }
}

export async function rejectOrganization(id: string) {
  await prisma.organizationApplication.update({
    where: { id },
    data: { status: "REJECTED" },
  });

  revalidatePath("/admin/organizations");
}
