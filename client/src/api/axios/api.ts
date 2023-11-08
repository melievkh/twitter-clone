import Cookies from "js-cookie";
import endpoints from "./endpoints";
import { updateLocalTokens } from "./helpers";
import axiosInstance from "./axiosInstances";

export const refreshTokens = async () => {
  const refreshToken = Cookies.get("refreshToken");

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
