"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";
import { funkyPhotos } from "~/data";

export default function FunkyStuffPage() {
  const photos = funkyPhotos;
  const count = photos.length;

  // lightbox
  const [idx, setIdx] = useState<number | null>(null);
  const isOpen = idx !== null;

  const openAt = (i: number) => setIdx(i);
  const close = () => setIdx(null);

  const canPrev = typeof idx === "number" && idx > 0;
  const canNext = typeof idx === "number" && idx < count - 1;

  const goPrev = () =>
    setIdx((i) => (typeof i === "number" ? Math.max(0, i - 1) : i));
  const goNext = () =>
    setIdx((i) => (typeof i === "number" ? Math.min(count - 1, i + 1) : i));

  // keyboard nav
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

  const current = useMemo(
    () => (typeof idx === "number" ? photos[idx] : undefined),
    [idx, photos],
  );

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-neutral-100">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-2xl font-semibold">
          <Images className="h-6 w-6 text-purple-400" />
          Funky Stuff
        </h1>
        <Button
          asChild
          size="sm"
          className="rounded-xl bg-neutral-800 hover:bg-neutral-700"
        >
          <Link href="/">← Back</Link>
        </Button>
      </div>

      <Card className="rounded-2xl border-neutral-800 bg-neutral-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Gallery with Friends</CardTitle>
          <p className="text-sm text-neutral-400">
            Click any photo to open the lightbox.
          </p>
        </CardHeader>

        <CardContent>
          {count > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((p, i) => (
                <li key={`${p.url}-${i}`} className="group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.url}
                    alt={p.alt ?? `Photo ${i + 1}`}
                    className="aspect-[4/3] w-full cursor-zoom-in rounded-xl object-cover ring-1 ring-neutral-800 transition-opacity group-hover:opacity-95"
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
              No photos yet. Add some in <code>~/data.ts</code>.
            </div>
          )}
        </CardContent>
      </Card>

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
                alt={current.alt ?? "Photo"}
                className="max-h-[80vh] w-full rounded-2xl object-contain"
              />
              {(current.caption ?? current.alt) && (
                <div className="px-4 py-3 text-sm text-neutral-300">
                  {current.caption ?? current.alt}
                </div>
              )}

              <button
                aria-label="Close"
                onClick={close}
                className="absolute top-2 right-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900/70 ring-1 ring-neutral-700 hover:bg-neutral-800"
              >
                <X className="h-5 w-5 text-neutral-200" />
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

      <p className="text-sm text-neutral-400">
        Photos load from <code>/public/funky/*</code>.
      </p>
    </main>
  );
}
