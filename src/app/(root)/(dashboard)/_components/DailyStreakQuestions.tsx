import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const DailyStreakQuestions = () => {
  return (
    <div className="border rounded-xl p-3 flex items-center justify-between">
      <div className="space-y-1">
        <h4 className="text-sm text-black font-bold">Daily Streak Questions</h4>
        <p className="text-[11px] text-black font-normal">
          Daily prompts sustain commitment, motivation.
        </p>
        <Button className="h-6 text-xs">Attempt Now</Button>
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
  );
};

export default DailyStreakQuestions;
