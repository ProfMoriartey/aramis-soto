export default function MapPage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-4 flex items-center justify-between text-xl font-semibold">
        World Map
        <Button
          asChild
          size="sm"
          className="rounded-xl bg-neutral-200 hover:bg-neutral-500"
        >
          <Link href="/">← Back</Link>
        </Button>
      </h1>

      <ClientMap />
    </main>
  );
}

// import ThemeToggle from "~/components/theme-toggle";
import ClientMap from "./ClientMap";
import { Button } from "~/components/ui/button";
import Link from "next/link";
