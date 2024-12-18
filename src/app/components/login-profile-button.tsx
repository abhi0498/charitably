"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginOrProfileButton = () => {
  const session = useSession();
  const navigate = useRouter();

  if (session.status === "authenticated") {
    return (
      <div className="flex items-center gap-2">
        <span>{session.data.user.email}</span>
        <Button
          variant="secondary"
          onClick={() => {
            navigate.push("/api/auth/signout");
          }}
        >
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="secondary"
      onClick={() => {
        navigate.push("/api/auth/signin");
      }}
    >
      Login
    </Button>
  );
};

export default LoginOrProfileButton;
