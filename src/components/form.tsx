"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  FormSelectModel,
  QuestionSelectModel,
  FieldOptionSelectModel,
} from "@/types/form-types";
import { publishForm } from "@/actions/mutateForm";

import {
  Form as ShadcnForm,
  FormField as ShadcnFormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form-field";
import { PublishSuccess } from "@/components/publish-success";

type Props = {
  form: Form;
  editMode?: boolean;
};

type QuestionWithOptionsModel = QuestionSelectModel & {
  fieldOptions: Array<FieldOptionSelectModel>;
};

interface Form extends FormSelectModel {
  questions: Array<QuestionWithOptionsModel>;
}

export const Form = (props: Props) => {
  const form = useForm();
  const { editMode } = props;
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleDialogChange = (open: boolean) => {
    setSuccessDialogOpen(open);
  };

  const onSubmit = async (data: any) => {
    console.log(data);

    if (editMode) {
      await publishForm(props.form.id);
      setSuccessDialogOpen(true);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-lg font-bold py-3">{props.form.name}</h1>
      <h3 className="text-md">{props.form.description}</h3>

      <ShadcnForm {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full max-w-3xl items-center gap-6 my-4 text-left"
        >
          {props.form.questions.map(
            (question: QuestionWithOptionsModel, index: number) => (
              <ShadcnFormField
                control={form.control}
                name={`question_${question.id}`}
                key={`${question.text}_${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base mt-3">
                      {index + 1}. {question.text}
                    </FormLabel>
                    <FormControl>
                      <FormField
                        element={question}
                        key={index}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )
          )}
          <Button type="submit">{editMode ? "Publish" : "Submit"}</Button>
        </form>
      </ShadcnForm>
      <PublishSuccess
        formId={props.form.id}
        open={successDialogOpen}
        onOpenChange={handleDialogChange}
      />
    </div>
  );
};
