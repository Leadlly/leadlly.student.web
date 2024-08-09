
import BackButton from "./BackButton";
import ChapterDetails from "./ChapterDetails";
import ErroredQuestions from "./ErroredQuestions";
type Props = { chapterErrorBook: any; chapterName: string };
const Defaultview = ({ chapterErrorBook, chapterName }: Props) => {
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
          <ChapterDetails
            totalQuestions={chapterErrorBook.length}
            chapterName={chapterName}
          />
        </div>
      </header>{" "}
      <ErroredQuestions chapterErrorBook={chapterErrorBook} />
    </div>
  );
};
export default Defaultview;
