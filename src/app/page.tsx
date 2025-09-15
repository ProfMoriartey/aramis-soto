"use client";

import { motion } from "framer-motion";
import { cubicBezier } from "framer-motion";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import {
  Music,
  MapPin,
  Tv,
  Gamepad2,
  Film,
  Globe2,
  BookOpenText,
  Sparkles,
  ExternalLink,
  Play,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// ---------------------------------------------
// Editable content (quick knobs)
// ---------------------------------------------
const hero = {
  name: "Aramis Soto",
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
  href: "/work",
};

const adventures = {
  title: "Adventures (2021–2024)",
  blurb:
    "Three years across Asia and Europe. Click through to explore photos, notes, and country pages.",
  stops: [
    { code: "TR", name: "Türkiye" },
    { code: "MX", name: "Mexico" },
    { code: "ES", name: "Spain" },
    { code: "DE", name: "Germany" },
    { code: "IT", name: "Italy" },
    { code: "JP", name: "Japan" },
  ],
  href: "/map",
};

const hobbies = {
  title: "Hobbies",
  items: [
    {
      icon: <Sparkles className="h-4 w-4" />,
      label: "Parkour",
      blurb: "Precision, flow, and safe movement in urban spaces.",
      href: "/hobbies/parkour",
    },
    {
      icon: <Music className="h-4 w-4" />,
      label: "Music / Jazz Band",
      blurb: "Plays with a small jazz group; rhythm section & improvisation.",
      href: "/hobbies/music",
    },
  ],
};

// ---------------------------------------------
// Small helpers
// ---------------------------------------------
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: cubicBezier(0.16, 1, 0.3, 1) },
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 text-neutral-100">
      {/* HERO */}
      <section className="mb-10">
        <motion.div
          {...fadeUp}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {hero.name}
            </h1>
            <p className="mt-2 text-neutral-300">{hero.tagline}</p>
            <p className="mt-3 max-w-2xl text-neutral-400">{hero.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {hero.ctas.map((c) => (
                <Button
                  asChild
                  key={c.label}
                  className="rounded-2xl bg-neutral-800 hover:bg-neutral-700"
                >
                  <Link href={c.href}>{c.label}</Link>
                </Button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 text-neutral-400">
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
          </div>
        </motion.div>
      </section>

      <Separator className="my-6 bg-neutral-800" />

      {/* GRID: Favorites / Work */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Favorites with chart */}
        <motion.div {...fadeUp}>
          <Card className="rounded-2xl border-neutral-800 bg-neutral-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Tv className="h-5 w-5" /> {favorites.title}
              </CardTitle>
              <p className="text-sm text-neutral-400">
                {favorites.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={favorites.items}
                    margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
                  >
                    <XAxis
                      dataKey="title"
                      stroke="#9ca3af"
                      tickLine={false}
                      axisLine={{ stroke: "#262626" }}
                    />
                    <YAxis
                      domain={[0, 10]}
                      stroke="#9ca3af"
                      tickLine={false}
                      axisLine={{ stroke: "#262626" }}
                    />
                    <Tooltip
                      cursor={{ fill: "#0a0a0a" }}
                      contentStyle={{
                        background: "#111",
                        border: "1px solid #262626",
                        borderRadius: 8,
                        color: "#e5e7eb",
                      }}
                    />
                    <Bar dataKey="rating" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
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

        {/* Work */}
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
                  className="rounded-xl bg-neutral-800 hover:bg-neutral-700"
                >
                  <Link
                    href={work.href}
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

      {/* Hobbies */}
      <section className="mt-8">
        <motion.div {...fadeUp}>
          <Card className="rounded-2xl border-neutral-800 bg-neutral-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Play className="h-5 w-5" /> {hobbies.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {hobbies.items.map((h) => (
                  <Link
                    key={h.label}
                    href={h.href}
                    className="group rounded-xl border border-neutral-800 bg-neutral-900 p-4 hover:bg-neutral-800"
                  >
                    <div className="flex items-center gap-2 text-neutral-200">
                      {h.icon}
                      <span className="font-medium">{h.label}</span>
                    </div>
                    <p className="mt-1 text-sm text-neutral-400">{h.blurb}</p>
                  </Link>
                ))}
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
