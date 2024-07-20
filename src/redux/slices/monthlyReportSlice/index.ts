import { TStudentReportProps } from "@/helpers/types";
import { createSlice } from "@reduxjs/toolkit";

export interface monthlyReportProps {
  report: TStudentReportProps | null;
}

const initialState: monthlyReportProps = {
  report: null,
};

export const monthlyReportSlice = createSlice({
  name: "monthlyReport",
  initialState,
  reducers: {
    monthlyData: (state, action) => {
      state.report = action.payload;
    },
  },
});

export const { monthlyData } = monthlyReportSlice.actions;

export default monthlyReportSlice.reducer;
