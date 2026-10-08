"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import { getFreeTrialActive } from "@/actions/subscription_actions";
import { useFreeTrialLock } from "@/hooks/useFreeTrialLock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";

/**
 * Overlay gate for the free-trial kill switch (same behavior as mobile).
 * When enabled and trial is over → force /subscription-end.
 */
const FreeTrialLockGate = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const { isLoading, lockEnabled, isAppLocked, hasPaidSubscription } =
    useFreeTrialLock();
  const activatingRef = useRef(false);

  // Start / heal trial for onboarded users. Skip Study Check / DNA.
  // Also heal availed-without-dateOfActivation (was false-locking to subscription-end).
  useEffect(() => {
    if (isLoading || !lockEnabled || !user || hasPaidSubscription) return;
    if (user.onboard !== true) return;
    if (pathname.includes("initial-info")) return;

    const needsTrial =
      !user.freeTrial?.availed || !user.freeTrial?.dateOfActivation;
    if (!needsTrial) return;
    if (activatingRef.current) return;

    activatingRef.current = true;
    (async () => {
      try {
        const res = await getFreeTrialActive();
        if (res?.user) {
          dispatch(
            userData({
              ...user,
              freeTrial: res.user.freeTrial ?? user.freeTrial,
              category: res.user.category ?? user.category,
            })
          );
        }
      } catch (error) {
        console.log("FreeTrialLockGate activate:", error);
      } finally {
        activatingRef.current = false;
      }
    })();
  }, [
    isLoading,
    lockEnabled,
    user,
    hasPaidSubscription,
    pathname,
    dispatch,
  ]);

  useEffect(() => {
    if (isLoading || !lockEnabled || !isAppLocked) return;

    const allowed =
      pathname.includes("subscription") ||
      pathname.includes("initial-info") ||
      pathname.includes("apply-coupon") ||
      pathname.includes("refer-earn") ||
      pathname.includes("subscription-end") ||
      pathname.includes("subscription-plans");

    if (allowed) return;

    router.replace("/subscription-end");
  }, [isLoading, lockEnabled, isAppLocked, pathname, router]);

  return null;
};

export default FreeTrialLockGate;
