"use client";

import { LinkIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  formId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const PublishSuccess = (props: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`${baseUrl}/form/${props.formId}`)
      .then(() => alert("Copied to clipboard"))
      .catch((err) => alert("Failed to copy to clipboard"));
  };

  return (
    <div>
      <Dialog open={props.open} onOpenChange={props.onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Your form has been published successfully!
            </DialogTitle>
            <DialogDescription>
              Your form is now live and ready to be filled out by your users.
              You can now share using the link below.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col">
            <p>Copy link</p>
            <div className="border-2 border-gray-200 flex justify-between items-center mt-2 pl-2 rounded-md">
              <LinkIcon className="size-5 mr-3" />
              <input
                type="text"
                placeholder="Link"
                disabled
                value={`${baseUrl}/form/${props.formId}`}
                className="w-full outline-none bg-transparent"
              />
              <Button type="button" onClick={copyToClipboard}>
                Copy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
