import { RootState } from "../reducers";

export const getIsLoggedIn = (state: RootState) => state.authReducer.isLoggedIn;
export const getUser = (state: RootState) => state.authReducer.result;
export const getAuthError = (state: RootState) => state.authReducer.error;
export const getUserId = (state: RootState) => state.authReducer.userId;

export const getUsers = (state: RootState) => state.userReducer.result;
export const getUserById = (state: RootState) => state.userReducer.userById;

export const getTweetsError = (state: RootState) => state.tweetsReducer.error;
export const getTweets = (state: RootState) => state.tweetsReducer.result;
export const getuserTweets = (state: RootState) =>
  state.tweetsReducer.userTweets;

export const getMessages = (state: RootState) => state.messagesReducer.result;
