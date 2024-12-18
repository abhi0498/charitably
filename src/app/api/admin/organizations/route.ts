import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session?.user);
    // Check if user is admin
    if (session?.user?.email !== "abhishekv.dev@gmail.com") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description, taxId, adminEmail } = await request.json();

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

    return NextResponse.json({ success: true, organization });
  } catch (error) {
    console.error("Error creating organization:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to create organization" }),
      { status: 500 }
    );
  }
}
