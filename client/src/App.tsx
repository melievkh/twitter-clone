import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "router/router";
import { useAppDispatch } from "api/store";
import { authActions } from "api/store/reducers/slices/authSlice";
import { getIsLoggedIn } from "api/store/selectors";
import { AsyncThunks } from "api/store/action";
import { useNavigate } from "react-router-dom";
import ROUTES from "router/routes";

function App() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const navigate = useNavigate();

  const fetchTweets = async () => {
    await dispatch(AsyncThunks.getTweets());
  };

  const fetchUsers = async () => {
    await dispatch(AsyncThunks.getAllUsers());
  };

  const clearData = () => {
    if (isLoggedIn === false) {
      dispatch(authActions.reset());
      navigate(ROUTES.LOGIN);
    }
  };

  useEffect(() => {
    fetchTweets();
    fetchUsers();
    clearData();
  }, [isLoggedIn]);

  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
}

export default App;
