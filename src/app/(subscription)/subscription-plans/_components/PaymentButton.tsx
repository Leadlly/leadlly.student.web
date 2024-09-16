"use client";

import { buySubscription } from "@/actions/subscription_actions";
import { Button } from "@/components/ui/button";
import { UserDataProps } from "@/helpers/types";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Script from "next/script";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { loadRazorpayScript } from "@/helpers/utils";

const PaymentButton = ({
  title,
  duration,
  user,
}: {
  title: string;
  duration: string;
  user: UserDataProps;
}) => {
  const [subscriptionId, setSubscriptionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const subscriptionIdParams = searchParams.get("subscriptionId");
  const appRedirectParam = searchParams.get("redirect");

  useEffect(() => {
    if (subscriptionIdParams) {
      setSubscriptionId(subscriptionIdParams);
    }
  }, [subscriptionIdParams]);

  const subscribeHandler = async () => {
    setIsLoading(true);

    try {
      const data = await buySubscription(duration);
      setSubscriptionId(data?.id);
    } catch (error: any) {
      toast.error("Error buying subscription", {
        description: error?.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openRazorpayPopUp = () => {
    const options = {
      key: process.env.RAZORPAY_API_KEY,
      name: "Leadlly",
      subscription_id: subscriptionId,
      callback_url: appRedirectParam
        ? `${appRedirectParam}?transaction=true`
        : `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/subscribe/verify`,
      modal: {
        ondismiss: function () {
          window.location.href = appRedirectParam
            ? `${appRedirectParam}?transaction=cancelled`
            : "/subscription-plans";
        },
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#9654f4",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  useEffect(() => {
    if (subscriptionId) {
      const loadAndOpenRazorpay = async () => {
        const isLoaded = await loadRazorpayScript();
        if (isLoaded) {
          openRazorpayPopUp();
        } else {
          console.error("Razorpay script failed to load");
        }
      };

      loadAndOpenRazorpay();
    }
  }, [subscriptionId]);
  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Button
        size={"sm"}
        className={cn(
          "h-9 lg:text-lg font-medium px-10",
          title === "professional plan" &&
            "bg-white text-primary hover:bg-white/40"
        )}
        onClick={subscribeHandler}
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
