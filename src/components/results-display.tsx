import { eq } from "drizzle-orm";

import { db } from "@/db";
import { forms } from "@/db/schema";

import { Table } from "@/components/table";

type Props = {
  formId: number;
};

export const ResultsDisplay = async ({ formId }: Props) => {
  const form = await db.query.forms.findFirst({
    where: eq(forms.id, formId),
    with: {
      questions: {
        with: {
          fieldOptions: true,
        },
      },
      submissions: {
        with: {
          answers: {
            with: {
              fieldOption: true,
            },
          },
        },
      },
    },
  });

  if (!form) return null;
  if (!form.submissions) return <p>No submissions on this form yet!</p>;

  return (
    <div>
      <Table data={form.submissions} columns={form.questions} />
    </div>
  );
};
