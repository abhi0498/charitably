import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: id },
    });

    if (!transaction) {
      return new NextResponse("Transaction not found", { status: 404 });
    }

    return NextResponse.json({ status: transaction.status });
  } catch (error) {
    console.error("Error fetching transaction status:", error);
    return new NextResponse("Failed to fetch status", { status: 500 });
  }
}
