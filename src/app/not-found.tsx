import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">You might be interested in:</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <Link href="/" className="text-primary hover:underline">
              Home Page
            </Link>
          </li>
          <li>
            <Link
              href="/organizations"
              className="text-primary hover:underline"
            >
              Browse Organizations
            </Link>
          </li>
          <li>
            <Link
              href="/organization/apply"
              className="text-primary hover:underline"
            >
              Register Your Organization
            </Link>
          </li>
        </ul>
        <Button asChild className="mt-4">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
