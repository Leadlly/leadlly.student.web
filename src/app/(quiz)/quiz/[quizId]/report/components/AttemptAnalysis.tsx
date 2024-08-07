import AttemptAnalysisChart from "./AttemptAnalysisChart";

const AttemptAnalysis = () => {
  return (
    <section className="shadow-section my-5 p-4  md:p-5 pt-5 rounded-[10px] flex-1">
      <h2 className="text-md md:text-2xl font-semibold mb-4 text-[#9E9E9E]">
        Attempt Analysis
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="size-32 md:size-56 flex justify-center">
          <AttemptAnalysisChart
            correctAnswers={18}
            incorrectAnswers={5}
            notAttempted={7}
            efficiency={36}
          />
        </div>
        <div className="w-full md:w-auto">
          <div className="flex justify-start items-center gap-1 md:gap-5 mb-2">
            <div className="size-2 md:size-5 rounded-full bg-[#0FD679]"></div>
            <p className="text-[8px] md:text-lg font-medium">Correct Answer</p>
            <p className="text-[8px] md:text-lg font-medium">-</p>
            <p className="font-medium text-[8px] md:text-xl text-[#939393]">
              +<span className="text-[#0FD679]">52</span> marks (18Q)
            </p>
          </div>
          <div className="flex justify-start items-center gap-1 md:gap-5 mb-2">
            <div className="size-2 md:size-5 rounded-full bg-[#E62308]"></div>
            <p className="text-[8px] md:text-lg font-medium">
              Incorrect Answer
            </p>
            <p className="text-[8px] md:text-lg font-medium">-</p>
            <p className="font-medium text-[8px] md:text-xl text-[#939393]">
              <span className="text-[#E62308]">-52</span> marks (5Q)
            </p>
          </div>
          <div className="flex justify-start items-center gap-1 md:gap-5">
            <div className="size-2 md:size-5 rounded-full bg-[#0FD679]"></div>
            <p className="text-[8px] md:text-lg font-medium">Not Attempted</p>
            <p className="text-[8px] md:text-lg font-medium">-</p>
            <p className="font-medium text-[8px] md:text-xl text-[#939393]">
              <span className="text-black">0</span> marks (7Q)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttemptAnalysis;
