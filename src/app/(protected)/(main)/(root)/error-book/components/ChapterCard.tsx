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
      <div className="mb-3 flex items-center justify-between rounded-2xl border border-[#E6E1F0] bg-white px-4 py-3">
        <div className="flex min-w-0 items-center gap-4">
          <span className="text-base font-medium text-secondary-text">
            {String(number).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <p className="truncate text-base font-medium capitalize">{title}</p>
            <p className="text-xs text-gray-500">{questions} Questions</p>
          </div>
        </div>
        <ChevronRight className="size-5 shrink-0 text-[#8A8A8A]" />
      </div>
    </Link>
  );
};

export default ChapterCard;
