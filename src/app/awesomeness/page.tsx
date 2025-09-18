"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { awesomeness } from "~/data";

export default function AwesomenessPage() {
  const items = awesomeness;

  // lightbox state
  const [idx, setIdx] = useState<number | null>(null);
  const isOpen = idx !== null;
  const flat = items; // 1 item per card here
  const count = flat.length;
  const current = useMemo(
    () => (typeof idx === "number" ? flat[idx] : undefined),
    [idx, flat],
  );

  const openAt = (i: number) => setIdx(i);
  const close = () => setIdx(null);

  const canPrev = typeof idx === "number" && idx > 0;
  const canNext = typeof idx === "number" && idx < count - 1;

  const goPrev = () =>
    setIdx((i) => (typeof i === "number" ? Math.max(0, i - 1) : i));
  const goNext = () =>
    setIdx((i) => (typeof i === "number" ? Math.min(count - 1, i + 1) : i));

  // keyboard
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
    <main className="mx-auto max-w-5xl px-6 py-10 text-neutral-100">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Awesomeness
        </h1>
        <Button
          asChild
          size="sm"
          className="rounded-xl bg-neutral-100 hover:bg-neutral-300"
        >
          <Link href="/">← Back</Link>
        </Button>
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-neutral-400">
          No entries yet. Add items to <code>~/data.ts</code> in{" "}
          <code className="ml-1">awesomeness</code>.
        </div>
      ) : (
        <div className="grid gap-6">
          {items.map((item, i) => {
            const imgLeft = item.side ? item.side === "left" : i % 2 === 0;

            return (
              <Card
                key={item.title}
                className="overflow-hidden rounded-2xl border-neutral-800 bg-neutral-900"
              >
                <CardContent className="p-0">
                  <div className="grid items-stretch md:grid-cols-2">
                    {/* IMAGE */}
                    <div className={imgLeft ? "order-1" : "order-2"}>
                      {/* fixed-height box so tall/wide photos don’t break layout */}
                      <button
                        type="button"
                        onClick={() => openAt(i)}
                        className="group block w-full"
                        aria-label={`Open ${item.title} image`}
                      >
                        <div className="relative h-64 w-full md:h-80">
                          <Image
                            src={item.image.url}
                            alt={item.image.alt ?? item.title}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform group-hover:scale-[1.01]"
                            priority={false}
                          />
                        </div>
                      </button>
                    </div>

                    {/* TEXT */}
                    <div className={imgLeft ? "order-2" : "order-1"}>
                      <div className="p-5 md:p-6">
                        <h2 className="text-lg font-semibold text-neutral-100">
                          {item.title}
                        </h2>
                        <Separator className="my-3 bg-neutral-800" />
                        <p className="text-sm leading-6 text-neutral-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Separator className="my-8 bg-neutral-800" />

      <p className="text-sm text-neutral-400">
        Edit content in <code>~/data.ts</code>. Images load from{" "}
        <code>/public/awesomeness/*</code> or configured domains.
      </p>

      {/* Lightbox */}
      <Dialog open={isOpen} onOpenChange={(open) => (!open ? close() : null)}>
        <DialogContent
          className="max-w-[min(96vw,1100px)] border-neutral-800 bg-neutral-950 p-0 sm:rounded-2xl"
          aria-describedby={undefined}
        >
          {current && (
            <div className="relative">
              {/* Full image in a bounded box */}
              <div className="relative mx-auto max-h-[80vh] w-full">
                <div className="relative mx-auto h-[80vh] w-full">
                  <Image
                    src={current.image.url}
                    alt={current.image.alt ?? current.title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Caption */}
              <div className="px-4 py-3 text-sm text-neutral-300">
                {current.title}
              </div>

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
    </main>
  );
}
