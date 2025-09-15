"use client";

import dynamic from "next/dynamic";

const CountryOnlyShape = dynamic(
  () => import("~/components/CountryOnlyShape"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-6 h-[380px] w-full animate-pulse rounded-2xl bg-neutral-900" />
    ),
  },
);

export default function ClientCountryShape(props: {
  code: string;
  title?: string;
}) {
  return <CountryOnlyShape {...props} />;
}
