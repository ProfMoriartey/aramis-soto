"use client";

import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { CountryPhoto } from "~/data";

type Props = {
  name: string;
  photos: CountryPhoto[];
};

export default function ClientGallery({ name, photos }: Props) {
  const count = photos.length;

  // lightbox state
  const [idx, setIdx] = useState<number | null>(null);
  const isOpen = idx !== null;

  const openAt = (i: number) => setIdx(i);
  const close = () => setIdx(null);

  const canPrev = idx !== null && idx > 0;
  const canNext = idx !== null && idx < count - 1;

  const goPrev = () => setIdx((i) => (i === null ? i : Math.max(0, i - 1)));
  const goNext = () =>
    setIdx((i) => (i === null ? i : Math.min(count - 1, i + 1)));

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
    () => (idx !== null ? photos[idx] : undefined),
    [idx, photos],
  );

  if (count === 0) {
    return (
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-neutral-400">
        No photos yet for {name}. Add some in your data file when ready.
      </div>
    );
  }

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p, i) => (
          <li key={`${p.url}-${i}`} className="group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.url}
              alt={p.alt ?? `${name} photo ${i + 1}`}
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
                alt={current.alt ?? `${name} photo ${(idx ?? 0) + 1}`}
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
    </>
  );
}
