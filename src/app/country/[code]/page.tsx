import { notFound } from "next/navigation";
import ClientCountryShape from "./ClientCountryShape";

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

// NOTE: params is a Promise now
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
        </section>

        {/* RIGHT: outline — fills its column, no bg/border */}
        <section className="w-full md:justify-self-end">
          {/* The component fits itself to its container */}
          <ClientCountryShape code={code} />
        </section>
      </div>
    </main>
  );
}
