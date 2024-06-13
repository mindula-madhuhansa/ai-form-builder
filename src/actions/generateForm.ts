"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { saveForm } from "@/actions/mutateForm";

export async function generateForm(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    description: z.string().min(10),
  });

  const parse = schema.safeParse({
    description: formData.get("description"),
  });

  if (!parse.success) {
    console.error(parse.error);
    return {
      message: "failed to parse data",
    };
  }

  const data = parse.data;
  const promptExplanation =
    "Based on the description, generate a survey object with 3 fields: name(string) for the form, description(string) of the form and a questions array where every element has 2 fields: text and the fieldType and fieldType can be of these options RadioGroup, Select, Input, Textarea, Switch; and return it in json format. For RadioGroup, and Select types also return fieldOptions array with text and value fields. For example, for RadioGroup, and Select types, the field options array can be [{text: 'Yes', value: 'yes'}, {text: 'No', value: 'no'}] and for Input, Textarea, and Switch types, the field options array can be empty. For example, for Input, Textarea, and Switch types, the field options array can be []";

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: promptExplanation,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      },
    });

    const result = await chat.sendMessage(data.description);
    const response = await result.response;
    const text = response
      .text()
      .replace("```json", "")
      .replace("```", "")
      .trim();

    const responseJson = JSON.parse(text);

    const dbFormId = await saveForm({
      name: responseJson.name,
      description: responseJson.description,
      questions: responseJson.questions,
    });

    revalidatePath("/");

    return {
      message: "success",
      data: { formId: dbFormId },
    };
  } catch (error) {
    console.error(error);
    return {
      message: "failed to generate form",
    };
  }
}
