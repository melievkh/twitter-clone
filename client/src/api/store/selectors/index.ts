import { RootState } from "../reducers";

export const getIsLoggedIn = (state: RootState) => state.userReducer.isLoggedIn;
export const getUser = (state: RootState) => state.userReducer.result;
export const getUserError = (state: RootState) => state.userReducer.error;
export const getUserId = (state: RootState) => state.userReducer.userId;
export const getUsers = (state: RootState) => state.usersReducer.result;
export const getTweetsError = (state: RootState) => state.tweetsReducer.error;
export const getTweets = (state: RootState) => state.tweetsReducer.result;
export const getTweetError = (state: RootState) => state.tweetsReducer.error;
