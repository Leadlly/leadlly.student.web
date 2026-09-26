"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/redux/hooks";
import { hasActiveSubscription } from "@/lib/subscription";

export function useHasActiveSubscription(): boolean {
  const user = useAppSelector((state) => state.user.user);

  return useMemo(() => hasActiveSubscription(user), [user]);
}
