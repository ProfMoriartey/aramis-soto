"use client";

import { useEffect, useMemo, useState } from "react";
import { geoEqualEarth, geoPath, type GeoProjection } from "d3-geo";
import type {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
} from "geojson";
import { feature as topoToGeo } from "topojson-client";
import type {
  Topology,
  Objects,
  GeometryObject,
  GeometryCollection,
} from "topojson-specification";
import { iso31661NumericToAlpha2 as rawMap } from "iso-3166";

const isoMap: Record<string | number, string> = rawMap;

type Props = {
  code: string; // ISO-2
  title?: string;
  width?: number;
  height?: number;
};

// ---- Type guards (no `any`) ----
function isTopology(v: unknown): v is Topology<Objects<GeoJsonProperties>> {
  return (
    !!v &&
    typeof v === "object" &&
    "type" in v &&
    (v as { type?: unknown }).type === "Topology" &&
    "objects" in v
  );
}

function isGeometryCollection<P extends GeoJsonProperties>(
  g: GeometryObject<P>,
): g is GeometryCollection<P> {
  return g.type === "GeometryCollection";
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
// --------------------------------

export default function CountryOnlyShape({
  code,
  title = "Country shape",
  width = 640,
  height = 360,
}: Props) {
  const code2 = code.toUpperCase();
  const [world, setWorld] = useState<Topology<
    Objects<GeoJsonProperties>
  > | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // Load topology (typed, no `any`)
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
        if (mounted) {
          setErr(e instanceof Error ? e.message : "Failed loading world data");
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Extract the countries object with full types
  const countriesObject =
    useMemo<GeometryObject<GeoJsonProperties> | null>(() => {
      if (!world) return null;

      const objRecord = world.objects as Record<
        string,
        GeometryObject<GeoJsonProperties>
      >;

      // Prefer a key named "countries"
      const byName =
        (world.objects as { countries?: GeometryObject<GeoJsonProperties> })
          .countries ?? null;
      if (byName) return byName;

      const first = Object.values(objRecord)[0] ?? null;
      return first;
    }, [world]);

  // Convert to FeatureCollection and find the country
  const selected: Feature<Geometry, GeoJsonProperties> | null = useMemo(() => {
    if (!world || !countriesObject) return null;

    const fc = toFeatureCollection(world, countriesObject);
    if (!fc) return null;

    for (const f of fc.features) {
      const id = f?.id != null ? String(f.id).padStart(3, "0") : null;
      if (!id) continue;
      const a2 = numericToAlpha2(id);
      if (a2 && a2 === code2) return f; // no assertion needed
    }
    return null;
  }, [world, countriesObject, code2]);

  // Build projection that fits exactly to the country
  const projection: GeoProjection | null = useMemo(() => {
    if (!selected) return null;
    try {
      return geoEqualEarth().fitSize([width, height], selected);
    } catch {
      return null;
    }
  }, [selected, width, height]);

  const pathGen = useMemo(
    () => (projection ? geoPath(projection) : null),
    [projection],
  );
  const d = useMemo(
    () => (pathGen && selected ? (pathGen(selected) ?? "") : ""),
    [pathGen, selected],
  );

  const hasWorld = world != null;
  const hasShape = !!selected && !!projection;

  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-3">
      <div className="mb-2 text-sm text-neutral-400">{title}</div>

      <div className="relative">
        {!hasWorld && !err && (
          <div className="h-[380px] w-full animate-pulse rounded-2xl bg-neutral-900" />
        )}

        {err && (
          <div className="rounded-lg border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">
            Failed to load map data: {err}
          </div>
        )}

        {hasWorld && hasShape && (
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label={`${selected?.properties?.name ?? code2} outline`}
            className="block"
          >
            <path
              d={d}
              className="fill-neutral-200 stroke-neutral-300 [stroke-width:0.75]"
              tabIndex={0}
            />
          </svg>
        )}

        {hasWorld && !selected && !err && (
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-3 text-sm text-neutral-300">
            No shape for code {code2}
          </div>
        )}
      </div>
    </section>
  );
}
