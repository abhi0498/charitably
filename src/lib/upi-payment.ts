import { nanoid } from "nanoid";
import { prisma } from "./prisma";

interface UPIPaymentParams {
  amount: number;
  merchantUpiId: string;
  merchantName: string;
  description?: string;
  userId: string;
  organizationId: string;
}

export async function initiateUPIPayment({
  amount,
  merchantUpiId,
  merchantName,
  description,
  userId,
  organizationId,
}: UPIPaymentParams) {
  // Generate a unique reference ID
  const reference = nanoid(10);

  // Create transaction record
  const transaction = await prisma.transaction.create({
    data: {
      amount,
      status: "INITIATED",
      upiId: merchantUpiId,
      reference,
      description,
      userId,
      organizationId,
    },
  });

  // Generate UPI deep link
  const upiUrl = generateUPIUrl({
    pa: merchantUpiId,
    pn: merchantName,
    tr: reference,
    am: amount.toString(),
    cu: "INR",
    tn: description || `Donation to ${merchantName}`,
  });

  return {
    transaction,
    upiUrl,
  };
}

function generateUPIUrl(params: {
  pa: string; // Payee UPI ID
  pn: string; // Payee Name
  tr: string; // Transaction Reference
  am: string; // Amount
  cu: string; // Currency
  tn: string; // Transaction Note
}) {
  const queryString = new URLSearchParams(params).toString();
  return `upi://pay?${queryString}`;
}
