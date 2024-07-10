"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import DailyStreakDialogBox from "./DailyStreakDialogBox";
import { Questions } from "@/helpers/types/index";
import { getDailyStreakQuestions } from "@/actions/daily_quiz_actions";
import { toast } from "sonner";

const DailyStreakQuestions: React.FC = () => {
  const [openQuestionDialogBox, setOpenQuestionDialogBox] = useState(false);
  const [questions, setQuestions] = useState<Questions>({});

  const handleBoxClick = async () => {
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
          <Button className="h-6 text-xs" onClick={handleBoxClick}>
            Attempt Now
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
