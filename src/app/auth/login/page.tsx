import { authOptions } from "@/lib/auth";
import { LoginForm } from "./login-form";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Log in to Charitably
      </h1>
      <LoginForm />
    </div>
  );
}
