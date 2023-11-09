import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "router/router";
import { useAppDispatch } from "api/store";
import { authActions } from "api/store/reducers/slices/authSlice";
import { getAuthError } from "api/store/selectors";

function App() {
  const authError = useSelector(getAuthError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const clearData = () => {
      if (authError?.message === "Unauthorized") {
        dispatch(authActions.reset());
      }
    };

    clearData();
  }, [authError, dispatch]);

  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
}

export default App;
