"use client";

import { formatTime } from "@/helpers/utils";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TrialPeriodTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const router = useRouter();

  const subscriptionStatus = useAppSelector(
    (state) => state.user.user?.subscription?.status
  );
  const freeTrialStatus = useAppSelector(
    (state) => state.user.user?.freeTrial.active
  );
  const freeTrialDeactivationDate = useAppSelector(
    (state) => state.user.user?.freeTrial?.dateOfDeactivation
  );

  useEffect(() => {
    const checkTrialStatus = () => {
      const trialEndDate = new Date(freeTrialDeactivationDate!);
      const now = new Date();

      // If the subscription is active, do nothing (user is subscribed)
      if (subscriptionStatus === "active") {
        return;
      }

      // If no active free trial or the free trial has expired, redirect to subscription plans
      if (!freeTrialStatus || now >= trialEndDate) {
        router.replace("/subscription-plans");
      } else {
        // Calculate remaining time for the active free trial
        const remainingTime = Math.max(
          0,
          Math.floor((trialEndDate.getTime() - now.getTime()) / 1000)
        );
        setTimeLeft(remainingTime);
      }
    };

    checkTrialStatus();

    const timerInterval = setInterval(() => {
      checkTrialStatus();
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [freeTrialDeactivationDate, freeTrialStatus, router, subscriptionStatus]);

  return (
    <p className="text-[10px] leading-tight">
      {timeLeft !== null ? formatTime(timeLeft) : "Loading..."}
    </p>
  );
};

export default TrialPeriodTimer;
