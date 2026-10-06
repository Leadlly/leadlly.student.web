import React from "react";
import StoreProvider from "./StoreProvider";

import { getUser } from "@/actions/user_actions";
import { generateReferralCode } from "@/actions/referral_actions";

const Provider = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  let user = null;
  let referral = null;

  try {
    const userResult = await getUser();
    user = userResult?.user ?? null;
  } catch (error) {
    console.error("Failed to load user:", error);
  }

  try {
    const referralResult = await generateReferralCode({});
    referral = referralResult?.referralCode ?? null;
  } catch (error) {
    console.error("Failed to load referral code:", error);
  }

  return (
    <StoreProvider user={user} referral={referral}>
      {children}
    </StoreProvider>
  );
};

export default Provider;
