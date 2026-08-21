"use client";

import { ConfiguratorProvider } from "./context/store";
import Hero from "./components/Hero";
import LiveStudio from "./components/LiveStudio";

export default function Home() {
  return (
    <ConfiguratorProvider>
      <main className="min-h-screen bg-[#f8fbfc] text-[#102e3b]">
        <Hero />
        <LiveStudio />
      </main>
    </ConfiguratorProvider>
  );
}
