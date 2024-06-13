"use server";

import { db } from "@/db";
import { formSubmissions, answers as dbAnswers } from "@/db/schema";

export type Answer = {
  questionId: number;
  value?: string | null;
  fieldOptionsId?: number | null;
};

interface SubmitAnswerData {
  formId: number;
  answers: Answer[];
}

export async function submitAnswers(data: SubmitAnswerData) {
  const { formId, answers } = data;

  try {
    const newFormSubmission = await db
      .insert(formSubmissions)
      .values({
        formId,
      })
      .returning({ insertedId: formSubmissions.id });

    const [{ insertedId }] = newFormSubmission;

    await db.transaction(async (tx) => {
      for (const answer of answers) {
        await tx
          .insert(dbAnswers)
          .values({
            formSubmissionId: insertedId,
            ...answer,
          })
          .returning({
            answerId: dbAnswers.id,
          });
      }
    });

    return insertedId;
  } catch (error) {
    console.error(error);
    return null;
  }
}
