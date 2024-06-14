import Link from "next/link";
import Image from "next/image";

import { auth, signIn, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" variant="outline">
        Sign Out
      </Button>
    </form>
  );
};

export const Header = async () => {
  const session = await auth();

  return (
    <header className="border bottom-1">
      <nav className="bg-white border-gray-200 px-4 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/">AI Form Builder</Link>
          <div>
            {session?.user ? (
              <div className="flex items-center gap-4">
                {session.user.image && session.user.name && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                )}
                <Link href="/view-forms">
                  <Button variant="default">Dashboard</Button>
                </Link>
                <SignOut />
              </div>
            ) : (
              <Link href="/api/auth/signin">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
