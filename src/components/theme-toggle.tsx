"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-xl bg-neutral-800 px-3 py-1 text-sm hover:bg-neutral-700"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
