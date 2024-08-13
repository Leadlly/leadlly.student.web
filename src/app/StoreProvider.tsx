"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/redux/store";
import {
  TStudentOverallReportProps,
  TStudentReportProps,
  UserDataProps,
} from "@/helpers/types";
import { userData } from "@/redux/slices/userSlice";
import { weeklyData } from "@/redux/slices/weeklyReportSlice";
import { monthlyData } from "@/redux/slices/monthlyReportSlice";
import { overallData } from "@/redux/slices/overallReportSlice";
import { unreadMessages } from "@/redux/slices/unreadMessagesSlice";

export default function StoreProvider({
  children,
  user,
  weeklyReport,
  monthlyReport,
  overallReport,
  unreadChats
}: {
  children: React.ReactNode;
  user: UserDataProps | null;
  weeklyReport: TStudentReportProps | null;
  monthlyReport: TStudentReportProps | null;
  overallReport: TStudentOverallReportProps[] | null;
  unreadChats: number
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(userData(user));
    storeRef.current.dispatch(weeklyData(weeklyReport));
    storeRef.current.dispatch(monthlyData(monthlyReport));
    storeRef.current.dispatch(overallData(overallReport));
    storeRef.current.dispatch(unreadMessages(unreadChats));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
