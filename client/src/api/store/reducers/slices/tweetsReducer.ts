import { createSlice } from "@reduxjs/toolkit";

import { onError, onPending } from "api/store/stateResults";
import { AsyncThunks } from "api/store/action";
import ITweetProps, { StateType } from "types";

interface ITweetsType extends StateType<any[]> {
  result: ITweetProps[];
  userTweets: ITweetProps[];
}

const initialState: ITweetsType = {
  pending: false,
  error: null,
  result: [],
  userTweets: [],
};

const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    reset: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(AsyncThunks.getTweets.pending, onPending);
    builder.addCase(AsyncThunks.getTweets.fulfilled, (state, action) => {
      state.pending = false;
      state.result = action.payload;
    });
    builder.addCase(AsyncThunks.getTweets.rejected, onError);

    builder.addCase(AsyncThunks.getUserTweetsByUserId.pending, onPending);
    builder.addCase(
      AsyncThunks.getUserTweetsByUserId.fulfilled,
      (state, action) => {
        state.pending = false;
        state.userTweets = action.payload;
      },
    );
    builder.addCase(AsyncThunks.getUserTweetsByUserId.rejected, onError);

    builder.addCase(AsyncThunks.createTweet.pending, onPending);
    builder.addCase(AsyncThunks.createTweet.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
    });
    builder.addCase(AsyncThunks.createTweet.rejected, onError);

    builder.addCase(AsyncThunks.deleteTweet.pending, onPending);
    builder.addCase(AsyncThunks.deleteTweet.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
    });
    builder.addCase(AsyncThunks.deleteTweet.rejected, onError);
  },
});

export const tweetsActions = tweetsSlice.actions;
export const tweetsReducer = tweetsSlice.reducer;
