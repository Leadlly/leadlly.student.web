"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Dot, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface PaginationProps {
  totalQuestions: number;
  currentQuestion: number;
  onPageChange: (pageNumber: number) => void;
  loading: string | null;
  questionIds: string[];
  storedQuestionIds: string[];
  currentQuestionId: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalQuestions,
  currentQuestion,
  onPageChange,
  loading,
  questionIds,
  storedQuestionIds,
  currentQuestionId,
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
      <Button
        key={i}
        className={cn(
          "shadow-question size-5 sm:size-10 ",
          currentQuestion === i
            ? "bg-primary text-white"
            : storedQuestionIds.includes(questionIds[i])
              ? "bg-green-500 text-white"
              : "bg-[#FFFFFF]"
        )}
        onClick={() => handlePageClick(i)}
        variant={"outline"}
        disabled={loading === currentQuestionId}
      >
        {loading === currentQuestionId ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <>{i + 1}</>
        )}
      </Button>
    );
  }
  return (
    <div className="flex justify-center gap-2  sm:gap-3 md:gap-4 lg:gap-5 w-full items-center ">
      <Button
        variant={"ghost"}
        className="px-2"
        onClick={() => handlePageClick(Math.max(0, startPage - visiblePages))}
        disabled={currentQuestion === 0}
      >
        <ArrowLeft className="size-4 sm:size-6" />
      </Button>

      {startPage > 0 && (
        <>
          <Button
            className={cn(
              "shadow-question size-5 sm:size-10",
              currentQuestion === 1
                ? "bg-primary text-white"
                : storedQuestionIds.includes(questionIds[0])
                  ? "bg-green-500 text-white"
                  : "bg-[#FFFFFF]"
            )}
            onClick={() => handlePageClick(0)}
            variant={"outline"}
          >
            1
          </Button>
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

          <Button
            className={cn(
              "shadow-question size-5 sm:size-10",
              currentQuestion + 1 === totalQuestions
                ? "bg-primary text-white"
                : storedQuestionIds.includes(questionIds[totalQuestions - 1])
                  ? "bg-green-500 text-white"
                  : "bg-[#FFFFFF]"
            )}
            onClick={() => handlePageClick(totalQuestions - 1)}
            variant={"outline"}
          >
            {totalQuestions}
          </Button>
        </>
      )}
      <Button
        variant={"ghost"}
        className="px-2"
        onClick={() =>
          handlePageClick(
            Math.min(totalQuestions - 1, startPage + visiblePages)
          )
        }
        disabled={currentQuestion + 1 === totalQuestions}
      >
        <ArrowRight className="size-4 sm:size-6" />
      </Button>
    </div>
  );
};

export default Pagination;
