"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { forms } from "@/db/schema";

export async function getUserForms() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return [];
  }

  const userForms = await db.query.forms.findMany({
    where: eq(forms.userId, userId),
  });

  return userForms;
}
