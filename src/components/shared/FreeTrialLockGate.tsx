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

  // Only start trial for users who never availed it (no regrant / no date heal)
  useEffect(() => {
    if (isLoading || !lockEnabled || !user || hasPaidSubscription) return;
    if (user.freeTrial?.availed) return;
    if (activatingRef.current) return;

    activatingRef.current = true;
    (async () => {
      try {
        const res = await getFreeTrialActive();
        if (res?.user) {
          dispatch(userData({ ...user, ...res.user }));
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
