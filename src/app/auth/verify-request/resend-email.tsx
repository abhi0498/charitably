"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ResendEmailButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResend = async () => {};

  return (
    <div className="w-full text-center">
      <Button onClick={handleResend} disabled={isLoading} className="w-full">
        {isLoading ? "Sending..." : "Resend Magic Link"}
      </Button>
      {message && (
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      )}
    </div>
  );
}
