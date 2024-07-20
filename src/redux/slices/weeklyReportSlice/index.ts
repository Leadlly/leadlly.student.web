import { TStudentReportProps } from "@/helpers/types";
import { createSlice } from "@reduxjs/toolkit";

export interface weeklyReportProps {
  report: TStudentReportProps | null;
}

const initialState: weeklyReportProps = {
  report: null,
};

export const weeklyReportSlice = createSlice({
  name: "weeklyReport",
  initialState,
  reducers: {
    weeklyData: (state, action) => {
      state.report = action.payload;
    },
  },
});

export const { weeklyData } = weeklyReportSlice.actions;

export default weeklyReportSlice.reducer;
