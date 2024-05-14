"use client";

import React, { useState } from "react";
import Image from "next/image";

import { TMoodEmojisProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const MoodEmojiSelector = ({
  moodEmojis,
}: {
  moodEmojis: TMoodEmojisProps[];
}) => {
  const [currentMood, setCurrentMood] = useState("neutral-emoji");

  return (
    <div className="relative flex items-center justify-between mt-2 max-w-48 w-full mx-auto">
      <span className="w-[6px] h-[6px] rounded-full bg-primary"></span>
      {moodEmojis.map((emoji) => (
        <Image
          key={emoji.mood_id}
          src={emoji.mood}
          alt={emoji.mood_id}
          width={20}
          height={20}
          onClick={() => setCurrentMood(emoji.mood_id)}
          className={cn(
            "cursor-pointer transition-all ease-in delay-150",
            currentMood === emoji.mood_id ? "grayscale-0" : "grayscale"
          )}
        />
      ))}
      <span className="w-[6px] h-[6px] rounded-full bg-primary"></span>

      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 bg-primary w-full h-[2px] bg-[#D9D9D9]"></div>
    </div>
  );
};

export default MoodEmojiSelector;
