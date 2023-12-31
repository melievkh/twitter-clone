import Cookies from "js-cookie";

import { updateLocalTokens } from "./helpers";
import axiosInstance from "./axiosInstances";
import { COOKIE_KEYS } from "appConstants";
import endpoints from "./endpoints";

export const refreshTokens = async () => {
  const refreshToken = Cookies.get(COOKIE_KEYS.REFRESH_TOKEN);

  if (refreshToken) {
    try {
      const { data } = await axiosInstance.get(endpoints.auth.refresh, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });

      updateLocalTokens(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};
