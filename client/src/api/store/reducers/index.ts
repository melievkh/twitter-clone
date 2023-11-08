import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./slices/userSlice";
import { usersReducer } from "./slices/allUsersSlice";
import { tweetsReducer } from "./slices/tweetsReducer";

const rootReducer = combineReducers({
  userReducer,
  usersReducer,
  tweetsReducer,
});

export const persistentStoreBlacklist = [];

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
