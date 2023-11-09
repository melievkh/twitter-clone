import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./slices/userSlice";
import { usersReducer } from "./slices/allUsersSlice";
import { tweetsReducer } from "./slices/tweetsReducer";
import { messagesReducer } from "./slices/messagesSlice";

const rootReducer = combineReducers({
  userReducer,
  usersReducer,
  tweetsReducer,
  messagesReducer,
});

export const persistentStoreBlacklist = [];

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
