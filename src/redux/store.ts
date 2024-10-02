
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/slices/userSlice";
import weeklyReportReducer from "@/redux/slices/weeklyReportSlice";
import monthlyReportReducer from "@/redux/slices/monthlyReportSlice";
import overallReportReducer from "@/redux/slices/overallReportSlice";
import weeklyQuizReducer from "@/redux/slices/weeklyQuizSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      weeklyReport: weeklyReportReducer,
      monthlyReport: monthlyReportReducer,
      overallReport: overallReportReducer,
      weeklyQuizzes: weeklyQuizReducer,
    },
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
