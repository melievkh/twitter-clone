import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";

import axiosInstance from "api/axios/axiosInstances";
import endpoints from "api/axios/endpoints";
import { RootState } from "api/store/reducers";
import { ErrorResponseType, IMessagesProps } from "types";

export const getMessagesThunk: AsyncThunkPayloadCreator<
  any,
  IMessagesProps,
  { rejectValue: ErrorResponseType }
> = async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(endpoints.tweets.tweets);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const createMessageThunk: AsyncThunkPayloadCreator<
  any,
  string,
  { rejectValue: ErrorResponseType; state: RootState }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      endpoints.messages.create,
      params,
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const getMessagesByUserThunk: AsyncThunkPayloadCreator<
  any,
  string,
  { rejectValue: any }
> = async (userId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(
      endpoints.messages.getByUser(userId),
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};
