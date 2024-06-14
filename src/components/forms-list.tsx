import Link from "next/link";
import { InferSelectModel } from "drizzle-orm";

import { forms } from "@/db/schema";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Form = InferSelectModel<typeof forms>;

type Props = {
  forms: Form[];
};

export const FormsList = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 m-5 p-4 gap-4">
      {props.forms.map((form: Form) => (
        <Card key={form.id} className="max-w-[350px] flex flex-col">
          <CardHeader className="flex-1">
            <CardTitle>{form.name}</CardTitle>
            <CardDescription>{form.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={`/forms/edit/${form.id}`} className="w-full">
              <Button className="w-full">View</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
