"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginOrProfileButton from "./login-profile-button";
import { useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Charitably
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/">
                <Button variant="ghost">Home</Button>
              </Link>
            </li>
            {session?.user && (
              <li>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
              </li>
            )}
            {session?.user?.organization && (
              <li>
                <Link href={`/organization/${session.user.organization.id}`}>
                  <Button variant="ghost">My Organization</Button>
                </Link>
              </li>
            )}
            <li>
              <LoginOrProfileButton />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
