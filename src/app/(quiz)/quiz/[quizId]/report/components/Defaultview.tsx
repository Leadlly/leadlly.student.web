import TopicsCovered from "./TopicCovered";
import Score from "./Score";
import AttemptAnalysis from "./AttemptAnalysis";
import TopicsEfficiency from "./TopicEfficiency";
import SolutionAnalysis from "./SolutionAnalysis";
import QuizDetails from "./QuizDetails";
import BackButton from "./BackButton";
type Props = {};
const Defaultview = (props: Props) => {
  return (
    <div>
      {" "}
      <header>
        {" "}
        <div className="flex justify-center w-full p-4">
          <h1 className=" text-2xl md:text-4xl font-semibold">Quiz Report</h1>
        </div>
        <div className="flex flex-col  items-start justify-between p-5 pb-6 border-b bg-[#9654F42E] gap-16 rounded-lg m-5">
          {" "}
          <QuizDetails />
        </div>
      </header>{" "}
      <TopicsCovered />
      <div className="flex flex-1 gap-5 max-md:mx-5">
        <AttemptAnalysis />
        <Score />
      </div>
      <TopicsEfficiency />
      <SolutionAnalysis />
    </div>
  );
};
export default Defaultview;
