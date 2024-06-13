import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleCheckBigIcon } from "lucide-react";

const Page = () => {
  return (
    <div className="">
      <Alert variant="success">
        <CircleCheckBigIcon className="size-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your answers were recorded successfully. Thank you for your time.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Page;
