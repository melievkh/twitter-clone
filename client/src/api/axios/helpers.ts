import { COOKIE_KEYS } from "appConstants";
import Cookies from "js-cookie";

interface ITokenTypes {
  accessToken: string;
  refreshToken: string;
}

export const updateLocalTokens = (tokens: ITokenTypes) => {
  const { accessToken, refreshToken } = tokens;

  Cookies.set(COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
    expires: 10,
  });
  Cookies.set(COOKIE_KEYS.REFRESH_TOKEN, refreshToken, {
    expires: 80,
  });
};
