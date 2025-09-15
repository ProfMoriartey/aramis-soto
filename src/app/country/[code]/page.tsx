import { notFound } from "next/navigation";
import ClientCountryShape from "./ClientCountryShape";
import {
  countryEntries,
  notVisitedTemplate,
  type CountryEntry,
  countryPhotos,
  type CountryPhoto,
} from "~/data";

type Country = {
  name: { common?: string };
  flags?: { svg?: string; png?: string; alt?: string };
  cca2?: string;
  region?: string;
  population?: number;
};

async function fetchCountry(code: string): Promise<Country | null> {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) return null;

  const data = (await res.json()) as unknown;
  if (!Array.isArray(data) || data.length === 0) return null;

  const c = data[0] as Partial<Country>;
  return {
    name: { common: c?.name?.common },
    flags: { svg: c?.flags?.svg, png: c?.flags?.png, alt: c?.flags?.alt },
    cca2: c?.cca2,
    region: c?.region,
    population: typeof c?.population === "number" ? c.population : undefined,
  };
}

// Next 15: params is a Promise
export default async function CountryPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code: raw } = await params;
  const code = raw?.toUpperCase();
  if (!code || code.length !== 2) notFound();

  const country = await fetchCountry(code);
  if (!country) notFound();

  const name = country.name.common ?? code;
  const flag = country.flags?.svg ?? country.flags?.png ?? "";

  // Trip details
  const entry: CountryEntry | undefined = countryEntries[code];
  const details: CountryEntry = entry ?? notVisitedTemplate;
  const visited = Boolean(entry);

  // Photos (optional)
  const photos: CountryPhoto[] = countryPhotos[code] ?? [];

  return (
    <main className="mx-auto max-w-5xl p-6">
      <a
        href="/map"
        className="text-sm text-neutral-400 hover:text-neutral-200"
      >
        ← Back to map
      </a>

      <div className="mt-4 grid items-start gap-8 md:grid-cols-2">
        {/* LEFT: details */}
        <section>
          <header className="flex items-center gap-4">
            {flag ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={flag}
                alt={country.flags?.alt ?? `${name} flag`}
                className="h-10 w-auto rounded border border-neutral-800"
                loading="lazy"
              />
            ) : null}
            <h1 className="text-2xl font-semibold text-neutral-100">{name}</h1>
          </header>

          {/* Basic info */}
          <dl className="mt-6 grid gap-3 text-neutral-300">
            <div>
              <dt className="text-neutral-500">Code</dt>
              <dd>{code}</dd>
            </div>
            {country.region && (
              <div>
                <dt className="text-neutral-500">Region</dt>
                <dd>{country.region}</dd>
              </div>
            )}
            {typeof country.population === "number" && (
              <div>
                <dt className="text-neutral-500">Population</dt>
                <dd>{country.population.toLocaleString()}</dd>
              </div>
            )}
          </dl>

          {/* Trip details */}
          <section className="mt-6">
            <h2 className="mb-2 text-lg font-medium text-neutral-100">
              {visited ? "Trip details" : "Planning"}
            </h2>
            <div className="grid gap-2 text-neutral-300">
              <div>
                <span className="text-neutral-500">Stay duration:</span>{" "}
                {details.stayDuration ?? "—"}
              </div>
              <div>
                <span className="text-neutral-500">Stay date:</span>{" "}
                {details.stayDate ?? "—"}
              </div>
              <div>
                <span className="text-neutral-500">Overall experience:</span>{" "}
                {typeof details.overallExperience === "number"
                  ? `${details.overallExperience}/10`
                  : "—"}
              </div>
              {details.notes && (
                <div className="text-neutral-400">{details.notes}</div>
              )}
            </div>
          </section>
        </section>

        {/* RIGHT: outline */}
        <section className="w-full md:justify-self-end">
          <ClientCountryShape code={code} />
        </section>
      </div>

      {/* GALLERY (below all sections) */}
      <section className="mt-10">
        <h2 className="mb-3 text-lg font-medium text-neutral-100">
          To Remember
        </h2>

        {photos.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p, i) => (
              <li key={`${p.url}-${i}`} className="group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.url}
                  alt={p.alt ?? `${name} photo ${i + 1}`}
                  className="aspect-[4/3] w-full rounded-xl object-cover ring-1 ring-neutral-800 group-hover:opacity-95"
                  loading="lazy"
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
            No photos yet for {name}. Add some in your data file when ready.
          </div>
        )}
      </section>
    </main>
  );
}
