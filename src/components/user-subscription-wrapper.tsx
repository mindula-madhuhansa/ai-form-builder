import { eq } from "drizzle-orm";
import { LockIcon } from "lucide-react";

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { forms } from "@/db/schema";
import { MAX_FREE_FORMS } from "@/lib/utils";
import { getUserSubscription } from "@/actions/userSubscription";

import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
};

export const UserSubscriptionWrapper = async ({ children }: Props) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return null;

  const subscription = await getUserSubscription({ userId });
  const userForms = await db.query.forms.findMany({
    where: eq(forms.userId, userId),
  });

  const userFormsCount = userForms.length;

  if (subscription || userFormsCount < MAX_FREE_FORMS)
    return {
      children,
    };

  return (
    <Button disabled>
      <LockIcon className="size-4 mr-2" />
      Upgrade to create forms
    </Button>
  );
};
