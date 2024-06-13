import { InferSelectModel } from "drizzle-orm";

import { forms as dbForms } from "@/db/schema";
import { getUserForms } from "@/actions/getUserForms";

import { FormsList } from "@/components/forms-list";

const Page = async () => {
  const forms: InferSelectModel<typeof dbForms>[] = await getUserForms();

  return (
    <>
      <FormsList forms={forms} />
    </>
  );
};

export default Page;
