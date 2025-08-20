import React from "react";
import MoodEmojiSelector from "./MoodEmojiSelector";

const TodaysVibe = () => {
  return (
    <div className="border rounded-xl px-3 py-[10px]">
      <h4 className="text-sm text-black font-semibold">Today&apos;s Vibes</h4>
      <p className="text-[10px] text-black font-normal">
        Sessions and quizzes were insightful and engaging ?
      </p>

      <MoodEmojiSelector />
    </div>
  );
};

export default TodaysVibe;
