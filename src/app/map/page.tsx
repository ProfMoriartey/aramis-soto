export default function MapPage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-4 flex items-center justify-between text-xl font-semibold">
        World Map
        {/* <ThemeToggle /> */}
      </h1>

      <ClientMap />
    </main>
  );
}

import ThemeToggle from "~/components/theme-toggle";
import ClientMap from "./ClientMap";
