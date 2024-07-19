"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import DailyStreakDialogBox from "./DailyStreakDialogBox";
import { Questions } from "@/helpers/types/index";
import { getDailyStreakQuestions } from "@/actions/daily_quiz_actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const DailyStreakQuestions: React.FC = () => {
  const [openQuestionDialogBox, setOpenQuestionDialogBox] = useState(false);
  const [questions, setQuestions] = useState<Questions>({});
  const [isQuestionLoading, setIsQuestionLoading] = useState(false);

  const handleBoxClick = async () => {
    setIsQuestionLoading(true);
    try {
      const response = await getDailyStreakQuestions();

      if (response.success) {
        setQuestions(response.questions);
        setOpenQuestionDialogBox(true);
      } else {
        toast.error("Failed to fetch questions:", {
          description: response.message,
        });
      }
    } catch (error: any) {
      toast.error("Error fetching questions:", {
        description: error.message,
      });
    } finally {
      setIsQuestionLoading(false);
    }
  };

  return (
    <>
      <div className="border rounded-xl p-3 flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-sm text-black font-bold">
            Daily Streak Questions
          </h4>
          <p className="text-[11px] text-black font-normal">
            Daily prompts sustain commitment, motivation.
          </p>
          <Button
            className="max-w-24 w-full h-6 text-xs"
            onClick={handleBoxClick}
            disabled={isQuestionLoading}
          >
            {isQuestionLoading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              "Attempt Now"
            )}
          </Button>
        </div>

        <div>
          <Image
            src="/assets/images/dsq_image.png"
            alt="young man working remotely"
            width={82}
            height={82}
          />
        </div>
      </div>

      {openQuestionDialogBox && (
        <DailyStreakDialogBox
          openQuestionDialogBox={openQuestionDialogBox}
          setOpenQuestionDialogBox={setOpenQuestionDialogBox}
          questions={questions}
        />
      )}
    </>
  );
};

export default DailyStreakQuestions;
