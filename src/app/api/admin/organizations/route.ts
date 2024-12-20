import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createOrganization } from "./utils";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session?.user);
    // Check if user is admin
    if (session?.user?.email !== "abhishekv.dev@gmail.com") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description, taxId, adminEmail } = await request.json();

    const organization = await createOrganization(
      name,
      description,
      taxId,
      adminEmail
    );

    return NextResponse.json({ success: true, organization });
  } catch (error) {
    console.error("Error creating organization:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to create organization" }),
      { status: 500 }
    );
  }
}
