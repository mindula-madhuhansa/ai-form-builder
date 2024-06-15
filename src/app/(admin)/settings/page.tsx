import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";
import { auth, signIn } from "@/lib/auth";
import { ManageSubscription } from "@/components/manage-subscription";

const Page = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    signIn();
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  const plan = user?.subscribed ? "pro" : "free";

  return (
    <div className="p-4 border rounded-md">
      <h1 className="text-4xl mb-3">Subscription Details</h1>
      <p className="mb-1">You currently are on a {plan} plan</p>
      <ManageSubscription />
    </div>
  );
};

export default Page;
