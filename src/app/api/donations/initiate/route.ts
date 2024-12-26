import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { initiateUPIPayment } from "@/lib/upi-payment";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { amount, organizationId, upiId } = await req.json();

    const { transaction, upiUrl } = await initiateUPIPayment({
      amount,
      merchantUpiId: upiId,
      merchantName: "Organization Name", // Get this from your DB
      userId: session.user.id,
      organizationId,
    });

    return NextResponse.json({
      transactionId: transaction.id,
      upiUrl,
    });
  } catch (error) {
    console.error("Failed to initiate donation:", error);
    return new NextResponse("Failed to initiate donation", { status: 500 });
  }
}
