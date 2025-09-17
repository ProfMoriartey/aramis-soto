"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { instrumentLabels, instruments, type InstrumentKey } from "~/data";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function MusicPage() {
  const [tab, setTab] = useState<InstrumentKey>("guitar");
  const data = instruments[tab];

  const galleryCount = useMemo(() => data.gallery.length, [data.gallery]);

  // Lightbox state
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const isOpen = lightboxIdx !== null;

  const openAt = (i: number) => setLightboxIdx(i);
  const close = () => setLightboxIdx(null);

  const canPrev = typeof lightboxIdx === "number" && lightboxIdx > 0;
  const canNext =
    typeof lightboxIdx === "number" && lightboxIdx < galleryCount - 1;

  const goPrev = () =>
    setLightboxIdx((i) => (i === null ? i : Math.max(0, i - 1)));
  const goNext = () =>
    setLightboxIdx((i) => (i === null ? i : Math.min(galleryCount - 1, i + 1)));

  // Keyboard nav when open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, galleryCount]);

  const currentPhoto =
    isOpen && lightboxIdx !== null ? data.gallery[lightboxIdx] : undefined;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-neutral-100">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Music</h1>
        <Button
          asChild
          size="sm"
          className="rounded-xl bg-neutral-200 hover:bg-neutral-400"
        >
          <Link href="/">← Back</Link>
        </Button>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {(Object.keys(instrumentLabels) as InstrumentKey[]).map((key) => (
          <Button
            key={key}
            size="sm"
            variant={tab === key ? "default" : "secondary"}
            className={
              tab === key
                ? "rounded-xl bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
                : "rounded-xl bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
            }
            onClick={() => {
              setTab(key);
              setLightboxIdx(null); // reset lightbox if switching tabs
            }}
          >
            {instrumentLabels[key]}
          </Button>
        ))}
      </div>

      {/* Instrument card */}
      <Card className="rounded-2xl border-neutral-800 bg-neutral-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{data.title}</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Instrument cover */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.cover.url}
            alt={data.cover.alt ?? data.title}
            className="mb-4 aspect-[16/9] w-full rounded-xl object-cover ring-1 ring-neutral-800"
            loading="lazy"
          />

          {/* Description */}
          <p className="mb-4 text-sm text-neutral-300">{data.description}</p>

          <Separator className="my-4 bg-neutral-800" />

          {/* Gallery */}
          <h2 className="mb-3 text-base font-medium text-neutral-100">
            Gallery {galleryCount > 0 ? `(${galleryCount})` : ""}
          </h2>

          {galleryCount > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.gallery.map((p, i) => (
                <li key={`${p.url}-${i}`} className="group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.url}
                    alt={p.alt ?? `${data.title} photo ${i + 1}`}
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
              No photos yet for {data.title}.
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
          {currentPhoto && (
            <div className="relative">
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentPhoto.url}
                alt={
                  currentPhoto.alt ??
                  `${data.title} photo ${(lightboxIdx ?? 0) + 1}`
                }
                className="max-h-[80vh] w-full rounded-2xl object-contain"
              />

              {/* Caption */}
              {(currentPhoto.caption ?? currentPhoto.alt) && (
                <div className="px-4 py-3 text-sm text-neutral-300">
                  {currentPhoto.caption ?? currentPhoto.alt}
                </div>
              )}

              {/* Close button */}
              <button
                aria-label="Close"
                onClick={close}
                className="absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900/70 ring-1 ring-neutral-700 hover:bg-neutral-800"
              ></button>

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
        Switch tabs to view each instrument. Click photos to open the lightbox.
      </p>
    </main>
  );
}
