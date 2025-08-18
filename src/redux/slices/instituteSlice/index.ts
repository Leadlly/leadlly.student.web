import { TInstituteProps } from "@/helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InstituteProps {
  institute: TInstituteProps | null;
}

const initialState: InstituteProps = {
  institute: null,
};

const instituteSlice = createSlice({
  name: "institute",
  initialState,
  reducers: {
    setInstitute: (state, action: PayloadAction<TInstituteProps>) => {
      state.institute = action.payload;
    },
    clearInstitute: (state) => {
      state.institute = null;
    },
  },
});

export const { clearInstitute, setInstitute } = instituteSlice.actions;

export default instituteSlice.reducer;
