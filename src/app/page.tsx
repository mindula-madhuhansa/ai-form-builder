import { SessionProvider } from "next-auth/react";

import { db } from "@/db";

import { Header } from "@/components/header";
import { FormGenerator } from "@/components/form-generator";
import { FormsList } from "@/components/forms-list";

export default async function Home() {
  const forms = await db.query.forms.findMany();

  return (
    <SessionProvider>
      <Header />
      <main className="flex min-h-screen flex-col items-center p-24">
        <FormGenerator />
        <FormsList forms={forms} />
      </main>
    </SessionProvider>
  );
}
