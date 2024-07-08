import DateIcon from "@/components/icons/DateIcon";
import BackButton from "./BackButton";
import TimeIcon from "@/components/icons/TimeIcon";
import QuestionIcon from "@/components/icons/Questionicon";
import TrophyIcon from "@/components/icons/TrophyIcon";
import EfficiencyIcon from "@/components/icons/EfficiencyIcon";

const QuizDetails = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-around w-full p-3 max-md:gap-5">
        <div className="flex flex-col justify-start items-start gap-5">
          <div className="flex justify-center items-center gap-3">
            <p className="text-[#9654F4] font-semibold text-2xl md:text-3xl">
              Weekly Quiz
            </p>
            <p className="text-lg md:text-xl">(Jan 05 - Jan 11)</p>
          </div>
          <div className="flex flex-row w-full justify-around text-gray-600 gap-2 md:gap-10">
            <div className="text-[#6C6C6C] text-center font-medium text-md md:text-xl  flex flex-wrap justify-center items-center gap-2">
              <DateIcon className="size-4" /> 18 Jan, 2024
            </div>
            <div className="text-[#6C6C6C] font-medium text-md md:text-xl flex  flex-wrap justify-center items-center gap-2 text-center">
              <TimeIcon className="size-4" /> 30 min
            </div>
            <div className="text-[#6C6C6C] text-center font-medium text-md md:text-xl  flex-wrap flex justify-center items-center gap-2">
              <QuestionIcon className="size-4" /> 30 Questions
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4 ">
          <div className="text-center  flex-wrap shadow-card bg-[#ffffff] flex rounded-[10px] p-1 md:p-2 gap-3 md:gap-6 w-full max-md:pl-4 md:w-[220px] justify-start items-center">
            <div className="bg-[#FF990036] size-8 md:size-12 flex justify-center items-center rounded-full">
              <TrophyIcon className="size-5 md:size-8" />
            </div>
            <div className="text-[#AEAEAE] font-semibold text-md md:text-2xl">
              <p>Points</p>
              <p>
                <span className="text-black">10</span>/20
              </p>
            </div>
          </div>
          <div className="text-center  flex-wrap shadow-card bg-[#ffffff] flex rounded-[10px] p-1 md:p-2 gap-3 md:gap-6 w-full max-md:pl-4 md:w-[220px] justify-start items-center">
            <div className="bg-[#0FD67936] size-8 md:size-12  flex justify-center items-center rounded-full">
              <EfficiencyIcon className="size-5 md:size-8" />
            </div>
            <div className="text-[#AEAEAE] font-semibold text-md md:text-2xl">
              <p>Efficiency</p>
              <p>
                <span className="text-black">36%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizDetails;
