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

export default function StoreProvider({
  children,
  user,
  weeklyReport,
  monthlyReport,
  overallReport,
}: {
  children: React.ReactNode;
  user: UserDataProps | null;
  weeklyReport: TStudentReportProps | null;
  monthlyReport: TStudentReportProps | null;
  overallReport: TStudentOverallReportProps[] | null;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(userData(user));
    storeRef.current.dispatch(weeklyData(weeklyReport));
    storeRef.current.dispatch(monthlyData(monthlyReport));
    storeRef.current.dispatch(overallData(overallReport));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
