import { configureStore } from "@reduxjs/toolkit";

import userReducer from "@/redux/slices/userSlice";
import weeklyReportReducer from "@/redux/slices/weeklyReportSlice";
import monthlyReportReducer from "@/redux/slices/monthlyReportSlice";
import overallReportReducer from "@/redux/slices/overallReportSlice";
import weeklyQuizReducer from "@/redux/slices/weeklyQuizSlice";
import dailyQuizReducer from "@/redux/slices/dailyQuizSlice";
import instituteReducer from "@/redux/slices/instituteSlice";
import selectedPlanReducer from "@/redux/slices/selectedPlanSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      dailyQuizzes: dailyQuizReducer,
      weeklyReport: weeklyReportReducer,
      monthlyReport: monthlyReportReducer,
      overallReport: overallReportReducer,
      weeklyQuizzes: weeklyQuizReducer,
      institute: instituteReducer,
      selectedPlan: selectedPlanReducer,
    },
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
