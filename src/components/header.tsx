"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

export function Header() {
  const { data: session, status } = useSession();
  console.log(session);

  return (
    <header className="bg-white bg-opacity-80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
        >
          Charitably
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/organization"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Organizations
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Events
              </Link>
            </li>
            {session && (
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {session?.user?.organization && (
              <li>
                <Link
                  href={`/organization/${session.user.organization.id}`}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  My Organization
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div>
          {status === "loading" ? (
            <Skeleton className="w-24 h-10" />
          ) : session ? (
            <Button
              onClick={() => signOut()}
              variant="ghost"
              className="text-gray-600 hover:text-primary hover:bg-primary/10"
            >
              Log Out
            </Button>
          ) : (
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white transition-colors"
            >
              <Link href="/auth/login">Log In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
