"use client";

import type { ReactNode } from "react";
import { useHasActiveSubscription } from "@/hooks/useHasActiveSubscription";
import ErrorBookPaywall from "./ErrorBookPaywall";
import MentorPaywall from "./MentorPaywall";

const PremiumGate = ({
  children,
  variant,
}: {
  children: ReactNode;
  variant: "mentor" | "errorBook";
}) => {
  const active = useHasActiveSubscription();
  if (!active) {
    return variant === "errorBook" ? <ErrorBookPaywall /> : <MentorPaywall />;
  }
  return <>{children}</>;
};

export default PremiumGate;
