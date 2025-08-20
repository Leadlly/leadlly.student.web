import { TQuizAnswerProps } from "@/helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DailyQuizProps {
  dailyQuizzes: Array<{
    topicName: string | null;
    attemptedQuestions: TQuizAnswerProps[];
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
      if (typeof window !== undefined) {
        const currentTopic = state.dailyQuizzes.find(
          (quiz) => quiz.topicName === action.payload.topicName
        );

        if (currentTopic) {
          currentTopic.attemptedQuestions.push(
            ...action.payload.attemptedQuestions
          );

          state.dailyQuizzes.push(currentTopic);
        } else {
          state.dailyQuizzes.push(action.payload);
        }

        localStorage.setItem(
          "leadlly_daily_quiz",
          JSON.stringify(state.dailyQuizzes)
        );
      }
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
} = dailyQuizSlice.actions;

export default dailyQuizSlice.reducer;
