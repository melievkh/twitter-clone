import { createSlice } from "@reduxjs/toolkit";
import { AsyncThunks } from "api/store/action";
import { onError, onPending } from "api/store/stateResults";
import { IMessagesProps, StateType } from "types";

interface IMessagesType extends StateType<any[]> {
  result: IMessagesProps[];
}

const initialState: IMessagesType = {
  pending: false,
  error: null,
  result: [],
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
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

    builder.addCase(AsyncThunks.getMessagesByUser.pending, onPending);
    builder.addCase(
      AsyncThunks.getMessagesByUser.fulfilled,
      (state, action) => {
        state.pending = false;
        state.error = null;
      },
    );
    builder.addCase(AsyncThunks.getMessagesByUser.rejected, onError);
  },
});

export const messagesActions = messageSlice.actions;
export const messagesReducer = messageSlice.reducer;
