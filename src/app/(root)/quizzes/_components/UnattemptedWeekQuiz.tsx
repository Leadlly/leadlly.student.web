import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UnattemptedWeeklyQuiz } from "@/helpers/types";
import { formatDate, getColorBySubject } from "@/helpers/utils";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

const UnattemptedWeekQuiz = ({ quiz }: { quiz: UnattemptedWeeklyQuiz }) => {
  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic.subjects
  );
  // Function to calculate days left until the meeting
  function calculateDaysLeft(meetingDate: Date): number {
    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const differenceInMs = meetingDate.getTime() - currentDate.getTime();

    // Convert milliseconds to days
    const daysLeft = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    return daysLeft;
  }
  const daysLeft = calculateDaysLeft(new Date(quiz.endDate));

  return (
    <div
      key={quiz._id}
      className="flex items-stretch gap-3 mx-2 md:mx-4 p-3 rounded-xl border-2 shadow-lg"
    >
      <div className="w-full flex flex-col justify-start space-y-1">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-base md:text-2xl font-semibold">
            {formatDate(new Date(quiz.startDate))} -{" "}
            {formatDate(new Date(quiz.endDate))}
          </h1>
          {daysLeft <= 0 ? (
            <p className="text-xs md:text-sm text-red-800 font-medium">
              Quiz closed
            </p>
          ) : daysLeft <= 1 ? (
            <p className="text-xs md:text-sm text-orange-600">
              Quiz closes soon
            </p>
          ) : (
            <p className="text-xs md:text-sm text-primary">
              Remaining {daysLeft} days to Take Quiz
            </p>
          )}
        </div>
        <div className="flex justify-between space-y-1 space-x-4 items-end">
          {/* Left Side */}
          <div className="w-full md:w-2/3">
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
            <div className="mt-5 mb-1 flex items-center gap-2">
              {userSubjects?.map((subject, index) => (
                <p
                  key={index}
                  className={cn(
                    "text-black text-xs md:text-base capitalize py-1 px-2 md:px-4 mx-1 rounded",
                    (subject.name === "maths" || subject.name === "biology") &&
                      "bg-[#107FFC30]",
                    subject.name === "physics" && "bg-[#A36AF53D]",
                    subject.name === "chemistry" && "bg-[#72EFDD4A]"
                  )}
                >
                  {subject.name}
                </p>
              ))}
            </div>
          </div>
          {/* Right Side */}
          <div>
            <p className="text-gray-600 my-1 text-xs md:text-base">
              {Object.values(quiz.questions).flat().length} Quiz Questions
            </p>
            {daysLeft > 0 && (
              <Link href={`/quiz/${quiz._id}/attempt`}>
                <Button className=" text-xs md:text-base max-md:px-2 max-md:py-1 max-md:h-7  font-normal">
                  Attempt Now
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UnattemptedWeekQuiz;
