"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (
    status === "unauthenticated" ||
    session?.user?.email !== "abhishekv.dev@gmail.com"
  ) {
    redirect("/404");
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      {children}
    </div>
  );
}
