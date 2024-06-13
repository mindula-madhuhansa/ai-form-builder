"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useFormState, useFormStatus } from "react-dom";

import { generateForm } from "@/actions/generateForm";
import { navigate } from "@/actions/navigateToForm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const initialState: {
  message: string;
  data?: any;
} = {
  message: "",
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Generating..." : "Generate"}
    </Button>
  );
};

export const FormGenerator = () => {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(generateForm, initialState);
  const session = useSession();

  useEffect(() => {
    if (state.message === "success") {
      setOpen(false);
      navigate(state.data.id);
    }
  }, [state]);

  const onFormCreate = () => {
    if (session.data?.user) {
      setOpen(true);
    } else {
      signIn();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={onFormCreate}>Create Form</Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
        </DialogHeader>

        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <Textarea
              id="description"
              name="description"
              placeholder="Share what your form is about, who is it for, and what information you would like to collect. AI will do the magic ✨"
            />
          </div>

          <DialogFooter>
            <SubmitButton />
            <Button variant="link">Create Manually</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
