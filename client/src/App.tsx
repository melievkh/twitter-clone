import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "router/router";
import { useAppDispatch } from "api/store";
import { authActions } from "api/store/reducers/slices/authSlice";
import { getAuthError, getIsLoggedIn } from "api/store/selectors";
import { AsyncThunks } from "api/store/action";
import { useNavigate } from "react-router-dom";
import ROUTES from "router/routes";
import { refreshTokens } from "api/axios/api";
import Cookies from "js-cookie";
import { COOKIE_KEYS } from "appConstants";

function App() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const authError = useSelector(getAuthError);
  const navigate = useNavigate();

  const fetchTweets = async () => {
    await dispatch(AsyncThunks.getTweets());
  };

  const fetchUsers = async () => {
    await dispatch(AsyncThunks.getAllUsers());
  };

  const clearData = () => {
    const refreshToken = Cookies.get(COOKIE_KEYS.REFRESH_TOKEN);

    if (isLoggedIn && !refreshToken) {
      dispatch(authActions.reset());
      navigate(ROUTES.LOGIN);
    }
  };

  useEffect(() => {
    fetchTweets();
    fetchUsers();
    clearData();
  }, []);

  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
}

export default App;
