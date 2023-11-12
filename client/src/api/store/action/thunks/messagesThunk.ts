import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";

import axiosInstance from "api/axios/axiosInstances";
import endpoints from "api/axios/endpoints";
import { ErrorResponseType } from "types";

export const getMessagesThunk: AsyncThunkPayloadCreator<
  any,
  string,
  { rejectValue: ErrorResponseType }
> = async (recipient_id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(
      endpoints.messages.messages(recipient_id),
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};
