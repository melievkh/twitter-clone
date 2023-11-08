import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import { useAppDispatch } from "api/store";
import { getIsLoggedIn } from "api/store/selectors";
import { ILoginProps, IRegisterProps } from "types";
import { AsyncThunks } from "api/store/action";
import { userActions } from "api/store/reducers/slices/userSlice";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const [credentials, setCredentials] = useState<IRegisterProps>();

  const registerUser = useCallback(
    async (registerParams: IRegisterProps) => {
      setCredentials({
        fullname: registerParams.fullname,
        username: registerParams.username,
        email: registerParams.email,
        password: registerParams.password,
      });

      await dispatch(AsyncThunks.registerUser(registerParams));
    },
    [dispatch],
  );

  const loginUser = useCallback(
    async (loginParams: ILoginProps) => {
      await dispatch(AsyncThunks.loginUser(loginParams));
    },
    [dispatch],
  );

  const logoutUser = useCallback(async () => {
    dispatch(userActions.reset());
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn && credentials) {
      loginUser(credentials);
    }
  }, [credentials, isLoggedIn, loginUser]);

  return { registerUser, loginUser, logoutUser };
};

export default useAuth;
