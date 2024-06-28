"use client";


import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { quizQuestions } from "@/helpers/constants";

import DailyStreakDialogBox from "./DailyStreakDialogBox";

const DailyStreakQuestions = () => {

  const [openQuestionDialogBox, setOpenQuestionDialogBox] = useState(false);
  const [topic, setTopic] = useState("");

  const handleboxClick = (topic: string) => {
    setTopic(topic);
    setOpenQuestionDialogBox(true);
  };
  return (
    <>
    <div className="border rounded-xl p-3 flex items-center justify-between">
      <div className="space-y-1">
        <h4 className="text-sm text-black font-bold">Daily Streak Questions</h4>
        <p className="text-[11px] text-black font-normal">
          Daily prompts sustain commitment, motivation.
        </p>
        <Button className="h-6 text-xs"  onClick={() => handleboxClick(topic)}>Attempt Now</Button>
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
    questions={quizQuestions}
    topic={topic}
  />
)}
</>
  );
};

export default DailyStreakQuestions;
