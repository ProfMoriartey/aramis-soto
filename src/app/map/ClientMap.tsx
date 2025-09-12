"use client";

import dynamic from "next/dynamic";

const MapChart = dynamic(() => import("~/components/MapChart"), {
  ssr: false,
  loading: () => (
    <div className="grid h-96 place-items-center">Loading map…</div>
  ),
});

export default function ClientMap() {
  return <MapChart />;
}
