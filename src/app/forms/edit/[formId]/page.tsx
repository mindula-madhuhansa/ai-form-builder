import { eq } from "drizzle-orm";

import { db } from "@/db";
import { auth } from "@/lib/auth";
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

  const session = await auth();
  const userId = session?.user?.id;

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

  if (userId !== form?.userId) {
    return <div>You are not authorized to view this form</div>;
  }

  if (!form) {
    return <div>Form not found</div>;
  }

  return (
    <div>
      <Form form={form} editMode={true} />
    </div>
  );
};

export default Page;
