"use client";

import { motion, cubicBezier } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import {
  LifeBuoy,
  Music,
  MapPin,
  Tv,
  Globe2,
  BookOpenText,
  Sparkles,
  ExternalLink,
  Play,
} from "lucide-react";

import { catalog } from "~/data";

// ---------------------------------------------
// Editable content (quick knobs)
// ---------------------------------------------
const hero = {
  first: "Aramis",
  last: "Soto",
  tagline: "Teacher. Traveler. Tinkerer.",
  blurb:
    "Aramis is an English & Spanish tutor who plays jazz with friends and vaults over park benches when nobody’s looking.",
  ctas: [
    { label: "See the map", href: "/map" },
    { label: "Get in touch", href: "#contact" },
  ],
};

const favorites = {
  title: "Favorite Shows • Movies • Games",
  description:
    "A living list of what Aramis watches and plays. Ratings change as opinions evolve.",
  // Keep titles short for axis; rating 1..10
  items: [
    { title: "LOTR", kind: "Movie", rating: 10 },
    { title: "GOT", kind: "Show", rating: 9 },
    { title: "OPM", kind: "Anime", rating: 8 },
    { title: "Hades", kind: "Game", rating: 9 },
    { title: "INSIDE", kind: "Game", rating: 8 },
    { title: "Spirited", kind: "Anime", rating: 9 },
  ],
  href: "/favorites",
};

const work = {
  title: "Teaching • English & Spanish",
  points: [
    "One‑on‑one online lessons",
    "Conversation‑first method with clear goals",
    "Flexible schedule across time zones",
  ],
  badges: ["English", "Spanish", "Online"],
  href: "https://aramis-portfolio.vercel.app/",
};

const adventures = {
  title: "Adventures",
  blurb:
    "Traveling across Asia and Europe. Click through to explore photos, notes, and country pages.",
  stops: [
    { code: "TR", name: "Türkiye" },
    { code: "GE", name: "Georgia" },
    { code: "IN", name: "India" },
    { code: "TH", name: "Thailand" },
    { code: "RU", name: "Russia" },
    { code: "KZ", name: "Kazakhstan" },
  ],
  href: "/map",
};

const hobbies = {
  title: "Interests",
  items: [
    {
      icon: <Sparkles className="h-4 w-4" />,
      label: "Parkour",
      blurb: "Precision, flow, and safe movement in urban spaces.",
      href: "/parkour",
    },
    {
      icon: <Music className="h-4 w-4" />,
      label: "Music",
      blurb: "Plays with a small jazz group; rhythm section & improvisation.",
      href: "/music",
    },
    {
      icon: <LifeBuoy className="h-4 w-4" />,
      label: "Awesomeness",
      blurb: "All is the funck, and the funck is all",
      href: "/awesomeness",
    },
  ],
};

const musicItem = hobbies.items.find((h) => /music/i.test(h.label));
const otherHobbies = hobbies.items.filter((h) => h !== musicItem);

// ---------------------------------------------
// Small helpers
// ---------------------------------------------
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: cubicBezier(0.16, 1, 0.3, 1) },
};

