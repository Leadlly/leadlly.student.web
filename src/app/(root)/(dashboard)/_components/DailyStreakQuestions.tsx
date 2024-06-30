"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import DailyStreakDialogBox from "./DailyStreakDialogBox";
import apiClient from "@/apiClient/apiClient";
import { Questions } from "@/helpers/types/index";

const DailyStreakQuestions: React.FC = () => {
  const [openQuestionDialogBox, setOpenQuestionDialogBox] = useState(false);
  const [questions, setQuestions] = useState<Questions>({});

  const handleboxClick = async () => {
    try {
      const response = await apiClient.get("/api/questionbank/streakquestion");
      if (response.data.success) {
        setQuestions(response.data.questions);
        setOpenQuestionDialogBox(true);
      } else {
        console.error("Failed to fetch questions:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <>
      <div className="border rounded-xl p-3 flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-sm text-black font-bold">Daily Streak Questions</h4>
          <p className="text-[11px] text-black font-normal">
            Daily prompts sustain commitment, motivation.
          </p>
          <Button className="h-6 text-xs" onClick={handleboxClick}>Attempt Now</Button>
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
