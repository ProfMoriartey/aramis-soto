export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <a
        href="/map"
        className="text-sm text-neutral-400 hover:text-neutral-200"
      >
        ← Back to map
      </a>
      <h1 className="mt-4 text-xl font-semibold text-neutral-100">
        Country not found
      </h1>
      <p className="mt-2 text-neutral-400">
        Check the URL. The code should be an ISO-3166 alpha-2 like TR, MX, US.
      </p>
    </main>
  );
}
