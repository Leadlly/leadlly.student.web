
import TopicsCovered from './TopicCovered';
import Score from './Score';
import AttemptAnalysis from './AttemptAnalysis';
import TopicsEfficiency from './TopicEfficiency';
import SolutionAnalysis from './SolutionAnalysis';
import QuizDetails from './QuizDetails';
import BackButton from './BackButton';
type Props = {};
const DesktopView = (props: Props) => {
  return (
    <div>
      <header className="flex flex-col w-full items-start justify-between p-5 pb-6 border-b bg-[#9654F42E] gap-16">
        {" "}
        <div className="flex justify-between w-full">
          <BackButton />
          <h1 className="text-4xl font-semibold">Quiz Report</h1>
          <div></div>
        </div>
        <QuizDetails />
      </header>
      <div className="flex w-full gap-5 ">
        <TopicsCovered />
        <TopicsEfficiency />
      </div>
      <div className="flex w-full gap-5">
        <AttemptAnalysis />
        <Score />
      </div>
      <SolutionAnalysis />
    </div>
  );
}
export default DesktopView