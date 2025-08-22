import React from "react";
import StoreProvider from "./StoreProvider";

import { getUser } from "@/actions/user_actions";
import {
  getMonthlyReport,
  getOverallReport,
  getWeeklyReport,
} from "@/actions/student_report_actions";
import { generateReferralCode } from "@/actions/referral_actions";

const Provider = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const userData = getUser();
  const weeklyReportData = getWeeklyReport();
  const monthlyReportData = getMonthlyReport();
  const overallReportData = getOverallReport();
  const referralData = generateReferralCode({});

  const [user, weeklyReport, monthlyReport, overallReport, referral] =
    await Promise.all([
      userData,
      weeklyReportData,
      monthlyReportData,
      overallReportData,
      referralData,
    ]);
  return (
    <StoreProvider
      user={user?.user}
      weeklyReport={weeklyReport.weeklyReport}
      monthlyReport={monthlyReport.monthlyReport}
      overallReport={overallReport.overallReport}
      referral={referral.referralCode}
    >
      {children}
    </StoreProvider>
  );
};

export default Provider;
