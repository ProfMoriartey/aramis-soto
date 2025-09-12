"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { iso31661NumericToAlpha2 } from "iso-3166";

const geoUrl = "/world-110m.json"; // if you saved it in /public

export default function MapChart() {
  const router = useRouter();
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="select-none">
      <div className="rounded-2xl bg-neutral-900 p-4 ring-1 ring-neutral-800 select-none">
        <ComposableMap projection="geoEqualEarth" width={980} height={520}>
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const numeric = String(geo.id).padStart(3, "0");
                  const code2 =
                    iso31661NumericToAlpha2[Number(numeric)] ??
                    iso31661NumericToAlpha2[numeric];
                  const name =
                    (geo.properties as any)?.name || code2 || numeric;

                  if (!code2) return null;

                  const isHover = hover === code2;

                  return (
                    <Geography
                      key={geo.rsmKey}
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
                          fill: isHover ? "#404040" : "#171717", // dark fills
                          stroke: "#262626", // subtle borders
                          strokeWidth: 0.5,
                          transition: "fill 120ms ease",
                        },
                        hover: { outline: "none", fill: "#404040" },
                        pressed: { outline: "none", fill: "#525252" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <div className="mt-3 h-5 text-sm text-neutral-400">
        {hover ? `Selected: ${hover}` : "Hover a country"}
      </div>
    </div>
  );
}
