"use client";

import { getFreeTrialActive } from "@/actions/subscription_actions";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const TrialSubscription = () => {
  const [isActivating, setIsActivating] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const onClickHandler = async () => {
    setIsActivating(true);

    try {
      const res = await getFreeTrialActive();
      dispatch(userData(res.user));

      toast.success(res?.message);

      router.replace("/initial-study-data");
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsActivating(false);
    }
  };
  return (
    <section className="w-full h-full flex items-center justify-center px-3">
      <Button
        onClick={onClickHandler}
        size="lg"
        className="text-base md:text-lg"
        disabled={isActivating}
      >
        {isActivating ? (
          <span className="flex items-center">
            <Loader2 className="mr-2 w-5 h-5 animate-spin" />
            Activating
          </span>
        ) : (
          "Activate Trial"
        )}
      </Button>
    </section>
  );
};

export default TrialSubscription;
