import { Plan } from "@/helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedPlanProps {
  selectedPlan: Plan | null;
}

const initialState: SelectedPlanProps = {
  selectedPlan: null,
};

export const selectedPlanSlice = createSlice({
  name: "selectedPlan",
  initialState,
  reducers: {
    selectedPlan: (state, action: PayloadAction<Plan | null>) => {
      state.selectedPlan = action.payload;
    },
  },
});

export const { selectedPlan } = selectedPlanSlice.actions;
export default selectedPlanSlice.reducer;
