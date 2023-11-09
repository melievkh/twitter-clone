import { combineReducers } from "@reduxjs/toolkit";

import { authReducer } from "./slices/authSlice";
import { userReducer } from "./slices/userSlice";
import { tweetsReducer } from "./slices/tweetsReducer";
import { messagesReducer } from "./slices/messagesSlice";

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  tweetsReducer,
  messagesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
