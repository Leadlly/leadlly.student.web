import { getPlanner } from "@/actions/planner_actions";
import InitialSetupDialog from "./_components/InitialSetupDialog";
import Wrapper from "./_components/Wrapper";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  getMonthlyReport,
  getOverallReport,
  getWeeklyReport,
} from "@/actions/student_report_actions";
import { Suspense } from "react";
import Loader from "@/components/shared/Loader";

const Dashboard = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const isInitialSetup = searchParams?.initialSetup === "true";

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["plannerData"],
      queryFn: getPlanner,
    }),
    queryClient.prefetchQuery({
      queryKey: ["weeklyReport"],
      queryFn: getWeeklyReport,
    }),
    queryClient.prefetchQuery({
      queryKey: ["monthlyReport"],
      queryFn: getMonthlyReport,
    }),
    queryClient.prefetchQuery({
      queryKey: ["overallReport"],
      queryFn: getOverallReport,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {isInitialSetup && <InitialSetupDialog openOnMount />}

      <Suspense fallback={<Loader />}>
        <Wrapper />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Dashboard;
