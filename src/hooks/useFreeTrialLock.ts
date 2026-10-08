"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import apiClient from "@/apiClient/apiClient";
import { useHasActiveSubscription } from "@/hooks/useHasActiveSubscription";
import { useAppSelector } from "@/redux/hooks";

export type FreeTrialLockConfig = {
  enabled: boolean;
  trialDays: number;
  lockScreenRoute: string;
  upgradeButtonLabel: string;
};

type LockConfigResponse = {
  success: boolean;
  config: FreeTrialLockConfig;
};

export function useFreeTrialLockConfig() {
  return useQuery({
    queryKey: ["freeTrialLockConfig"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/api/subscription/free-trial-lock");
        const data = res.data as LockConfigResponse;
        return data.config;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message || "Failed to fetch free trial lock config");
        }
        throw new Error("Failed to fetch free trial lock config");
      }
    },
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
}

/** Remaining seconds from dateOfActivation + trialDays (config). Never uses deactivation date. */
function getTrialRemainingSeconds(
  dateOfActivation?: Date | string | null,
  trialDays?: number,
  nowMs: number = Date.now()
): number {
  if (!dateOfActivation || !trialDays || trialDays <= 0) return 0;
  const endsAt = new Date(dateOfActivation);
  endsAt.setDate(endsAt.getDate() + trialDays);
  const remaining = Math.floor((endsAt.getTime() - nowMs) / 1000);
  return remaining > 0 ? remaining : 0;
}

/**
 * Overlay lock state driven by backend kill-switch.
 * Trial window = freeTrial.dateOfActivation + config.trialDays.
 */
export function useFreeTrialLock() {
  const user = useAppSelector((state) => state.user.user);
  const hasPaidSubscription = useHasActiveSubscription();
  const { data: config, isLoading, isError } = useFreeTrialLockConfig();

  const [nowMs, setNowMs] = useState(() => Date.now());

  const lockEnabled = Boolean(config?.enabled);
  const trialDays = config?.trialDays ?? 0;
  const activationDate = user?.freeTrial?.dateOfActivation;

  useEffect(() => {
    if (!lockEnabled || hasPaidSubscription || !activationDate || !trialDays) {
      return;
    }

    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, [lockEnabled, hasPaidSubscription, activationDate, trialDays]);

  return useMemo(() => {
    if (isLoading) {
      return {
        isLoading: true,
        lockEnabled: false,
        config: config ?? null,
        hasPaidSubscription,
        isTrialActive: false,
        isAppLocked: false,
        shouldShowUpgradeCta: false,
        remainingSeconds: 0,
      };
    }

    if (!lockEnabled || isError || !config) {
      return {
        isLoading: false,
        lockEnabled: false,
        config: config ?? null,
        hasPaidSubscription,
        isTrialActive: false,
        isAppLocked: false,
        shouldShowUpgradeCta: false,
        remainingSeconds: 0,
      };
    }

    if (hasPaidSubscription) {
      return {
        isLoading: false,
        lockEnabled: true,
        config,
        hasPaidSubscription: true,
        isTrialActive: false,
        isAppLocked: false,
        shouldShowUpgradeCta: false,
        remainingSeconds: 0,
      };
    }

    const hasAvailedTrial = Boolean(user?.freeTrial?.availed);
    const remainingSeconds = getTrialRemainingSeconds(
      activationDate,
      trialDays,
      nowMs
    );
    const isTrialActive = remainingSeconds > 0;

    // Only lock when activation date exists and the window has ended.
    // Do not treat missing dateOfActivation as expired (false lock after onboard).
    const isAppLocked =
      hasAvailedTrial && Boolean(activationDate) && !isTrialActive;

    return {
      isLoading: false,
      lockEnabled: true,
      config,
      hasPaidSubscription: false,
      isTrialActive,
      isAppLocked,
      shouldShowUpgradeCta: isTrialActive,
      remainingSeconds,
    };
  }, [
    isLoading,
    lockEnabled,
    isError,
    config,
    hasPaidSubscription,
    user?.freeTrial?.availed,
    activationDate,
    trialDays,
    nowMs,
  ]);
}
