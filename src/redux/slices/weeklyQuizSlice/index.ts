import { TQuizAnswerProps } from "@/helpers/types";
import { createSlice } from "@reduxjs/toolkit";

export interface WeeklyQuizProps {
  quizzes: Array<{
    questionId: string;
    quizId: string;
    topic: { name: string };
    question: TQuizAnswerProps;
  }>;
}

const initialState: WeeklyQuizProps = {
  quizzes: [],
};

export const weeklyQuizSlice = createSlice({
  name: "weeklyQuiz",
  initialState,
  reducers: {
    weeklyQuizData: (state, action) => {
      const existingQuestion = state.quizzes.some(
        (quiz) => quiz.questionId === action.payload.questionId
      );

      if (existingQuestion) {
        const quizIndex = state.quizzes.findIndex(
          (quiz) => quiz.questionId === action.payload.questionId
        );
        if (quizIndex !== -1) {
          state.quizzes.splice(quizIndex, 1, action.payload);
        }
      } else {
        state.quizzes.push(action.payload);
      }
    },
    clearWeeklyData: (state) => {
      state.quizzes = [];
    },
  },
});

export const { weeklyQuizData, clearWeeklyData } = weeklyQuizSlice.actions;

export default weeklyQuizSlice.reducer;
