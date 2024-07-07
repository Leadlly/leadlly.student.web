import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { getTextColor } from '@/helpers/constants/efficiency';
import { AttemptedWeeklyQuiz, Subject } from '@/helpers/types';
import { getColorBySubject } from '@/helpers/utils';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';



type Props = { quiz: AttemptedWeeklyQuiz };
const AttemptedWeekQuiz = ({ quiz }: Props) => {
	type DateString = string;
	// Function to format date
	function formatDate(dateString: DateString): string {
		const date = new Date(dateString);
		const day = date.getDate();
		const month = date.toLocaleString('default', { month: 'short' });
		return `${day} ${month}`;
	}

	
	return (
    <div
      key={quiz.id}
      className="flex items-stretch gap-1 sm:gap-3 mx-2 md:mx-4 p-3 rounded-xl border-2 shadow-lg"
    >
      <div className="w-full flex flex-col justify-start space-y-1">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-base md:text-2xl font-semibold">
            {formatDate(quiz.startDate)} - {formatDate(quiz.endDate)}
          </h1>
        </div>
        <div className="flex justify-between space-y-1 space-x-4 items-end">
          {/* Left Side */}
          <div className="w-full md:w-2/3 font-medium">
            <p className="text-gray-600 text-xs md:text-sm my-1">
              {quiz.description}
            </p>
            <p className="text-gray-600 text-xs md:text-sm my-1 sm:hidden">
              {quiz.completedDate}
            </p>
            <div className="mt-5 flex items-center mb-1 gap-10">
              <div className="flex items-center">
                <Label
                  className={`text-black text-xs md:text-base py-1 px-2 md:px-4 mx-1 rounded ${getColorBySubject(quiz.subject)}`}
                >
                  {quiz.subject}
                </Label>
                <p className="text-gray-600 text-xs md:text-sm my-1 max-sm:hidden">
                  {quiz.questions} Quiz Questions
                </p>
              </div>

              <p className="text-gray-600 text-xs md:text-sm my-1 max-sm:hidden">
                {quiz.completedDate}
              </p>
            </div>
          </div>
          {/* Right Side */}
          <div className="text-right max-sm:hidden">
            <p
              className={cn(
                " text-xs md:text-sm my-1",
                getTextColor(quiz.efficiency)
              )}
            >
              Completed Test with {quiz.efficiency} Efficiency
            </p>
            <p className="text-gray-600 text-xs md:text-sm my-1 sm:hidden">
              {quiz.questions} Quiz Questions
            </p>
            <Link href={`quiz/${quiz.id}/report`}>
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
        <p
          className={cn(
            " text-xs md:text-sm my-1",
            getTextColor(quiz.efficiency)
          )}
        >
          Completed Test with {quiz.efficiency} Efficiency
        </p>
        <div>
          <div className="text-right">
            <p className="text-gray-600 text-xs md:text-sm my-1 sm:hidden">
              {quiz.questions} Quiz Questions
            </p>
            <Link href={`quiz/${quiz.id}/report`}>
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
