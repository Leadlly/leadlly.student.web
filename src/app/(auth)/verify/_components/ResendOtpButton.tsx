"use client";

import { resendOtp } from "@/actions/user_actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ResendOtpButton = () => {
  const [isResendingOTP, setIsResendingOTP] = useState(false);
  const [disableResend, setDisableResend] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);

  const resendOTPHandler = async () => {
    setIsResendingOTP(true);

    const email = localStorage.getItem("email")
    

    try {
      const data = await resendOtp(email!);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      setTimeLeft(30);
    } catch (error: any) {
      toast.error("Error re-sending OTP", {
        description: error?.message,
      });
    } finally {
      setIsResendingOTP(false);
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setDisableResend(false);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      setDisableResend(true);
    };
  }, [timeLeft]);
  return (
    <div className="flex items-center">
      <Button
        type="button"
        variant="link"
        onClick={resendOTPHandler}
        disabled={disableResend || isResendingOTP}>
        Resend OTP
        {isResendingOTP && <Loader2 className="ml-2 w-4 h-4 animate-spin" />}
      </Button>
      <p className="text-xs text-[#727272]">
        00:{String(timeLeft).padStart(2, "0")}s
      </p>
    </div>
  );
};

export default ResendOtpButton;
