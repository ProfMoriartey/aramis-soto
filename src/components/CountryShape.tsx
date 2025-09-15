"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { iso31661NumericToAlpha2 as rawMap } from "iso-3166";
import { useMemo } from "react";

const isoMap: Record<string | number, string> = rawMap;
const geoUrl = "/world-110m.json";

type Props = { code: string; title?: string };

function getAlpha2FromGeo(geo: unknown): string | null {
  if (geo && typeof geo === "object" && "id" in geo) {
    const raw = (geo as { id?: unknown }).id;
    if (typeof raw === "number" || typeof raw === "string") {
      const numeric = String(raw).padStart(3, "0");
      const byNum = isoMap[Number(numeric)];
      if (typeof byNum === "string") return byNum.toUpperCase();
      const byStr = isoMap[numeric];
      if (typeof byStr === "string") return byStr.toUpperCase();
    }
  }
  return null;
}

export default function CountryShape({ code, title }: Props) {
  const code2 = code.toUpperCase();

  const pathBase =
    "outline-none [stroke-width:0.5] transition-colors duration-150 " +
    "focus-visible:stroke-neutral-200 focus-visible:[stroke-width:1]";

  const containerCls =
    "rounded-2xl border border-neutral-800 bg-neutral-900 p-3";

  // Memo title
  const heading = useMemo(() => title ?? "Map preview", [title]);

  return (
    <section className={containerCls} aria-label={heading}>
      <div className="mb-2 text-sm text-neutral-400">{heading}</div>

      <ComposableMap projection="geoEqualEarth" width={640} height={360}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              (geographies as ReadonlyArray<unknown>).map((geo, idx) => {
                const alpha2 = getAlpha2FromGeo(geo);
                const isTarget = alpha2 === code2;

                return (
                  <Geography
                    key={`${alpha2 ?? "xx"}-${idx}`}
                    // react-simple-maps types this as `any`; safe pass-through.
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    geography={geo}
                    className={[
                      pathBase,
                      isTarget
                        ? "fill-neutral-200 stroke-neutral-300"
                        : "fill-neutral-900 stroke-neutral-800 hover:fill-neutral-800",
                    ].join(" ")}
                    tabIndex={isTarget ? 0 : -1}
                    aria-label={alpha2 ?? "Unknown"}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </section>
  );
}
