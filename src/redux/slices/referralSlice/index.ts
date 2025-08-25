import { ICoupon } from "@/helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ReferralProps {
  referral: ICoupon | null;
}

const initialState: ReferralProps = {
  referral: null,
};

const referralSlice = createSlice({
  name: "referral",
  initialState,
  reducers: {
    setReferral: (state, action: PayloadAction<ICoupon | null>) => {
      state.referral = action.payload;
    },
    clearReferral: (state) => {
      state.referral = null;
    },
  },
});

export const { setReferral, clearReferral } = referralSlice.actions;
export default referralSlice.reducer;
