export default function Loading() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="h-6 w-24 animate-pulse rounded bg-neutral-800" />
      <div className="mt-6 h-5 w-48 animate-pulse rounded bg-neutral-800" />
      <div className="mt-2 h-5 w-64 animate-pulse rounded bg-neutral-800" />
    </main>
  );
}
