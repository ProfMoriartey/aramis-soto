"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { MoveRight, ChevronLeft, ChevronRight } from "lucide-react";

// ---------------------------------------------
// Content (edit freely)
// ---------------------------------------------
type PkPhoto = { url: string; alt?: string; caption?: string };

const hero = {
  title: "Parkour",
  blurb:
    "Flow, control, and clean landings. Training lines, drilling precisions, and building strength without ego.",
};

const sections = [
  {
    title: "Principles",
    points: [
      "Safety first: progressions over shortcuts.",
      "Efficiency: shortest path, best landing.",
      "Consistency: clean reps, controlled exits.",
    ],
  },
  {
    title: "Practice",
    points: [
      "Precisions & balance on rails/ledges.",
      "Vault chains: speed, direction changes.",
      "Soft plyos, joint prep, and mobility.",
    ],
  },
  {
    title: "Mindset",
    points: [
      "Curiosity over fear, patience over hype.",
      "One more rep only if form holds.",
      "Leave spots better than you found them.",
    ],
  },
];

const photos: PkPhoto[] = [
  {
    url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3K37Bz2qthe0UiCV4knWRMfrTLZqA25JpKoyG",
    alt: "Human centipede",
    caption: "Precision into a controlling all the limbs",
  },
  {
    url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3Nr9jN6sWMY7beRzp9AvONU5ZCHyarQwdu216",
    alt: "Rail balance",
    caption: "Breathing slow. Eyes soft. Feet in the air.",
  },
  {
    url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3N1IE1tWMY7beRzp9AvONU5ZCHyarQwdu2160",
    alt: "Wall run",
    caption: "Approach, plan, jump.",
  },
];

// ---------------------------------------------
// Lightbox state
// ---------------------------------------------
export default function ParkourPage() {
  const [idx, setIdx] = useState<number | null>(null);
  const isOpen = idx !== null;
  const count = photos.length;

  const current = useMemo(
    () => (typeof idx === "number" ? photos[idx] : undefined),
    [idx],
  );

  const openAt = (i: number) => setIdx(i);
  const close = () => setIdx(null);

  const canPrev = typeof idx === "number" && idx > 0;
  const canNext = typeof idx === "number" && idx < count - 1;

  const goPrev = () =>
    setIdx((i) => (typeof i === "number" ? Math.max(0, i - 1) : i));
  const goNext = () =>
    setIdx((i) => (typeof i === "number" ? Math.min(count - 1, i + 1) : i));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, count]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 text-neutral-100">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {hero.title}
        </h1>
        <Button
          asChild
          size="sm"
          className="rounded-xl bg-neutral-100 hover:bg-neutral-300"
        >
          <Link href="/">← Back</Link>
        </Button>
      </div>

      {/* Intro block */}
      <Card className="rounded-2xl border-neutral-800 bg-neutral-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Why Parkour</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-300">{hero.blurb}</p>
        </CardContent>
      </Card>

      <Separator className="my-8 bg-neutral-800" />

      {/* “Steps” layout: staggered blocks like obstacles */}
      <div className="grid gap-6 md:grid-cols-3">
        {sections.map((s, i) => (
          <Card
            key={s.title}
            className={[
              "rounded-2xl border-neutral-800 bg-neutral-900 transition-transform",
              i % 3 === 0 ? "md:translate-y-2" : "",
              i % 3 === 1 ? "md:-translate-y-2" : "",
              i % 3 === 2 ? "md:translate-y-4" : "",
            ].join(" ")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{s.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2 text-neutral-300">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <MoveRight className="mt-0.5 h-4 w-4 text-neutral-500" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8 bg-neutral-800" />

      {/* Photo grid (click to open lightbox) */}
      <h2 className="mb-3 text-lg font-medium text-neutral-100">Sessions</h2>
      {count > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p, i) => (
            <li key={`${p.url}-${i}`} className="group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.url}
                alt={p.alt ?? `Parkour ${i + 1}`}
                className="aspect-[4/3] w-full cursor-zoom-in rounded-xl object-cover ring-1 ring-neutral-800 transition-transform group-hover:scale-[1.01]"
                loading="lazy"
                onClick={() => openAt(i)}
              />
              {(p.caption ?? p.alt) && (
                <p className="mt-2 text-sm text-neutral-400">
                  {p.caption ?? p.alt}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-neutral-400">
          No photos yet. Add some under <code>/public/parkour/*</code>.
        </div>
      )}

      {/* Lightbox */}
      <Dialog open={isOpen} onOpenChange={(open) => (!open ? close() : null)}>
        <DialogContent
          className="max-w-[min(96vw,1100px)] border-neutral-800 bg-neutral-950 p-0 sm:rounded-2xl"
          aria-describedby={undefined}
        >
          {current && (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.url}
                alt={current.alt ?? "Parkour photo"}
                className="max-h-[80vh] w-full rounded-2xl object-contain"
              />
              {(current.caption ?? current.alt) && (
                <div className="px-4 py-3 text-sm text-neutral-300">
                  {current.caption ?? current.alt}
                </div>
              )}

              {/* Controls */}
              <button
                aria-label="Close"
                onClick={close}
                className="absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900/70 ring-1 ring-neutral-700 hover:bg-neutral-800"
              >
                {" "}
              </button>

              {canPrev && (
                <button
                  aria-label="Previous"
                  onClick={goPrev}
                  className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-neutral-900/70 p-2 ring-1 ring-neutral-700 hover:bg-neutral-800"
                >
                  <ChevronLeft className="h-5 w-5 text-neutral-200" />
                </button>
              )}
              {canNext && (
                <button
                  aria-label="Next"
                  onClick={goNext}
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-neutral-900/70 p-2 ring-1 ring-neutral-700 hover:bg-neutral-800"
                >
                  <ChevronRight className="h-5 w-5 text-neutral-200" />
                </button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Separator className="my-8 bg-neutral-800" />

      <div className="text-sm text-neutral-400">
        Training log coming soon. Want a dedicated spot map with session notes?
      </div>
    </main>
  );
}
