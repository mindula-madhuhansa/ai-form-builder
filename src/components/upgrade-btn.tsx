import { auth } from "@/lib/auth";
import { MAX_FREE_FORMS } from "@/lib/utils";
import { getUserForms } from "@/actions/getUserForms";
import { getUserSubscription } from "@/actions/userSubscription";

import { Progress } from "@/components/ui/progress";
import { SubscribeBtn } from "@/components/subscribe-btn";

export const UpgradeBtn = async () => {
  const forms = await getUserForms();
  const formCount = forms.length;

  const percent = (formCount / MAX_FREE_FORMS) * 100;

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return null;

  const subscription = await getUserSubscription({ userId });

  if (subscription) return null;

  return (
    <div className="p-4 mb-4 text-left text-xs">
      <Progress value={percent} />

      <p className="mt-2">
        {formCount} out of {MAX_FREE_FORMS} forms generated.
      </p>

      <SubscribeBtn userId={userId} price="price_1PRpaBDFuo2gr4uaKfvH8GQB" />
    </div>
  );
};
