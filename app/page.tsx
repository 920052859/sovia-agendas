"use client";

import { ConfiguratorProvider } from "./context/store";
import Hero from "./components/Hero";
import LiveStudio from "./components/LiveStudio";

export default function Home() {
  return (
    <ConfiguratorProvider>
      <main className="min-h-screen bg-[#faf6f0] text-[#2a2521]">
        <Hero />
        <LiveStudio />
      </main>
    </ConfiguratorProvider>
  );
}
