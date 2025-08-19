import { getUnrevisedTopics } from "@/actions/studyData_actions";
import InitialStudyDataPage from "./_components/InitialStudyDataPage";

const InitialStudyData = async () => {
  const data = await getUnrevisedTopics();

  return <InitialStudyDataPage unrevisedTopics={data.data} />;
};

export default InitialStudyData;
