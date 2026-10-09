"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import posthog from "posthog-js";
import { makeStore, AppStore } from "@/redux/store";
import { ICoupon, UserDataProps } from "@/helpers/types";
import { userData } from "@/redux/slices/userSlice";
import { getUserInstitute } from "@/actions/institute_actions";
import { setInstitute } from "@/redux/slices/instituteSlice";
import { setReferral } from "@/redux/slices/referralSlice";
import { clearDailyQuizWithDate } from "@/redux/slices/dailyQuizSlice";
import { useAppSelector } from "@/redux/hooks";

export default function StoreProvider({
  children,
  user,
  referral,
}: {
  children: React.ReactNode;
  user: UserDataProps | null;
  referral: ICoupon | null;
}) {
  const storeRef = useRef<AppStore>(undefined);
  const institute = storeRef.current?.getState().institute.institute;

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(userData(user));
    storeRef.current.dispatch(setReferral(referral));
  }

  useEffect(() => {
    const todaysDate = new Date(Date.now()).getDate();
    storeRef.current?.dispatch(clearDailyQuizWithDate({ date: todaysDate }));
  }, []);

  useEffect(() => {
    if (user?.institute?._id && (!institute || !institute._id)) {
      const setUserInstitute = async () => {
        try {
          const res = await getUserInstitute();
          if (res.institute) {
            storeRef.current?.dispatch(setInstitute(res.institute));
          }
        } catch (error) {
          console.log(error);
        }
      };
      setUserInstitute();
    }
  }, [institute, user?.institute]);

  return (
    <Provider store={storeRef.current}>
      <IdentifyPostHogUser />
      {children}
    </Provider>
  );
}

function IdentifyPostHogUser() {
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (!user?._id || !user.email) return;

    posthog.identify(user._id, {
      email: user.email,
      name: [user.firstname, user.lastname].filter(Boolean).join(" "),
    });
  }, [user?._id, user?.email, user?.firstname, user?.lastname]);

  return null;
}
