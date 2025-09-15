"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import {
  catalog,
  labels,
  categoryDescriptions,
  type CategoryKey,
} from "~/data";

export default function FavoritesPage() {
  const [tab, setTab] = useState<CategoryKey>("movies");

  const items = catalog[tab];
  const avg = useMemo(() => {
    return items.reduce((s, i) => s + i.rating, 0) / items.length;
  }, [items]);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 text-neutral-100">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Favorites</h1>
        <Button
          asChild
          size="sm"
          className="rounded-xl bg-neutral-200 hover:bg-neutral-500"
        >
          <Link href="/">← Back</Link>
        </Button>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {(Object.keys(labels) as CategoryKey[]).map((key) => (
          <Button
            key={key}
            size="sm"
            variant={tab === key ? "default" : "secondary"}
            className={
              tab === key
                ? "rounded-xl bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
                : "rounded-xl bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
            }
            onClick={() => setTab(key)}
          >
            {labels[key]}
          </Button>
        ))}
      </div>

      <Card className="rounded-2xl border-neutral-800 bg-neutral-900">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {labels[tab]}{" "}
            <span className="ml-2 text-sm text-neutral-400">
              (avg {avg.toFixed(1)}/10)
            </span>
          </CardTitle>
          <p className="mt-1 text-sm text-neutral-400">
            {categoryDescriptions?.[tab] ??
              "A personal top-10 with quick 1–10 ratings."}
          </p>
        </CardHeader>
        <CardContent>
          <ol className="grid gap-2">
            {items.map((item, idx) => (
              <li
                key={item.title}
                className="flex items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-grid h-6 w-6 place-items-center rounded-lg bg-neutral-800 text-xs text-neutral-300">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-neutral-100">
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-32 rounded bg-neutral-800">
                    <div
                      className="h-2 rounded bg-neutral-200"
                      style={{
                        width: `${Math.max(0, Math.min(10, item.rating)) * 10}%`,
                      }}
                    />
                  </div>
                  <span className="w-10 text-right text-neutral-300">
                    {item.rating}/10
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Separator className="my-8 bg-neutral-800" />

      <p className="text-sm text-neutral-400">
        Click a tab to switch the list. Data is imported from{" "}
        <code>src/data.ts</code>.
      </p>
    </main>
  );
}
