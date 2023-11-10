import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";

import axiosInstance from "api/axios/axiosInstances";
import endpoints from "api/axios/endpoints";
import { ErrorResponseType } from "types";

export const getUserByIdThunk: AsyncThunkPayloadCreator<
  any,
  string,
  { rejectValue: ErrorResponseType }
> = async (userId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(endpoints.user.userById(userId));
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const getUsersThunk: AsyncThunkPayloadCreator<
  any,
  undefined,
  { rejectValue: ErrorResponseType }
> = async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(endpoints.user.users);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};
