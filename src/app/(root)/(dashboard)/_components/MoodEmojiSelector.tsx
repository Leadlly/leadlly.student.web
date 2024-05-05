"use client";

import React, { useState } from "react";
import Image from "next/image";

import clsx from "clsx";

import { TMoodEmojisProps } from "@/helpers/types";

const MoodEmojiSelector = ({
  moodEmojis,
}: {
  moodEmojis: TMoodEmojisProps[];
}) => {
  const [currentMood, setCurrentMood] = useState("neutral-emoji");

  return (
    <div className="relative flex items-center justify-between mt-2 max-w-48 w-full mx-auto">
      <span className="w-[6px] h-[6px] rounded-full bg-red-600"></span>
      {moodEmojis.map((emoji) => (
        <Image
          key={emoji.mood_id}
          src={emoji.mood}
          alt={emoji.mood_id}
          width={20}
          height={20}
          onClick={() => setCurrentMood(emoji.mood_id)}
          className={clsx(
            "cursor-pointer transition-all ease-in delay-150",
            currentMood === emoji.mood_id ? "grayscale-0" : "grayscale"
          )}
        />
      ))}

      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 w-[calc(100%-2px)] h-[2px] bg-[#D9D9D9]">
        <div className="h-full w-full bg-gradient-to-r from-red-600 from-20% via-orange-500 via-20% to-green-500"></div>
      </div>
    </div>
  );
};

export default MoodEmojiSelector;
