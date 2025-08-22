"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { generateReferralCode } from "@/actions/referral_actions";
import { setReferral } from "@/redux/slices/referralSlice";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Loader2Icon, RefreshCwIcon } from "lucide-react";

const RefreshReferralCode = () => {
  const [isPending, setIsPending] = useState(false);

  const dispatch = useAppDispatch();

  const handleRefreshCode = async () => {
    setIsPending(true);
    try {
      const res = await generateReferralCode({
        update: true,
      });
      dispatch(setReferral(res.referralCode));
      toast.success(res.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred while refreshing code!");
      }
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={handleRefreshCode}
      disabled={isPending}
      className="size-6 hover:bg-transparent hover:text-white text-white"
    >
      {isPending ? (
        <Loader2Icon className="size-4 animate-spin" />
      ) : (
        <RefreshCwIcon className="size-4" />
      )}
    </Button>
  );
};

export default RefreshReferralCode;
