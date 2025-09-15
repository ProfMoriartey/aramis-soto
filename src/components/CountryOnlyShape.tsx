"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { geoEqualEarth, geoPath, type GeoProjection } from "d3-geo";
import type {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
} from "geojson";
import { feature as topoToGeo } from "topojson-client";
import type { Topology, Objects, GeometryObject } from "topojson-specification";
import { iso31661NumericToAlpha2 as rawMap } from "iso-3166";

const isoMap: Record<string | number, string> = rawMap;

type Props = {
  code: string; // ISO-2
};

// ---- Types & guards ----
function isTopology(v: unknown): v is Topology<Objects<GeoJsonProperties>> {
  return (
    !!v &&
    typeof v === "object" &&
    "type" in v &&
    (v as { type?: unknown }).type === "Topology" &&
    "objects" in v
  );
}

function toFeatureCollection<P extends GeoJsonProperties>(
  topo: Topology<Objects<P>>,
  obj: GeometryObject<P>,
): FeatureCollection<Geometry, P> | null {
  const out = topoToGeo(topo, obj);
  return out.type === "FeatureCollection" ? out : null;
}

function numericToAlpha2(numeric: string): string | null {
  const byNum = isoMap[Number(numeric)];
  if (typeof byNum === "string") return byNum.toUpperCase();
  const byStr = isoMap[numeric];
  return typeof byStr === "string" ? byStr.toUpperCase() : null;
}
// ------------------------

export default function CountryOnlyShape({ code }: Props) {
  const code2 = code.toUpperCase();
  const [world, setWorld] = useState<Topology<
    Objects<GeoJsonProperties>
  > | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // Measure parent box
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  useEffect(() => {
    if (!boxRef.current) return;
    const el = boxRef.current;
    const obs = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (cr) setSize({ w: Math.max(0, cr.width), h: Math.max(0, cr.height) });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Load topology
  useEffect(() => {
    let mounted = true;
    void (async () => {
      try {
        const r = await fetch("/world-110m.json");
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json = (await r.json()) as unknown;
        if (mounted) {
          if (isTopology(json)) setWorld(json);
          else setErr("Invalid topology file");
        }
      } catch (e) {
        if (mounted)
          setErr(e instanceof Error ? e.message : "Failed loading world data");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Pick countries object
  const countriesObject =
    useMemo<GeometryObject<GeoJsonProperties> | null>(() => {
      if (!world) return null;
      const direct =
        (world.objects as { countries?: GeometryObject<GeoJsonProperties> })
          .countries ?? null;
      if (direct) return direct;
      const anyFirst = Object.values(
        world.objects as Record<string, GeometryObject<GeoJsonProperties>>,
      )[0];
      return anyFirst ?? null;
    }, [world]);

  // Find the selected country feature
  const selected: Feature<Geometry, GeoJsonProperties> | null = useMemo(() => {
    if (!world || !countriesObject) return null;
    const fc = toFeatureCollection(world, countriesObject);
    if (!fc) return null;

    for (const f of fc.features) {
      const id = f?.id != null ? String(f.id).padStart(3, "0") : null;
      if (!id) continue;
      const a2 = numericToAlpha2(id);
      if (a2 && a2 === code2) return f;
    }
    return null;
  }, [world, countriesObject, code2]);

  // Fit projection to container size
  const projection: GeoProjection | null = useMemo(() => {
    if (!selected || size.w === 0 || size.h === 0) return null;
    try {
      return geoEqualEarth().fitSize([size.w, size.h], selected);
    } catch {
      return null;
    }
  }, [selected, size.w, size.h]);

  const pathGen = useMemo(
    () => (projection ? geoPath(projection) : null),
    [projection],
  );
  const d = useMemo(
    () => (pathGen && selected ? (pathGen(selected) ?? "") : ""),
    [pathGen, selected],
  );

  // Flags for guards
  const hasWorld = world != null;
  const hasShape = !!selected && !!projection;

  return (
    // No borders/background. The parent grid controls the space.
    <div ref={boxRef} className="h-[280px] w-full md:h-[360px]">
      {!hasWorld && !err && (
        <div className="h-full w-full animate-pulse rounded bg-neutral-900" />
      )}

      {err && (
        <div className="rounded border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">
          Failed to load map data: {err}
        </div>
      )}

      {hasWorld && hasShape && (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${Math.max(1, size.w)} ${Math.max(1, size.h)}`}
          role="img"
          aria-label={`${selected?.properties?.name ?? code2} outline`}
          className="block"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d={d}
            className="fill-neutral-400 stroke-neutral-300 [stroke-width:0.75]"
            tabIndex={0}
          />
        </svg>
      )}

      {hasWorld && !selected && !err && (
        <div className="text-sm text-neutral-400">
          No shape for code {code2}
        </div>
      )}
    </div>
  );
}
