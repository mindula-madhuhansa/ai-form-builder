import { SessionProvider } from "next-auth/react";

import { Hero } from "@/components/hero";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <SessionProvider>
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        <Hero />
      </main>
    </SessionProvider>
  );
}
