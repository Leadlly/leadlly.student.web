"use client";

import Link from "next/link";

import { useFreeTrialLock } from "@/hooks/useFreeTrialLock";

import TrialPeriodTimer from "./TrialPeriodTimer";

const UpgradeSubscriptionButton = () => {
  const { shouldShowUpgradeCta, remainingSeconds, config } = useFreeTrialLock();

  if (!shouldShowUpgradeCta) return null;

  return (
    <Link
      href="/subscription-plans"
      className="mr-1 flex min-w-[72px] flex-col items-center justify-center rounded-full bg-primary px-3 py-1.5 text-white transition hover:opacity-95 sm:mr-3 sm:px-4"
    >
      <span className="text-[11px] font-bold leading-tight sm:text-xs">
        {config?.upgradeButtonLabel || "Upgrade"}
      </span>
      <TrialPeriodTimer remainingSeconds={remainingSeconds} />
    </Link>
  );
};

export default UpgradeSubscriptionButton;
