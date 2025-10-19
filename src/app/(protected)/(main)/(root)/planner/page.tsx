import { Header } from "@/components";

import ClientWrapper from "./_components/ClientWrapper";

import { DataProps } from "@/helpers/types";

import { getPlanner } from "@/actions/planner_actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import Loader from "@/components/shared/Loader";

const Planner = async () => {
  // const res: DataProps = await getPlanner();
  // const data = res?.data;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["plannerData"],
    queryFn: getPlanner,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col justify-start gap-4 h-full">
        <Header
          title="Planner"
          titleClassName="text-2xl md:text-3xl lg:text-page-title"
        />

        <Suspense fallback={<Loader />}>
          <ClientWrapper />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
};

export default Planner;
