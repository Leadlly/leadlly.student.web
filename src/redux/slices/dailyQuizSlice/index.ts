import { TQuizAnswerProps } from "@/helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DailyQuizProps {
  dailyQuizzes: Array<{
    topicName: string | null;
    attemptedQuestions: TQuizAnswerProps[];
    date: number;
  }>;
}

const getStoredQuizzes = () => {
  if (typeof window !== "undefined") {
    const storedQuizzes = localStorage.getItem("leadlly_daily_quiz");
    return storedQuizzes ? JSON.parse(storedQuizzes) : [];
  }
  return [];
};

const initialState: DailyQuizProps = {
  dailyQuizzes: getStoredQuizzes(),
};

export const dailyQuizSlice = createSlice({
  name: "dailyQuiz",
  initialState,
  reducers: {
    dailyQuizAttemptedQuestions: (
      state,
      action: PayloadAction<DailyQuizProps["dailyQuizzes"][0]>
    ) => {
      const currentTopicIndex = state.dailyQuizzes.findIndex(
        (quiz) => quiz.topicName === action.payload.topicName
      );

      if (currentTopicIndex !== -1) {
        console.log("here");

        state.dailyQuizzes[currentTopicIndex].attemptedQuestions.push(
          ...action.payload.attemptedQuestions
        );
      } else {
        state.dailyQuizzes.push(action.payload);
      }

      localStorage.setItem(
        "leadlly_daily_quiz",
        JSON.stringify(state.dailyQuizzes)
      );
    },

    filterCompletedTopics: (
      state,
      action: PayloadAction<{ topicName: string }>
    ) => {
      if (typeof window !== undefined) {
        state.dailyQuizzes = state.dailyQuizzes.filter(
          (quiz) => quiz.topicName !== action.payload.topicName
        );
        localStorage.setItem(
          "leadlly_daily_quiz",
          JSON.stringify(state.dailyQuizzes)
        );
      }
    },

    clearDailyQuizWithDate: (
      state,
      action: PayloadAction<{ date: number }>
    ) => {
      state.dailyQuizzes = state.dailyQuizzes.filter(
        (quiz) => quiz.date && quiz.date >= action.payload.date
      );

      localStorage.setItem(
        "leadlly_daily_quiz",
        JSON.stringify(state.dailyQuizzes)
      );
    },

    clearDailyQuiz: (state) => {
      state.dailyQuizzes = [];
      if (typeof window !== undefined) {
        localStorage.removeItem("leadlly_daily_quiz");
      }
    },
  },
});

export const {
  dailyQuizAttemptedQuestions,
  filterCompletedTopics,
  clearDailyQuiz,
  clearDailyQuizWithDate,
} = dailyQuizSlice.actions;

export default dailyQuizSlice.reducer;
