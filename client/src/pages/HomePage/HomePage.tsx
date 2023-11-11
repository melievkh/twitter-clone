import { Link } from "react-router-dom";

import Footer from "components/Layout/Footer";
import Header from "components/Layout/Header";
import Tweet from "components/Twit/Twit";
import ITweetProps from "types";
import { useSelector } from "react-redux";
import { getTweets } from "api/store/selectors";
import AddTweet from "components/AddTweet/AddTweet";

const HomePage = () => {
  const tweets = useSelector(getTweets);

  return (
    <div className='w-full h-full'>
      <div className='sm:w-1/2 w-full fixed '>
        <Header />
      </div>

      <div className='w-full flex flex-col items-center justify-between mt-20'>
        <div className='w-full'>
          <AddTweet />
        </div>
        <ul>
          {tweets.length ? (
            tweets.map((tweet: ITweetProps) => (
              <li key={tweet.id}>
                <Link to={`/users/${tweet.user_id}`}>
                  <Tweet key={tweet.id} tweet={tweet} />
                </Link>
              </li>
            ))
          ) : (
            <div className='w-full flex justify-center'>
              <h1>Fetching data...</h1>
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
