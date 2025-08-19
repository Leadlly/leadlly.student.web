import { Header } from "@/components";

import ClientWrapper from "./_components/ClientWrapper";

import { DataProps } from "@/helpers/types";

import { getPlanner } from "@/actions/planner_actions";

const Planner = async () => {
  const res: DataProps = await getPlanner();
  const data = res?.data;

  return (
    <div className="flex flex-col justify-start gap-4 h-full">
      <Header
        title="Planner"
        titleClassName="text-2xl md:text-3xl lg:text-page-title"
      />

      <ClientWrapper data={data} />
    </div>
  );
};

export default Planner;
