import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getTextColor } from "@/helpers/constants/efficiency";
import { AttemptedWeeklyQuiz, Subject, WeeklyQuizProps } from "@/helpers/types";
import { formatDate, getColorBySubject } from "@/helpers/utils";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = { quiz: WeeklyQuizProps };
const AttemptedWeekQuiz = ({ quiz }: Props) => {
  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic.subjects
  );

  return (
    <div
      key={quiz._id}
      className="flex items-stretch gap-1 sm:gap-3 mx-2 md:mx-4 p-3 rounded-xl border-2 shadow-lg"
    >
      <div className="w-full flex flex-col justify-start space-y-1">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-base md:text-2xl font-semibold">
            {formatDate(new Date(quiz.startDate))} -{" "}
            {formatDate(new Date(quiz.endDate))}
          </h1>
        </div>
        <div className="flex justify-between space-y-1 space-x-4 items-end">
          {/* Left Side */}
          <div className="w-full md:w-2/3 font-medium">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-gray-600 text-xs md:text-sm my-1 capitalize">
                    {Object.keys(quiz.questions).slice(0, 10).join(", ")}
                    {Object.keys(quiz.questions).length > 10 ? "..." : "."}
                  </p>
                </TooltipTrigger>
                <TooltipContent className="max-w-md w-full">
                  <p className="text-xs capitalize">
                    {Object.keys(quiz.questions).join(", ")}.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <p className="text-gray-600 text-xs md:text-sm my-1 sm:hidden">
              {quiz.endDate}
            </p>
            <div className="mt-5 flex items-center mb-1 gap-10">
              <div className="flex items-center">
                <div className="mt-5 mb-1 flex items-center gap-2">
                  {userSubjects?.map((subject, index) => (
                    <p
                      key={index}
                      className={cn(
                        "text-black text-xs md:text-base capitalize py-1 px-2 md:px-4 mx-1 rounded",
                        (subject.name === "maths" ||
                          subject.name === "biology") &&
                          "bg-[#107FFC30]",
                        subject.name === "physics" && "bg-[#A36AF53D]",
                        subject.name === "chemistry" && "bg-[#72EFDD4A]"
                      )}
                    >
                      {subject.name}
                    </p>
                  ))}
                </div>
                <p className="text-gray-600 text-xs md:text-sm my-1 max-sm:hidden">
                  {Object.values(quiz.questions).flat().length} Quiz Questions
                </p>
              </div>

              <p className="text-gray-600 text-xs md:text-sm my-1 max-sm:hidden">
                {quiz.endDate}
              </p>
            </div>
          </div>
          {/* Right Side */}
          <div className="text-right max-sm:hidden">
            {/* <p
              className={cn(
                " text-xs md:text-sm my-1",
                getTextColor(quiz.efficiency)
              )}
            >
              Completed Test with {quiz.efficiency} Efficiency
            </p> */}
            <p className="text-gray-600 text-xs md:text-sm my-1 sm:hidden">
              {Object.values(quiz.questions).flat().length} Quiz Questions
            </p>
            <Link href={`quiz/${quiz._id}/report`}>
              {" "}
              <Button className="sm:mt-2 text-xs max-sm:py-1 max-sm:px-2 max-sm:h-8 md:text-base bg-white border-black text-black hover:bg-slate-100 border-2 font-medium">
                View Details <ChevronRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-col flex justify-between sm:hidden">
        {" "}
        {/* <p
          className={cn(
            " text-xs md:text-sm my-1",
            getTextColor(quiz.efficiency)
          )}
        >
          Completed Test with {quiz.efficiency} Efficiency
        </p> */}
        <div>
          <div className="text-right">
            <p className="text-gray-600 text-xs md:text-sm my-1 sm:hidden">
              {Object.values(quiz.questions).flat().length} Quiz Questions
            </p>
            <Link href={`quiz/${quiz._id}/report`}>
              {" "}
              <Button className="sm:mt-2 text-xs max-sm:py-1 max-sm:px-2 max-sm:h-8 md:text-base bg-white border-black text-black hover:bg-slate-100 border-2 font-medium">
                View Details <ChevronRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AttemptedWeekQuiz;
