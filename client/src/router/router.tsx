import { getIsLoggedIn } from "api/store/selectors";
import Layout from "components/Layout";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./routes";
import HomePage from "pages/HomePage/HomePage";
import SearchPage from "pages/SearchPage/SearchPage";
import ChatPage from "pages/ChatPage/ChatPage";
import ChatRoom from "components/ChatRoom";
import ProfilePage from "pages/ProfilePage/ProfilePage";
import UserDetailsPage from "pages/UserDetailsPage";
import NotificationsPage from "pages/NotificationsPage/NotificationsPage";
import Login from "components/Auth/Login/Login";
import SignUp from "components/Auth/Register/Register";

// ... (import statements)

const Router = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <Layout>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.SEARCH} element={<SearchPage />} />
            <Route path={ROUTES.CHAT} element={<ChatPage />} />
            <Route path={ROUTES.CHAT_ROOM} element={<ChatRoom />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route
              path={ROUTES.USER_DETAILS_PAGE}
              element={<UserDetailsPage />}
            />
            <Route path={ROUTES.NOTIFICATION} element={<NotificationsPage />} />
            <Route path='/*' element={<p>Not Found page</p>} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route index element={<Login />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<SignUp />} />
        </Routes>
      )}
    </>
  );
};

export default Router;
