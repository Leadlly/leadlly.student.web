"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/redux/store";
import { UserDataProps } from "@/helpers/types";
import { userData } from "@/redux/slices/userSlice";

export default function StoreProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserDataProps | null;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(userData(user));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
