import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (session?.user?.organization?.id !== id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { title, imageUrl, description } = await request.json();
    const gallery = await prisma.gallery.create({
      data: {
        title,
        imageUrl,
        description,
        orgId: id,
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Error creating gallery entry:", error);
    return new NextResponse("Error creating gallery entry", { status: 500 });
  }
}
