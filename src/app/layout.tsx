import type { Metadata } from "next";
import { Mada as FontSans } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/StoreProvider";
import { Container } from "@/components";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getUser } from "@/actions/user_actions";
import { getCookie } from "@/actions/cookie_actions";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { UserProps } from "@/helpers/types";
import {
  getMonthlyReport,
  getOverallReport,
  getWeeklyReport,
} from "@/actions/student_report_actions";
import { SocketProvider } from "@/contexts/socket/socketProvider";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Leadlly",
  description:
    "Say goodbye to one-size-fits-all! We tailor study plans and resources to your individual learning style and goals.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = getUser();
  const weeklyReportData = getWeeklyReport();
  const monthlyReportData = getMonthlyReport();
  const overallReportData = getOverallReport();

  const [user, weeklyReport, monthlyReport, overallReport] = await Promise.all([
    userData,
    weeklyReportData,
    monthlyReportData,
    overallReportData,
  ]);

  return (
    <html lang="en">
      <body
        className={cn(
          "font-sans antialiased custom__scrollbar",
          fontSans.variable
        )}
      >
        <SocketProvider>
        <StoreProvider
          user={user?.user}
          weeklyReport={weeklyReport.weeklyReport}
          monthlyReport={monthlyReport.monthlyReport}
          overallReport={overallReport.overallReport}
        >
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            <Container className="py-3">
              <main className="h-main-height">{children}</main>
            </Container>
            <Toaster richColors position="top-center" />
          </GoogleOAuthProvider>
        </StoreProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
