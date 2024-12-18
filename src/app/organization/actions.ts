"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function createFundingRequest(
  formData: FormData,
  organizationId: string
) {
  const session = await getServerSession(authOptions);

  if (session?.user?.organization?.id !== organizationId) {
    throw new Error("Unauthorized");
  }

  const fundingRequest = await prisma.fundingRequest.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      goal: parseFloat(formData.get("goal") as string),
      currentAmount: 0,
      orgId: organizationId,
    },
  });

  // Revalidate both the specific page and any parent routes
  revalidatePath(`/organization/${organizationId}`);
  //   revalidatePath(`/organization/[id]`, "page");
  return fundingRequest;
}

export async function updateFundingRequest(
  formData: FormData,
  fundingRequestId: string,
  organizationId: string
) {
  const session = await getServerSession(authOptions);

  if (session?.user?.organization?.id !== organizationId) {
    throw new Error("Unauthorized");
  }

  const fundingRequest = await prisma.fundingRequest.update({
    where: { id: fundingRequestId },
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      goal: parseFloat(formData.get("goal") as string),
      orgId: organizationId,
    },
  });

  // Revalidate both the specific page and any parent routes
  revalidatePath(`/organization/${organizationId}`);
  //   revalidatePath(`/organization/[id]`, "page");
  return fundingRequest;
}

export async function closeFundingRequest(
  fundingRequestId: string,
  organizationId: string
) {
  console.log("Closing funding request", fundingRequestId);
  const fundingRequest = await prisma.fundingRequest.update({
    where: { id: fundingRequestId },
    data: { isClosed: true },
  });
  revalidatePath(`/organization/${organizationId}`);
  return fundingRequest;
}
