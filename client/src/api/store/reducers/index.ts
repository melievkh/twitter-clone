import { combineReducers } from "@reduxjs/toolkit";

import { authReducer } from "./slices/authSlice";
import { userReducer } from "./slices/userSlice";
import { tweetsReducer } from "./slices/tweetsReducer";
import { messageReducer } from "./slices/messageSlice";

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  tweetsReducer,
  messageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
