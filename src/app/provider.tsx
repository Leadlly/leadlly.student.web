import React from "react";
import StoreProvider from "./StoreProvider";

import { getUser } from "@/actions/user_actions";
import { generateReferralCode } from "@/actions/referral_actions";

const Provider = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const userData = getUser();
  const referralData = generateReferralCode({});

  const [user, referral] = await Promise.all([userData, referralData]);
  return (
    <StoreProvider user={user?.user} referral={referral.referralCode}>
      {children}
    </StoreProvider>
  );
};

export default Provider;
