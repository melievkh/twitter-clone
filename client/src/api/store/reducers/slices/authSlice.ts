import { createSlice } from "@reduxjs/toolkit";

import { AsyncThunks } from "api/store/action";
import { onError, onPending } from "api/store/stateResults";
import { StateType, UserType } from "types";

interface AuthStateType extends StateType<any> {
  isLoggedIn: boolean;
  userId: string;
  result: UserType | null;
}

const initialState: AuthStateType = {
  error: null,
  result: null,
  isLoggedIn: false,
  userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AsyncThunks.loginUser.pending, onPending);
    builder.addCase(AsyncThunks.loginUser.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;

      if (action.payload.accessToken) {
        state.userId = action.payload.userId;
        state.isLoggedIn = true;
      }
    });
    builder.addCase(AsyncThunks.loginUser.rejected, onError);

    builder.addCase(AsyncThunks.registerUser.pending, onPending);
    builder.addCase(AsyncThunks.registerUser.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
    });
    builder.addCase(AsyncThunks.registerUser.rejected, onError);

    builder.addCase(AsyncThunks.getUser.pending, onPending);
    builder.addCase(AsyncThunks.getUser.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.result = { ...state.result, ...action.payload };
    });
    builder.addCase(AsyncThunks.getUser.rejected, onError);
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
