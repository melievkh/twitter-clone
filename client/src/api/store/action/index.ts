import { createAsyncThunk } from "@reduxjs/toolkit";

import { loginUserThunk, registerUserThunk } from "./thunks/authThunk";
import { getUserByIdThunk, getUsersThunk } from "./thunks/userThunk";
import {
  createTweetThunk,
  deleteTweetThunk,
  getTweetsThunk,
  getUserTweetsThunk,
} from "./thunks/tweetsThunk";
import {
  getMessagesByUserThunk,
  getMessagesThunk,
} from "./thunks/messagesThunk";

export const AsyncThunks = {
  registerUser: createAsyncThunk("registerUser", registerUserThunk),
  loginUser: createAsyncThunk("loginUser", loginUserThunk),

  getUser: createAsyncThunk("getUserById", getUserByIdThunk),
  getAllUsers: createAsyncThunk("getUsers", getUsersThunk),

  getUserTweetsByUserId: createAsyncThunk("userTweets", getUserTweetsThunk),
  getTweets: createAsyncThunk("getTweets", getTweetsThunk),
  createTweet: createAsyncThunk("createTweet", createTweetThunk),
  deleteTweet: createAsyncThunk("deleteTweet", deleteTweetThunk),

  getMessages: createAsyncThunk("getMessages", getMessagesThunk),
  getMessagesByUser: createAsyncThunk(
    "getMessageByUser",
    getMessagesByUserThunk,
  ),
};
