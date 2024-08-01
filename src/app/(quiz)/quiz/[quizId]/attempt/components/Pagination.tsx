"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Dot } from "lucide-react";
import React, { useEffect, useState } from "react";

interface PaginationProps {
  totalQuestions: number;
  currentQuestion: number;
  onPageChange: (pageNumber: number) => void;
  answeredQuestions: (0 | 1 | 2 | 3 | 4)[];
}

const Pagination: React.FC<PaginationProps> = ({
  totalQuestions,
  currentQuestion,
  onPageChange,
  answeredQuestions,
}) => {
  const getVisiblePages = (width: number) => {
    if (width < 600) return 5;
    if (width < 900) return 9;
    return 13;
  };
  const [visiblePages, setVisiblePages] = useState(
    getVisiblePages(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setVisiblePages(getVisiblePages(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const startPage = Math.floor(currentQuestion / visiblePages) * visiblePages;
  const endPage = Math.min(totalQuestions, startPage + visiblePages);

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const pages = [];
  for (let i = startPage; i < endPage; i++) {
    pages.push(
      <button
        key={i}
        className={cn(
          "shadow-question text-[#A8A5A5] border text-xs sm:text-base  border-[#F2F2F2]  rounded sm:rounded-[7px]  size-5 sm:size-10 ",
          currentQuestion === i
            ? "bg-purple-500 text-white"
            : answeredQuestions[i]
              ? "bg-green-500 text-white"
              : "bg-[#FFFFFF]"
        )}
        onClick={() => handlePageClick(i)}
      >
        {i + 1}
      </button>
    );
  }
  console.log(answeredQuestions);
  return (
    <div className="flex justify-center gap-2  sm:gap-3 md:gap-4 lg:gap-5 w-full items-center ">
      <button
        className="px-2"
        onClick={() => handlePageClick(Math.max(0, startPage - visiblePages))}
        disabled={startPage === 0}
      >
        <ArrowLeft
          className="size-4 sm:size-6"
          color={startPage === 0 ? "#000000" : "#A8A8A8"}
        />
      </button>

      {startPage > 0 && (
        <>
          <button
            className={cn(
              "shadow-question text-[#A8A5A5] text-xs sm:text-base  border border-[#F2F2F2] rounded sm:rounded-[7px] size-5 sm:size-10 ",
              currentQuestion === 1
                ? "bg-purple-500 text-white"
                : answeredQuestions[0]
                  ? "bg-green-500 text-white"
                  : "bg-[#FFFFFF]"
            )}
            onClick={() => handlePageClick(0)}
          >
            1
          </button>
          <div className="flex justify-center items-center">
            <Dot color="#BFBFBF" className="size-4 sm:size-7" />
            <Dot color="#BFBFBF" className="size-4 sm:size-7 max-sm:hidden" />
            <Dot color="#BFBFBF" className="size-4 sm:size-7  max-sm:hidden" />
            <Dot color="#BFBFBF" className="size-4 sm:size-7" />
          </div>
        </>
      )}

      {pages}

      {endPage < totalQuestions && (
        <>
          <div className="flex justify-center items-center">
            <Dot color="#BFBFBF" className="size-4 sm:size-7" />
            <Dot color="#BFBFBF" className="size-4 sm:size-7  max-sm:hidden" />
            <Dot color="#BFBFBF" className="size-4 sm:size-7  max-sm:hidden " />
            <Dot color="#BFBFBF" className="size-4 sm:size-7" />
          </div>

          <button
            className={cn(
              "shadow-question text-[#A8A5A5] text-xs sm:text-base border border-[#F2F2F2]  rounded sm:rounded-[7px]  size-5 sm:size-10 ",
              currentQuestion === totalQuestions
                ? "bg-purple-500 text-white"
                : answeredQuestions[totalQuestions - 1]
                  ? "bg-green-500 text-white"
                  : "bg-[#FFFFFF]"
            )}
            onClick={() => handlePageClick(totalQuestions - 1)}
          >
            {totalQuestions}
          </button>
        </>
      )}
      <button
        className="px-2"
        onClick={() =>
          handlePageClick(
            Math.min(totalQuestions - 1, startPage + visiblePages)
          )
        }
        disabled={endPage === totalQuestions}
      >
        <ArrowRight
          className="size-4 sm:size-6"
          color={endPage === totalQuestions ? "#000000" : "#A8A8A8"}
        />
      </button>
    </div>
  );
};

export default Pagination;
