import DateIcon from "@/components/icons/DateIcon";
import BackButton from "./BackButton";
import TimeIcon from "@/components/icons/TimeIcon";
import QuestionIcon from "@/components/icons/Questionicon";
import TrophyIcon from "@/components/icons/TrophyIcon";
import EfficiencyIcon from "@/components/icons/EfficiencyIcon";
import Image from "next/image";

const ChapterDetails = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between px-20 w-full  max-md:gap-5">
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-start items-start gap-5">
            <div className="flex justify-center items-center gap-3">
              <p className="text-[#9654F4] font-semibold text-2xl md:text-3xl">
                Vector Alegrbra
              </p>
            </div>
            <div className="flex flex-row w-full justify-around text-gray-600 gap-2 md:gap-10">
              <div className="text-[#6C6C6C] text-center font-medium text-md md:text-xl  flex-wrap flex justify-center items-center gap-2">
                <QuestionIcon className="size-6" /> 30 Questions
              </div>
            </div>
          </div>
          <Image
            src={"/assets/images/errorbook.png"}
            width={200}
            height={200}
            alt="errorbook"
          />
        </div>

        <div className="flex flex-row items-center space-x-4 ">
          <button className="text-white font-medium text-xl rounded-lg bg-blue-500 py-2 px-4">
            Attempt the quiz
          </button>
        </div>
      </div>
    </>
  );
};

export default ChapterDetails;