export default function HomePage() {
  const TARGET_A = 6;
  const TARGET_S = 9;

  const [aramisCount, setAramisCount] = useState(0);
  const [sotoCount, setSotoCount] = useState(0);

  const unlocked = aramisCount === TARGET_A && sotoCount === TARGET_S;
  const showCounter = aramisCount > 0 || sotoCount > 0;

  const incAramis = () => setAramisCount((c) => c + 1);
  const incSoto = () => setSotoCount((c) => c + 1);
  const resetCounts = () => {
    setAramisCount(0);
    setSotoCount(0);
  };
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 text-neutral-100">
      {/* HERO */}
      <section className="mb-10">
        <motion.div
          {...fadeUp}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight sm:text-4xl">
              <span
                className="cursor-pointer select-none hover:text-neutral-400"
                onClick={incAramis}
                aria-label="Tap Aramis"
              >
                {hero.first.split(" ")[0]}
              </span>

              <span
                className="cursor-pointer select-none hover:text-neutral-400"
                onClick={incSoto}
                aria-label="Tap Soto"
              >
                {hero.last.split(" ")[0]}
              </span>

              {unlocked ? (
                <Button
                  asChild
                  size="sm"
                  className="ml-3 rounded-xl bg-neutral-800 text-neutral-100 hover:bg-neutral-600"
                >
                  <Link href="/areyousureyouarefunckyenough">
                    Click for some guud funckyness
                  </Link>
                </Button>
              ) : (
                showCounter && (
                  <button
                    type="button"
                    onClick={resetCounts}
                    title="Reset counter"
                    className="ml-3 text-xs text-neutral-500 select-none hover:text-neutral-300"
                  >
                    {aramisCount}
                    {sotoCount}
                  </button>
                )
              )}
            </h1>

            <p className="mt-2 text-neutral-300">{hero.tagline}</p>
            <p className="mt-3 max-w-2xl text-neutral-400">{hero.blurb}</p>

            <div className="mt-3 flex gap-3 text-neutral-400">
              <Badge
                variant="secondary"
                className="bg-neutral-800 text-neutral-200"
              >
                Traveler
              </Badge>
              <Badge
                variant="secondary"
                className="bg-neutral-800 text-neutral-200"
              >
                Tutor
              </Badge>
              <Badge
                variant="secondary"
                className="bg-neutral-800 text-neutral-200"
              >
                Musician
              </Badge>
              <Badge
                variant="secondary"
                className="bg-neutral-800 text-neutral-200"
              >
                Funck Master
              </Badge>
            </div>
          </div>
        </motion.div>
      </section>

      <Separator className="my-6 bg-neutral-800" />

      {/* GRID: Favorites / Hobbies */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Favorites with chart */}
        <motion.div {...fadeUp}>
          <Card className="h-full rounded-2xl border-neutral-800 bg-neutral-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Tv className="h-5 w-5" /> {favorites.title}
              </CardTitle>
              <p className="text-sm text-neutral-400">
                {favorites.description}
              </p>
            </CardHeader>
            <CardContent>
              {/* Top Movies */}
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold text-neutral-200">
                  Top Movies
                </h3>
                <ul className="space-y-1 text-sm text-neutral-300">
                  {catalog.movies.slice(0, 3).map((item) => (
                    <li key={item.title} className="flex justify-between">
                      <span>{item.title}</span>
                      <span className="text-neutral-400">{item.rating}/10</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top Anime */}
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold text-neutral-200">
                  Top Anime
                </h3>
                <ul className="space-y-1 text-sm text-neutral-300">
                  {catalog.anime.slice(0, 3).map((item) => (
                    <li key={item.title} className="flex justify-between">
                      <span>{item.title}</span>
                      <span className="text-neutral-400">{item.rating}/10</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Link to full list */}
              <div className="mt-3">
                <Button
                  asChild
                  size="sm"
                  variant="secondary"
                  className="rounded-xl bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                >
                  <Link
                    href={favorites.href}
                    className="inline-flex items-center gap-1"
                  >
                    See full list <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Hobbies — split into Music + Other */}
        <div className="flex flex-col gap-6">
          {/* Music card */}
          {musicItem && (
            <motion.div {...fadeUp}>
              <Card className="rounded-2xl border-neutral-800 bg-neutral-900">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Music className="h-5 w-5" /> The meaning of life:{" "}
                    {musicItem.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link
                    href={musicItem.href}
                    className="group block rounded-xl border border-neutral-800 bg-neutral-900 p-4 hover:bg-neutral-800"
                  >
                    <div className="flex items-center gap-2 text-neutral-200">
                      {musicItem.icon}
                      <span className="font-medium">{musicItem.label}</span>
                    </div>
                    <p className="mt-1 text-sm text-neutral-400">
                      {musicItem.blurb}
                    </p>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Other hobbies card */}
          {otherHobbies.length > 0 && (
            <motion.div {...fadeUp}>
              <Card className="rounded-2xl border-neutral-800 bg-neutral-900">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Play className="h-5 w-5" /> He&apos;s also assosiated with
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {otherHobbies.map((h) => (
                      <Link
                        key={h.label}
                        href={h.href}
                        className="group rounded-xl border border-neutral-800 bg-neutral-900 p-4 hover:bg-neutral-800"
                      >
                        <div className="flex items-center gap-2 text-neutral-200">
                          {h.icon}
                          <span className="font-medium">{h.label}</span>
                        </div>
                        <p className="mt-1 text-sm text-neutral-400">
                          {h.blurb}
                        </p>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Adventures */}
      <section className="mt-8">
        <motion.div {...fadeUp}>
          <Card className="rounded-2xl border-neutral-800 bg-neutral-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe2 className="h-5 w-5" /> {adventures.title}
              </CardTitle>
              <p className="text-sm text-neutral-400">{adventures.blurb}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {adventures.stops.map((s) => (
                  <Link
                    key={s.code}
                    href={`/country/${s.code}`}
                    className="group inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
                  >
                    <MapPin className="h-4 w-4 text-neutral-500 group-hover:text-neutral-300" />
                    <span className="font-medium text-neutral-200">
                      {s.name}
                    </span>
                    <span className="text-neutral-500">({s.code})</span>
                  </Link>
                ))}
              </div>
              <div className="mt-4">
                <Button
                  asChild
                  size="sm"
                  variant="secondary"
                  className="rounded-xl bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                >
                  <Link
                    href={adventures.href}
                    className="inline-flex items-center gap-1"
                  >
                    Open world map <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Work */}
      <section className="mt-8">
        <motion.div {...fadeUp}>
          <Card className="rounded-2xl border-neutral-800 bg-neutral-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpenText className="h-5 w-5" /> {work.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid list-disc gap-2 pl-5 text-neutral-300">
                {work.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {work.badges.map((b) => (
                  <Badge
                    key={b}
                    variant="secondary"
                    className="bg-neutral-800 text-neutral-200"
                  >
                    {b}
                  </Badge>
                ))}
              </div>
              <div className="mt-4">
                <Button
                  asChild
                  size="sm"
                  className="rounded-xl bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                >
                  <Link
                    href={work.href}
                    target="_blank"
                    className="inline-flex items-center gap-1"
                  >
                    View details <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="mt-12 text-sm text-neutral-500">
        <p>
          Built with Next.js, Tailwind, shadcn/ui, Framer Motion, and Recharts.
        </p>
      </footer>
    </main>
  );
}
