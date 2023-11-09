import { createSlice } from "@reduxjs/toolkit";

import { AsyncThunks } from "api/store/action";
import { onError, onPending } from "api/store/stateResults";
import { StateType, UserType } from "types";

interface IUsersType extends StateType<any[]> {
  result: UserType[];
}

const initialState: IUsersType = {
  pending: false,
  error: null,
  result: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: () => initialState,

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(AsyncThunks.getAllUsers.pending, onPending);
    builder.addCase(AsyncThunks.getAllUsers.fulfilled, (state, action) => {
      state.pending = false;
      state.result = action.payload;
    });
    builder.addCase(AsyncThunks.getAllUsers.rejected, onError);
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
