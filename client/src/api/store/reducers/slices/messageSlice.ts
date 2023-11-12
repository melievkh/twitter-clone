import { createSlice } from "@reduxjs/toolkit";

import { onError, onPending } from "api/store/stateResults";
import { AsyncThunks } from "api/store/action";
import { IMessageProps, StateType } from "types";

interface IMessageType extends StateType<IMessageProps[]> {}

const initialState: IMessageType = {
  pending: false,
  error: null,
  result: [],
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    reset: () => initialState,
    addMessage: (state, action) => {
      const prevMessages = state.result;
      state.result = [...prevMessages, action.payload];
      console.log(action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(AsyncThunks.getMessages.pending, onPending);
    builder.addCase(AsyncThunks.getMessages.fulfilled, (state, action) => {
      state.pending = false;
      state.result = action.payload;
    });
    builder.addCase(AsyncThunks.getMessages.rejected, onError);
  },
});

export const messageActions = messageSlice.actions;
export const messageReducer = messageSlice.reducer;
