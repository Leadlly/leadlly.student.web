"use client";

import { formatTime } from "@/helpers/utils";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

const TrialPeriodTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const subscriptionStatus = useAppSelector(
    (state) => state.user.user?.subscription?.status
  );
  const freeTrialDeactivationDate = useAppSelector(
    (state) => state.user.user?.freeTrial?.dateOfDeactivation
  );

  useEffect(() => {
    if (subscriptionStatus === "active" || !freeTrialDeactivationDate) {
      setTimeLeft(null);
      return;
    }

    const tick = () => {
      const remaining = Math.floor(
        (new Date(freeTrialDeactivationDate).getTime() - Date.now()) / 1000
      );
      setTimeLeft(remaining > 0 ? remaining : null);
    };

    tick();
    const timerInterval = setInterval(tick, 1000);
    return () => clearInterval(timerInterval);
  }, [freeTrialDeactivationDate, subscriptionStatus]);

  if (timeLeft === null) return null;

  return <p className="text-[10px] leading-tight">{formatTime(timeLeft)}</p>;
};

export default TrialPeriodTimer;
