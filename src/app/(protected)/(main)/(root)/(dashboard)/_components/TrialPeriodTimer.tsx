"use client";

import { formatTime } from "@/helpers/utils";

type TrialPeriodTimerProps = {
  remainingSeconds: number;
};

/**
 * Countdown display from useFreeTrialLock remainingSeconds
 * (activation + trialDays — never deactivation).
 */
const TrialPeriodTimer = ({ remainingSeconds }: TrialPeriodTimerProps) => {
  if (remainingSeconds <= 0) return null;

  return (
    <p className="text-[9px] font-medium leading-tight text-white sm:text-[10px]">
      {formatTime(remainingSeconds)}
    </p>
  );
};

export default TrialPeriodTimer;
