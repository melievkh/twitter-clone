import Cookies from "js-cookie";
import { includes } from "lodash";
import axios, { InternalAxiosRequestConfig } from "axios";

import { COOKIE_KEYS } from "appConstants";
import { refreshTokens } from "./api";
import endpoints from "./endpoints";

const axiosInstance = axios.create({ baseURL: "http://localhost:4000" });

const endpointsWithoutToken = [endpoints.auth.login, endpoints.auth.register];

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.headers && !includes(endpointsWithoutToken, config.url)) {
    const accessToken = Cookies.get(COOKIE_KEYS.ACCESS_TOKEN);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    if (response && !includes(endpointsWithoutToken, config.url)) {
      const { status, data } = response;

      // if refresh token is expired
      if (config.url === endpoints.auth.refresh && status === 401) {
        Cookies.remove(COOKIE_KEYS.REFRESH_TOKEN);
        window.location.reload();
      }

      if (status === 401 && !config.retry && data?.message === "Unauthorized") {
        config.retry = true;

        try {
          await refreshTokens();
          return await axiosInstance(config);
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
