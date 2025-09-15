"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { iso31661NumericToAlpha2 as rawMap } from "iso-3166";

const geoUrl = "/world-110m.json";

const isoMap: Record<string | number, string> = rawMap;

// ---------- safe helpers ----------
type RawGeo = unknown;

function getGeoId(value: RawGeo): string | null {
  if (value && typeof value === "object" && "id" in value) {
    const raw = (value as { id?: unknown }).id;
    if (typeof raw === "number" || typeof raw === "string") {
      return String(raw).padStart(3, "0");
    }
  }
  return null;
}

function getGeoName(value: RawGeo): string | null {
  if (value && typeof value === "object" && "properties" in value) {
    const props = (value as { properties?: unknown }).properties;
    if (props && typeof props === "object" && "name" in props) {
      const name = (props as { name?: unknown }).name;
      if (typeof name === "string") return name;
    }
  }
  return null;
}

function numericToAlpha2(numeric: string): string | null {
  const byNum = isoMap[Number(numeric)];
  if (typeof byNum === "string") return byNum.toUpperCase();

  const byStr = isoMap[numeric];
  return typeof byStr === "string" ? byStr.toUpperCase() : null;
}
// -----------------------------------

export default function MapChart() {
  const router = useRouter();
  const [hover, setHover] = useState<string | null>(null);

  // Typed render function avoids inline assertions
  function renderGeos(args: { geographies: ReadonlyArray<RawGeo> }) {
    const { geographies } = args;

    return geographies.map((geo, idx) => {
      const id = getGeoId(geo);
      if (!id) return null;

      const code2 = numericToAlpha2(id);
      if (!code2) return null;

      const name = getGeoName(geo) ?? code2 ?? id;
      const isHover = hover === code2;

      return (
        <Geography
          key={`${code2}-${idx}`}
          // react-simple-maps types this prop as `any`.
          // We pass the raw object through intentionally.
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          geography={geo}
          aria-label={name}
          tabIndex={0}
          onMouseEnter={() => setHover(code2)}
          onMouseLeave={() => setHover(null)}
          onClick={() => router.push(`/country/${code2}`)}
          onKeyDown={(e) => {
            if (e.key === "Enter") router.push(`/country/${code2}`);
          }}
          style={{
            default: {
              outline: "none",
              fill: isHover ? "#404040" : "#171717",
              stroke: "#262626",
              strokeWidth: 0.5,
              transition: "fill 120ms ease",
            },
            hover: { outline: "none", fill: "#404040" },
            pressed: { outline: "none", fill: "#525252" },
          }}
        />
      );
    });
  }

  return (
    <div className="rounded-2xl bg-neutral-900 p-4 ring-1 ring-neutral-800 select-none">
      <ComposableMap projection="geoEqualEarth" width={980} height={520}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>{renderGeos}</Geographies>
        </ZoomableGroup>
      </ComposableMap>

      <div className="mt-3 h-5 text-sm text-neutral-400">
        {hover ? `Selected: ${hover}` : "Hover a country"}
      </div>
    </div>
  );
}
