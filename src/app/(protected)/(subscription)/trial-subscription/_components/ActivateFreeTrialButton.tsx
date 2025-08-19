"use client";

import { getFreeTrialActive } from "@/actions/subscription_actions";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"; // Import useAppSelector to access Redux state
import { userData } from "@/redux/slices/userSlice";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ActivateFreeTrialButton = () => {
  const [isActivating, setIsActivating] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  // Get user data from Redux state
  const user = useAppSelector((state) => state.user.user);
  const isFreeTrialAvailed = user?.freeTrial?.availed; // Check if the free trial has been availed

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
    <Button
      onClick={onClickHandler}
      size="lg"
      className="text-base md:text-lg max-w-64 w-full"
      disabled={isActivating || isFreeTrialAvailed} // Disable button if activating or free trial is availed
    >
      {isActivating ? (
        <span className="flex items-center">
          <Loader2 className="w-5 h-5 animate-spin" />
        </span>
      ) : isFreeTrialAvailed ? (
        "Free Trial Already Availed" 
      ) : (
        "Start Free Trial"
      )}
    </Button>
  );
};

export default ActivateFreeTrialButton;
