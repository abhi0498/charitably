import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ResendEmailButton } from "./resend-email";
import { Dot } from "lucide-react";

export default function EmailSentPage() {
  return (
    <div className="container mx-auto max-w-md py-12">
      <Card>
        <CardHeader>
          <CardTitle>Check Your Email</CardTitle>
          <CardDescription>
            We&apos;ve sent you a magic link to log in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">
            We&apos;ve sent an email to the address you provided. Click the link
            in the email to log in to your account.
          </p>
          <p className="text-center mb-4">
            The link will expire in 15 minutes for security reasons.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Link href="/auth/login" className="w-full">
            <Button className="w-full">Back to Login</Button>
          </Link>
          <p className="text-center text-sm text-muted-foreground">
            Quick links to popular email providers:
          </p>
          <div className="flex gap-2">
            <a
              href="https://gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gmail
            </a>
            <Dot />
            <a
              href="https://outlook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Outlook
            </a>
            <Dot />

            <a
              href="https://yahoo.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Yahoo
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
