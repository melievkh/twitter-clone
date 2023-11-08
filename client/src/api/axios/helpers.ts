import Cookies from "js-cookie";

export const updateLocalTokens = (tokens: {
  accessToken: string;
  refreshToken: string;
}) => {
  const { accessToken, refreshToken } = tokens;

  Cookies.set("accessToken", accessToken, {
    expires: 10,
  });
  Cookies.set("refreshToken", refreshToken, {
    expires: 80,
  });
};
