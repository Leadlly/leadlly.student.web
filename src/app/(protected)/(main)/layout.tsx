import { getUser } from "@/actions/user_actions";
import { redirect } from "next/navigation";
import React from "react";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getUser();

  if (user && !user.academic.standard) {
    return redirect("/initial-info");
  }

  if (user && user.category === "free" && user.freeTrial.availed) {
    const trialEndDate = new Date(user.freeTrial.dateOfDeactivation!);
    const now = new Date();

    if (now >= trialEndDate) {
      return redirect("/trial-subscription");
    }
  }

  if (
    user &&
    user.category !== "free" &&
    user.subscription.status === "active"
  ) {
    const subscriptionEnd = new Date(user.subscription.dateOfDeactivation!);
    const now = new Date();

    if (now >= subscriptionEnd) {
      return redirect("/trial-subscription");
    }
  }
  return <>{children}</>;
}
