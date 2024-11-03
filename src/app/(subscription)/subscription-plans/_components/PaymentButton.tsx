"use client";

import { buySubscription } from "@/actions/subscription_actions";
import { Button } from "@/components/ui/button";
import { UserDataProps } from "@/helpers/types";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { loadRazorpayScript } from "@/helpers/utils";

const PaymentButton = ({
  category,
  price,
  planId,
  // setSubscriptionId,
}: {
  category: string;
  planId: string;
  price: number;
  // setSubscriptionId: (subscriptionId: string) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // const subscribeHandler = async () => {
  //   setIsLoading(true);

  //   try {
  //     const data = await buySubscription(planId);
  //     setSubscriptionId(data?.id);
  //   } catch (error: any) {
  //     toast.error("Error buying subscription", {
  //       description: error?.message,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <Button
        size={"sm"}
        className={cn("h-9 lg:text-lg font-medium px-10")}
        // onClick={subscribeHandler}
        onClick={() =>
          router.push(
            `/subscription-plans/apply-coupon?price=${price}&category=${category}&planId=${planId}`
          )
        }
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
          </>
        ) : (
          "Choose Plan"
        )}
      </Button>
    </>
  );
};

export default PaymentButton;
