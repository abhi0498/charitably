"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { useToast } from "@/hooks/use-toast";

interface DonationButtonProps {
  organizationId: string;
  organizationName: string;
  upiId: string;
}

export function DonationButton({
  organizationId,
  //   organizationName,
  upiId,
}: DonationButtonProps) {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleDonate = async () => {
    if (!session?.user) {
      toast({
        title: "Please login to donate",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/donations/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          organizationId,
          upiId,
        }),
      });

      const { upiUrl, transactionId } = await response.json();

      // Open UPI app
      window.location.href = upiUrl;

      // Start polling for transaction status
      startPollingStatus(transactionId);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to initiate donation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        min="1"
      />
      <Button onClick={handleDonate} disabled={isLoading || !amount}>
        {isLoading ? "Processing..." : "Donate"}
      </Button>
    </div>
  );
}

function startPollingStatus(transactionId: string) {
  const pollInterval = setInterval(async () => {
    try {
      const response = await fetch(`/api/donations/status/${transactionId}`);
      const { status } = await response.json();

      if (status === "COMPLETED") {
        toast({
          title: "Donation successful! Thank you!",
        });
        clearInterval(pollInterval);
      } else if (status === "FAILED") {
        toast({
          title: "Donation failed. Please try again.",
          variant: "destructive",
        });
        clearInterval(pollInterval);
      }
    } catch (error) {
      console.error("Error polling status:", error);
    }
  }, 5000); // Poll every 5 seconds

  // Stop polling after 5 minutes
  setTimeout(() => clearInterval(pollInterval), 300000);
}
