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

// Function to get quizzes from localStorage only on the client side
const getStoredQuizzes = () => {
  if (typeof window !== "undefined") {
    const storedQuizzes = localStorage.getItem("leadlly_weekly_quiz");
    return storedQuizzes ? JSON.parse(storedQuizzes) : [];
  }
  return [];
};

const initialState: WeeklyQuizProps = {
  quizzes: getStoredQuizzes(),
};

export const weeklyQuizSlice = createSlice({
  name: "weeklyQuiz",
  initialState,
  reducers: {
    weeklyQuizData: (state, action) => {
      // Get existing quizzes from localStorage (only on the client)
      if (typeof window !== "undefined") {
        const storedQuizzes = localStorage.getItem("leadlly_weekly_quiz");
        const quizzes: typeof state.quizzes = storedQuizzes
          ? JSON.parse(storedQuizzes)
          : [];

        // Check if the quiz already exists
        const existingQuestion = quizzes.some(
          (quiz) => quiz.questionId === action.payload.questionId
        );

        if (existingQuestion) {
          // Find index of the existing quiz
          const quizIndex = quizzes.findIndex(
            (quiz) => quiz.questionId === action.payload.questionId
          );
          if (quizIndex !== -1) {
            // Replace the existing quiz
            quizzes[quizIndex] = action.payload;
          }
        } else {
          // Add new quiz
          quizzes.push(action.payload);
        }

        // Update state and localStorage
        state.quizzes = quizzes;
        localStorage.setItem("leadlly_weekly_quiz", JSON.stringify(quizzes));
      }
    },
    clearWeeklyData: (state) => {
      state.quizzes = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("leadlly_weekly_quiz");
      }
    },
  },
});

export const { weeklyQuizData, clearWeeklyData } = weeklyQuizSlice.actions;

export default weeklyQuizSlice.reducer;
