"use client";

import { formatTime } from "@/helpers/utils";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TrialPeriodTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const router = useRouter();

  const freeTrialActivationDate = useAppSelector(
    (state) => state.user.user?.subscription.dateOfActivation
  );

  useEffect(() => {
    const checkTrialStatus = () => {
      const trialStartDate = new Date(freeTrialActivationDate!);
      const trialEndDate = new Date(
        trialStartDate.getTime() + 21 * 24 * 60 * 60 * 1000
      );
      const now = new Date();

      if (now >= trialEndDate) {
        router.replace("/subscription-plans");
      } else {
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
  }, [freeTrialActivationDate]);

  return <p className="text-[10px]">{formatTime(timeLeft!)}</p>;
};

export default TrialPeriodTimer;
