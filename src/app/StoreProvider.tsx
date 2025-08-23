"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/redux/store";
import { ICoupon, UserDataProps } from "@/helpers/types";
import { userData } from "@/redux/slices/userSlice";
import { getUserInstitute } from "@/actions/institute_actions";
import { setInstitute } from "@/redux/slices/instituteSlice";
import { setReferral } from "@/redux/slices/referralSlice";

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
    if (user?.institute._id && (!institute || !institute._id)) {
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
  }, [storeRef.current, institute, user]);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
