import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";

import endpoints from "api/axios/endpoints";
import axiosInstance from "api/axios/axiosInstances";
import { updateLocalTokens } from "api/axios/helpers";
import { ILoginProps, IRegisterProps } from "types";
import { AsyncThunks } from "..";

export const registerUserThunk: AsyncThunkPayloadCreator<
  any,
  IRegisterProps,
  { rejectValue: any }
> = async (registerParams, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      endpoints.auth.register,
      registerParams,
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error.response.data);
  }
};

export const loginUserThunk: AsyncThunkPayloadCreator<
  any,
  ILoginProps,
  { rejectValue: any }
> = async (loginParams, { rejectWithValue, dispatch }) => {
  try {
    const response = await axiosInstance.post(
      endpoints.auth.login,
      loginParams,
    );
    updateLocalTokens(response.data);

    if (response.data) {
      await dispatch(AsyncThunks.getUser(response.data.userId));
    }

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};
