import { getPlanner } from "@/actions/planner_actions";

import { DataProps } from "@/helpers/types";
import InitialSetupDialog from "./_components/InitialSetupDialog";
import Wrapper from "./_components/Wrapper";

const Dashboard = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const isInitialSetup = searchParams?.initialSetup === "true";

  const res: DataProps = await getPlanner();
  const data = res?.data;

  return (
    <>
      {isInitialSetup && <InitialSetupDialog openOnMount />}

      <Wrapper data={data} />
    </>
  );
};

export default Dashboard;
