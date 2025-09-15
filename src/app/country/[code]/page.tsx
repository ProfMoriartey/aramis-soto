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
  const { code: raw } = await params; // await the promise
  const code = raw?.toUpperCase();

  if (!code || code.length !== 2) notFound();

  const country = await fetchCountry(code);
  if (!country) notFound();

  const name = country.name.common ?? code;
  const flag = country.flags?.svg ?? country.flags?.png ?? "";

  return (
    <main className="mx-auto max-w-3xl p-6">
      <a
        href="/map"
        className="text-sm text-neutral-400 hover:text-neutral-200"
      >
        ← Back to map
      </a>

      <header className="mt-3 flex items-center gap-4">
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

      <section className="mt-6 grid gap-3 text-neutral-300">
        <div>
          <span className="text-neutral-500">Code:</span> {code}
        </div>
        {country.region && (
          <div>
            <span className="text-neutral-500">Region:</span> {country.region}
          </div>
        )}
        {typeof country.population === "number" && (
          <div>
            <span className="text-neutral-500">Population:</span>{" "}
            {country.population.toLocaleString()}
          </div>
        )}
      </section>

      <div className="mt-6">
        <ClientCountryShape code={code} title="Country outline" />
      </div>

      <section className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
        <h2 className="mb-3 text-lg font-medium text-neutral-100">
          Your entries
        </h2>
        <p className="text-neutral-400">
          No entries yet. Add photos and notes from your admin page.
        </p>
      </section>
    </main>
  );
}
