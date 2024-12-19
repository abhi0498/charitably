"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card>
      <>
        <CardHeader>
          <CardTitle>Login with Email</CardTitle>
          <CardDescription>
            Enter your email to receive a magic link for instant login.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full"
            onClick={async () => {
              try {
                setIsLoading(true);
                await signIn("email", { email });
              } catch (error) {
                console.error(error);
              } finally {
                setIsLoading(false);
              }
            }}
          >
            {isLoading && <Loader2 className="animate-spin" />}
            Login
          </Button>
          <hr className="my-4 w-full" />
          <Button
            variant="outline"
            className="w-full"
            onClick={async () => {
              await signIn("google");
            }}
          >
            <Image
              src="/google.svg"
              alt="Google Logo"
              width={16}
              height={16}
              className="mr-2"
            />
            Login with Google
          </Button>
        </CardFooter>
      </>
    </Card>
  );
}
