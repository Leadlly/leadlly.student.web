
import BackButton from "./BackButton";
import ChapterDetails from "./ChapterDetails";
import ErroredQuestions from "./ErroredQuestions";
type Props = {};
const DesktopView = (props: Props) => {
  return (
    <div>
      <header className="flex flex-col w-full items-start justify-between px-5 pt-5 border-b bg-[#9654F42E] gap-16">
        {" "}
        <div className="flex justify-between w-full">
          <BackButton />
          <h1 className="text-4xl font-semibold">Error Book</h1>
          <div></div>
        </div>
        <ChapterDetails />
      </header>
    <ErroredQuestions/>
    </div>
  );
};
export default DesktopView;
