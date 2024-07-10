"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { moodEmojis } from "@/helpers/constants";
import { getUser, setTodaysVibe } from "@/actions/user_actions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import { Loader2 } from "lucide-react";

const MoodEmojiSelector = () => {
  const user = useAppSelector((state) => state.user.user);

  const userCurrentMood = user?.details?.mood;
  const today = new Date().toISOString().split("T")[0];

  const currentDateMoodIndex = userCurrentMood?.findIndex(
    (mood) => mood.day === today
  );

  const [currentMood, setCurrentMood] = useState(
    userCurrentMood &&
      userCurrentMood.length &&
      userCurrentMood?.[currentDateMoodIndex!]?.emoji
      ? userCurrentMood?.[currentDateMoodIndex!]?.emoji
      : "neutral"
  );

  const [isCurrentMood, setIsCurrentMood] = useState(false);
  const [todaysMoodSet, setIsTodaysMoodSet] = useState(false);

  const dispatch = useAppDispatch();

  const handleChangeMood = async (mood: string) => {
    setIsCurrentMood(true);
    try {
      setCurrentMood(mood);

      const response = await setTodaysVibe({
        todaysVibe: mood,
      });

      dispatch(
        userData({
          ...user,
          details: {
            ...user?.details,
            mood: [...(user?.details?.mood || []), { day: today, emoji: mood }],
          },
        })
      );
      toast.success(response.message);
      setIsTodaysMoodSet(true);
    } catch (error: any) {
      setCurrentMood(currentMood);
      toast.error("Saving your current mood failed!", {
        description: error.message,
      });
    } finally {
      setIsCurrentMood(false);
    }
  };

  useEffect(() => {
    const now = new Date();
    const nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 0, 0);

    setIsTodaysMoodSet(now < nextMidnight);
  }, []);

  return (
    <>
      {todaysMoodSet ? (
        <>
          <p className="text-xs w-full text-center py-1 text-primary font-medium">
            Your current mood is{" "}
            {user?.details?.mood &&
            user.details.mood.length &&
            user?.details?.mood?.[currentDateMoodIndex!]?.emoji
              ? user?.details?.mood?.[currentDateMoodIndex!]?.emoji
              : "neutral"}
          </p>
        </>
      ) : (
        <div className="flex items-center">
          <div className="relative flex items-center justify-between mt-2 max-w-48 w-full mx-auto">
            <span className="w-[6px] h-[6px] rounded-full bg-primary"></span>
            {moodEmojis.map((emoji) => (
              <Image
                key={emoji.mood_id}
                src={emoji.moodImg}
                alt={emoji.mood}
                width={20}
                height={20}
                onClick={() => handleChangeMood(emoji.mood)}
                className={cn(
                  "cursor-pointer transition-all ease-in duration-200",
                  currentMood === emoji.mood ? "grayscale-0" : "grayscale",
                  isCurrentMood && "pointer-events-none opacity-90"
                )}
              />
            ))}
            <span className="w-[6px] h-[6px] rounded-full bg-primary"></span>

            <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 bg-primary w-full h-[2px] bg-[#D9D9D9]"></div>
          </div>
          {isCurrentMood && (
            <Loader2 className="w-3 h-3 animate-spin mt-2 -ml-1 text-primary" />
          )}
        </div>
      )}
    </>
  );
};

export default MoodEmojiSelector;
