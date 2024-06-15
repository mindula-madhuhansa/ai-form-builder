"use client";

import { useRouter } from "next/navigation";

import { getStripe } from "@/lib/stripe-client";
import { Button } from "@/components/ui/button";

type Props = {
  userId?: string;
  price: string;
};

export const SubscribeBtn = ({ userId, price }: Props) => {
  const router = useRouter();

  const handleCheckout = async (price: string) => {
    if (!userId) {
      router.push("/login");
    }

    try {
      const { sessionId } = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      }).then((res) => res.json());

      console.log("Session ID:", sessionId);

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Button variant="link" onClick={() => handleCheckout(price)}>
      Upgrade your plan
    </Button>
  );
};
