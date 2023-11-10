import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";

import axiosInstance from "api/axios/axiosInstances";
import endpoints from "api/axios/endpoints";
import { ErrorResponseType } from "types";

export const getTweetsThunk: AsyncThunkPayloadCreator<
  any,
  undefined,
  { rejectValue: ErrorResponseType }
> = async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(endpoints.tweets.tweets);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const getUserTweetsThunk: AsyncThunkPayloadCreator<
  any,
  string,
  { rejectValue: ErrorResponseType }
> = async (userId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(endpoints.tweets.byUserId(userId));
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const createTweetThunk: AsyncThunkPayloadCreator<
  any,
  string,
  { rejectValue: ErrorResponseType }
> = async (caption, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.tweets.create, {
      caption,
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response.data);
  }
};

export const deleteTweetThunk: AsyncThunkPayloadCreator<
  any,
  string,
  { rejectValue: any }
> = async (tweetId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(
      endpoints.tweets.delete(tweetId),
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};
