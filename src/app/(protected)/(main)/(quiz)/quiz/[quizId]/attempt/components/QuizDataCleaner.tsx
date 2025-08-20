"use client";

import { useAppDispatch } from "@/redux/hooks";
import { clearWeeklyData } from "@/redux/slices/weeklyQuizSlice";
import { useEffect, useState } from "react";

const QuizDataCleaner = ({ endDate }: { endDate: string }) => {
  const dispatch = useAppDispatch();

  const [hasCleared, setHasCleared] = useState(false);

  useEffect(() => {
    if (!endDate || hasCleared) return;

    const end = new Date(endDate);
    const now = new Date();
    const timeUntilEnd = end.getTime() - now.getTime();

    let intervalTime;
    if (timeUntilEnd > 24 * 60 * 60 * 1000) {
      intervalTime = 24 * 60 * 60 * 1000; // Check daily if more than a day away
    } else if (timeUntilEnd > 60 * 60 * 1000) {
      intervalTime = 60 * 60 * 1000; // Check hourly if more than an hour away
    } else {
      intervalTime = 60 * 1000; // Check every minute if less than an hour away
    }

    const intervalId = setInterval(() => {
      const currentTime = new Date();
      if (currentTime >= end) {
        dispatch(clearWeeklyData());
        setHasCleared(true);
        clearInterval(intervalId);
      }
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [dispatch, endDate, hasCleared]);

  return null;
};

export default QuizDataCleaner;
