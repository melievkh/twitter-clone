import { createAsyncThunk } from "@reduxjs/toolkit";

import { loginUserThunk, registerUserThunk } from "./thunks/authThunk";
import { getUserByIdThunk, getUsersThunk } from "./thunks/userThunk";
import {
  createTweetThunk,
  deleteTweetThunk,
  getTweetsThunk,
  getUserTweetsThunk,
} from "./thunks/tweetsThunk";

export const AsyncThunks = {
  registerUser: createAsyncThunk("registerUser", registerUserThunk),
  loginUser: createAsyncThunk("loginUser", loginUserThunk),

  getUser: createAsyncThunk("getUserById", getUserByIdThunk),
  getAllUsers: createAsyncThunk("getUsers", getUsersThunk),

  getUserTweetsByUserId: createAsyncThunk("userTweets", getUserTweetsThunk),
  getTweets: createAsyncThunk("getTweets", getTweetsThunk),
  createTweet: createAsyncThunk("createTweet", createTweetThunk),
  deleteTweet: createAsyncThunk("deleteTweet", deleteTweetThunk),
};
