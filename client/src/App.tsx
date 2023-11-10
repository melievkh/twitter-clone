import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "router/router";
import { useAppDispatch } from "api/store";
import { authActions } from "api/store/reducers/slices/authSlice";
import { getAuthError } from "api/store/selectors";
import { AsyncThunks } from "api/store/action";

function App() {
  const authError = useSelector(getAuthError);
  const dispatch = useAppDispatch();

  const fetchTweets = async () => {
    await dispatch(AsyncThunks.getTweets());
  };

  const fetchUsers = async () => {
    await dispatch(AsyncThunks.getAllUsers());
  };

  const clearData = () => {
    if (authError?.message === "Unauthorized") {
      dispatch(authActions.reset());
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
