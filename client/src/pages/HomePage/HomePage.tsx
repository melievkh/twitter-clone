import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "components/Layout/Footer";
import Header from "components/Layout/Header";
import Tweet from "components/Twit/Twit";
import useAuth from "hooks/useAuth";
import useGetTweets from "hooks/useGetTwits";
import { getTweetError } from "api/store/selectors";
import ROUTES from "router/routes";
import ITweetProps from "types";
import { toast } from "react-toastify";

const HomePage = () => {
  const tweets = useGetTweets();
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const tweetsError = useSelector(getTweetError);
  console.log(tweetsError);

  useEffect(() => {
    if (tweetsError?.statusCode === 401) {
      toast.error(tweetsError.message);
      logoutUser();
      navigate(ROUTES.LOGIN);
    }
  }, [tweetsError, logoutUser, navigate]);

  return (
    <div className='w-full h-full'>
      <div className='sm:w-1/2 w-full fixed '>
        <Header />
      </div>

      <div className='w-full flex flex-col items-center justify-between mt-20'>
        <ul>
          {tweets.length ? (
            tweets.map((tweet: ITweetProps) => (
              <li key={tweet.id}>
                <Link to={`/users/${tweet.user_id}`}>
                  <Tweet key={tweet.id} {...tweet} />
                </Link>
              </li>
            ))
          ) : (
            <div className='w-full flex justify-center'>
              <h1>No Tweets Found!</h1>
            </div>
          )}
        </ul>

        <div className='w-full p-8'>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
