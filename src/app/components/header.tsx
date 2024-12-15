import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
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
            <li>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            </li>
            <li>
              <Link href="/organization">
                <Button variant="ghost">Organization</Button>
              </Link>
            </li>
            <li>
              <Button variant="secondary">Login</Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
