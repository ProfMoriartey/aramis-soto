import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const upper = code?.toUpperCase() ?? "XX";
  return {
    title: `Country: ${upper}`,
    description: `Info and entries for ${upper}.`,
    openGraph: { title: `Country: ${upper}` },
  };
}
