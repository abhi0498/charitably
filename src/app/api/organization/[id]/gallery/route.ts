import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (session?.user?.organization?.id !== params.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { title, imageUrl, description } = await request.json();
    const gallery = await prisma.gallery.create({
      data: {
        title,
        imageUrl,
        description,
        orgId: params.id,
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Error creating gallery entry:", error);
    return new NextResponse("Error creating gallery entry", { status: 500 });
  }
}
