"use client";

import { buySubscription } from "@/actions/payment_actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

const PaymentButton = ({
  title,
  duration,
}: {
  title: string;
  duration: string;
}) => {
  const [subscriptionId, setSubscriptionId] = useState("");
  const subscribeHandler = async () => {
    try {
      const data = await buySubscription(duration);
      console.log(data);
    } catch (error: any) {
      toast.error("Error buying subscription", {
        description: error?.message,
      });
    }
  };
  return (
    <Button
      size={"sm"}
      className={cn(
        "h-9 lg:text-lg font-medium px-10",
        title === "professional plan" &&
          "bg-white text-primary hover:bg-white/40"
      )}
      onClick={subscribeHandler}>
      Choose Plan
    </Button>
  );
};

export default PaymentButton;
