import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
interface Subject {
	name: string;
	color: string;
}
interface ChapterQuiz {
	id: number;
	chapterName: string;
	description: string;
	subject: Subject;
	questions: number;
}

type Props = { quiz: ChapterQuiz };
 const UnattemptedChapterQuiz = ({ quiz }: Props) => {
	return (
    <div
      key={quiz.id}
      className="flex items-stretch gap-3 mx-2 md:mx-4 p-3 rounded-xl border-2 shadow-lg"
    >
      <div className="w-full flex flex-col justify-start space-y-1">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-base md:text-2xl font-semibold">
            {quiz.chapterName}
          </h1>
        </div>
        <div className="flex justify-between space-y-1 space-x-4 items-end">
          {/* Left Side */}
          <div className="w-full md:w-2/3">
            <p className="text-gray-600 text-xs md:text-sm my-1">
              {quiz.description}
            </p>
            <div className="mt-5 mb-1">
              <Label
                className={`text-white text-xs md:text-base py-1 px-2 mx-1 rounded ${quiz.subject.color}`}
              >
                {quiz.subject.name}
              </Label>
            </div>
          </div>
          {/* Right Side */}
          <div>
            <p className="text-gray-600 my-1 text-xs md:text-base">
              {quiz.questions} Quiz Questions
            </p>
            <Link href={`/quiz/${quiz.id}/attempt`}>
              <Button className=" text-xs md:text-base max-md:px-2 max-md:py-1 max-md:h-7 font-normal">
                Attempt Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UnattemptedChapterQuiz
