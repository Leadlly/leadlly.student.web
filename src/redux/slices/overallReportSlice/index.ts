import { TStudentOverallReportProps } from "@/helpers/types";
import { createSlice } from "@reduxjs/toolkit";

export interface overallReportProps {
  report: TStudentOverallReportProps[] | null;
}

const initialState: overallReportProps = {
  report: null,
};

export const overallReportSlice = createSlice({
  name: "overallReport",
  initialState,
  reducers: {
    overallData: (state, action) => {
      state.report = action.payload;
    },
  },
});

export const { overallData } = overallReportSlice.actions;

export default overallReportSlice.reducer;
