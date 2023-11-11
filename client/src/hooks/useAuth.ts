import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import { useAppDispatch } from "api/store";
import { getIsLoggedIn } from "api/store/selectors";
import { ILoginProps, IRegisterProps } from "types";
import { AsyncThunks } from "api/store/action";
import { authActions } from "api/store/reducers/slices/authSlice";
import { COOKIE_KEYS } from "appConstants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "router/routes";
import { tweetsActions } from "api/store/reducers/slices/tweetsReducer";
import { userActions } from "api/store/reducers/slices/userSlice";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(getIsLoggedIn);
  const [isRegistrationSuccessfull, setIsRegistrationSuccessfull] =
    useState(false);
  const [credentials, setCredentials] = useState<{
    password: string;
    email: string;
  }>();

  // register user
  const registerUser = async (registerParams: IRegisterProps) => {
    setCredentials({
      email: registerParams.email,
      password: registerParams.password,
    });

    const response = await dispatch(AsyncThunks.registerUser(registerParams));

    // @ts-ignore
    if (response.error) {
      toast.error(response.payload.message);
      return;
    }
    setIsRegistrationSuccessfull(true);
  };

  // login user
  const loginUser = async (loginParams: ILoginProps) => {
    const response = await dispatch(AsyncThunks.loginUser(loginParams));

    // @ts-ignore
    if (response.error) {
      toast.error(response.payload.message);
      return;
    }
    toast.success("Successfully logged in!");
    navigate(ROUTES.HOME);
  };

  // logout user
  const logoutUser = async () => {
    dispatch(authActions.reset());
    dispatch(tweetsActions.reset());
    dispatch(userActions.reset());
    Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN);
    Cookies.remove(COOKIE_KEYS.REFRESH_TOKEN);
  };

  // when user is registered, login him/her automatically
  useEffect(() => {
    if (!isLoggedIn && credentials && isRegistrationSuccessfull) {
      loginUser(credentials);
    }
  }, [credentials, isLoggedIn, loginUser]);

  return { registerUser, loginUser, logoutUser };
};

export default useAuth;
