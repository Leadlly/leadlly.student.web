import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ChapterCardProps {
  number: number;
  title: string;
  questions: number;
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  number,
  title,
  questions,
}) => {
  return (
    <Link href={`/errorBook/chapter/${title}/erroredQuestions`}>
      <div className="border flex items-center justify-between bg-[#ffffff] rounded-lg px-8 py-2 mb-4 border-[#0000000A] shadow-sm">
        <div className="flex justify-start items-center gap-10">
          <div className="text-2xl font-medium">
            {String(number).padStart(2, "0")}
          </div>
          <div>
            <div className="text-xl  font-medium leading-none">{title}</div>
            <div className="text-gray-500">{questions} Questions</div>
          </div>
        </div>
        <ChevronRight color="#4F4F4F" />
      </div>
    </Link>
  );
};

export default ChapterCard;
