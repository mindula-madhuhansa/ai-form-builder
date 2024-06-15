import Link from "next/link";
import { CircleCheckBigIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Page = () => {
  return (
    <div className="flex items-center justify-center h-full p-24">
      <Alert variant="success">
        <CircleCheckBigIcon className="size-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your payment was successful. You will receive an email with your
          invoice shortly.{" "}
          <Link href="/view-forms" className="underline">
            Back to Dashboard
          </Link>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Page;
