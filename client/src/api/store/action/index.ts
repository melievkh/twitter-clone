import { createAsyncThunk } from "@reduxjs/toolkit";

import { loginUserThunk, registerUserThunk } from "./thunks/authThunk";
import { getUserThunk, getUsersThunk } from "./thunks/userThunk";
import {
  createTweetThunk,
  deleteTweetThunk,
  getTweetsThunk,
} from "./thunks/tweetsThunk";
import {
  getMessagesByUserThunk,
  getMessagesThunk,
} from "./thunks/messagesThunk";

export const AsyncThunks = {
  registerUser: createAsyncThunk("registerUser", registerUserThunk),
  loginUser: createAsyncThunk("loginUser", loginUserThunk),
  getUser: createAsyncThunk("getUser", getUserThunk),
  getAllUsers: createAsyncThunk("getUsers", getUsersThunk),
  getTweets: createAsyncThunk("getTweets", getTweetsThunk),
  createTweet: createAsyncThunk("createTweet", createTweetThunk),
  deleteTweet: createAsyncThunk("deleteTweet", deleteTweetThunk),

  getMessages: createAsyncThunk("getMessages", getMessagesThunk),
  getMessagesByUser: createAsyncThunk(
    "getMessageByUser",
    getMessagesByUserThunk,
  ),
};
