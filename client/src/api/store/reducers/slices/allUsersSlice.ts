import { createSlice } from "@reduxjs/toolkit";

import { AsyncThunks } from "api/store/action";
import { onError, onPending } from "api/store/stateResults";
import { IRegisterProps } from "types";

interface IUsersType {
  pending: boolean;
  error: any;
  result: IRegisterProps[];
}

const initialState: IUsersType = {
  pending: false,
  error: null,
  result: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
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

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
