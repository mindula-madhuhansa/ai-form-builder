import { SessionProvider } from "next-auth/react";

import { Header } from "@/components/header";
import { FormGenerator } from "@/components/form-generator";

export default function Home() {
  return (
    <SessionProvider>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <FormGenerator />
      </main>
    </SessionProvider>
  );
}
