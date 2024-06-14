import { InferSelectModel } from "drizzle-orm";

import { forms } from "@/db/schema";
import { getUserForms } from "@/actions/getUserForms";

import { FormPicker } from "@/components/form-picker";
import { ResultsDisplay } from "@/components/results-display";

const Page = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const userForms: Array<InferSelectModel<typeof forms>> = await getUserForms();

  if (!userForms?.length || userForms.length === 0) {
    return <div>No forms found</div>;
  }

  const selectOptions = userForms.map((form) => {
    return {
      label: form.name,
      value: form.id,
    };
  });

  return (
    <div>
      <FormPicker options={selectOptions} />
      <ResultsDisplay
        formId={
          searchParams?.formId
            ? parseInt(searchParams.formId as string)
            : userForms[0].id
        }
      />
    </div>
  );
};

export default Page;
