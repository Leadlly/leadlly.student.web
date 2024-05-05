import React from "react";
import MoodEmojiSelector from "./MoodEmojiSelector";

const moodEmojis = [
  {
    mood: "/assets/icons/sad_emoji.png",
    mood_id: "sad-emoji",
  },
  {
    mood: "/assets/icons/unhappy_emoji.png",
    mood_id: "unhappy-emoji",
  },
  {
    mood: "/assets/icons/neutral_emoji.png",
    mood_id: "neutral-emoji",
  },
  {
    mood: "/assets/icons/smiling_emoji.png",
    mood_id: "smiling-emoji",
  },
  {
    mood: "/assets/icons/laughing_emoji.png",
    mood_id: "laughing-emoji",
  },
];

const TodaysVibe = () => {
  return (
    <div className="border rounded-xl px-3 py-[10px]">
      <h4 className="text-sm text-black font-semibold">Today&apos;s Vibes</h4>
      <p className="text-[10px] text-black font-normal">
        Sessions and quizzes were insightful and engaging ?
      </p>

      <MoodEmojiSelector moodEmojis={moodEmojis} />
    </div>
  );
};

export default TodaysVibe;
