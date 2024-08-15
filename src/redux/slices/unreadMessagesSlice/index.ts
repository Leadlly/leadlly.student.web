import { createSlice } from "@reduxjs/toolkit";

export interface unreadMessageProps {
    messagesCount: number;
}

const initialState: unreadMessageProps = {
  messagesCount: 0,
};

export const unreadMessagesSlice = createSlice({
  name: "unreadMessages",
  initialState,
  reducers: {
    unreadMessages: (state, action) => {
      state.messagesCount = action.payload;
    },
  },
});

export const { unreadMessages } = unreadMessagesSlice.actions;

export default unreadMessagesSlice.reducer;
