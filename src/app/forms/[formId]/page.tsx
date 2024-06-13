import { eq } from "drizzle-orm";

import { db } from "@/db";
import { forms } from "@/db/schema";

import { Form } from "@/components/form";

const Page = async ({
  params,
}: {
  params: {
    formId: string;
  };
}) => {
  const formId = params.formId;

  if (!formId) {
    return <div>Form not found</div>;
  }

  const form = await db.query.forms.findFirst({
    where: eq(forms.id, parseInt(formId)),
    with: {
      questions: {
        with: {
          fieldOptions: true,
        },
      },
    },
  });

  if (!form) {
    return <div>Form not found</div>;
  }

  return (
    <div>
      <Form form={form} editMode={false} />
    </div>
  );
};

export default Page;
