"use client";

import { useActionState, useState } from "react";
import { useFormState } from "react-dom";
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
import { sendMagicLink } from "./actions";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [state, formAction] = useActionState(sendMagicLink, null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login with Magic Link</CardTitle>
        <CardDescription>
          Enter your email to receive a magic link for instant login.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
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
          <Button type="submit" className="w-full">
            Send Magic Link
          </Button>
          {state?.success && (
            <p className="text-green-600 mt-2">
              Magic link sent! Check your email.
            </p>
          )}
          {state?.error && <p className="text-red-600 mt-2">{state.error}</p>}
        </CardFooter>
      </form>
    </Card>
  );
}
