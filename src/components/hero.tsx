import Image from "next/image";

import { FormGenerator } from "@/components/form-generator";

export const Hero = () => {
  return (
    <>
      <section
        id="hero"
        className="flex flex-col items-center justify-center space-y-4 pt-4 sm:pt-24 w-full bg-[url('/grid.svg')]"
      >
        <h1 className="text-4xl font-bold text-center tracking-tighter sm:text-5xl md:text-6xl leading-6">
          Use AI to generate forms <br></br> with{" "}
          <span className="text-primary">AI Form Builder</span>
        </h1>
        <p className="max-w-[600px] mt-4 text-center text-muted-foreground md:text-xl">
          AI Form Builder is a tool that uses AI to generate forms for you. Just
          provide the data and we will take care of the rest.
        </p>
        <FormGenerator />
        <div className="w-full bg-gradient-to-b from-transparent to-white h-24" />
      </section>

      <section
        id="features"
        className="flex flex-col items-center justify-center space-y-4 mt-12 pb-24"
      >
        <h2 className="text-3xl font-bold text-center tracking-tighter sm:text-4xl md:text-5xl">
          How <span className="text-primary">AI Form Builder</span> works
        </h2>
        <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl text-center">
          <li className="flex flex-col items-center space-y-4 relative">
            <Image
              src="/demo1.png"
              width={250}
              height={250}
              alt="Step 1"
              className="bg-white p-4 shadow-sm border rounded-md"
            />
            <Image
              src="/arrow.svg"
              width={125}
              height={125}
              alt="arrow"
              className="hidden lg:flex absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"
            />
            <p>1. Add a prompt and describe the requirements for your form.</p>
          </li>
          <li className="flex flex-col items-center space-y-4 relative">
            <Image
              src="/demo2.png"
              width={250}
              height={250}
              alt="Step 2"
              className="bg-white p-4 shadow-sm border rounded-md"
            />
            <Image
              src="/arrow.svg"
              width={125}
              height={125}
              alt="arrow"
              className="hidden lg:flex absolute top-1/4 right-0 transform translate-x-1/2 -translate-y-1/2"
            />
            <p>2. Generate the form.</p>
          </li>
          <li className="flex flex-col items-center space-y-4 relative">
            <Image
              src="/demo3.png"
              width={250}
              height={250}
              alt="Step 3"
              className="bg-white p-4 shadow-sm border rounded-md"
            />
            <p>3. Check results, analytics and more.</p>
          </li>
        </ul>
      </section>
    </>
  );
};
