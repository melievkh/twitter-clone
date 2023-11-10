import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";

import ROUTES from "router/routes";
import useAuth from "hooks/useAuth";
import { getUser, getUserId, getuserTweets } from "api/store/selectors";
import { AsyncThunks } from "api/store/action";
import { useAppDispatch } from "api/store";
import Tweet from "components/Twit/Twit";
import { AiOutlineCalendar } from "react-icons/ai";
import { getFormattedMonthAndYear } from "utils/date";

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const userId = useSelector(getUserId);
  const tweets = useSelector(getuserTweets);
  const dispatch = useAppDispatch();
  const { logoutUser } = useAuth();

  const fetchTweets = async () => {
    await dispatch(AsyncThunks.getUserTweetsByUserId(userId));
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const logout = () => {
    logoutUser();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className='w-full h-[100vh] overflow-scroll flex flex-col'>
      <header className='fixed top-0 w-full h-14 flex items-center p-4 gap-4 backdrop-blur-md'>
        <Link to={ROUTES.HOME}>
          <BiArrowBack className='text-2xl' />
        </Link>

        <div className='flex flex-col'>
          <h3 className='text-lg'>{user?.fullname}</h3>
          <p className='text-sm text-[#484848]'> posts</p>
        </div>
      </header>

      <div className='w-full h-max flex items-center justify-between p-4 mt-20'>
        <RxAvatar className='text-[100px]' />
        <button
          className='h-8 text-[#e17474] hover:bg-bgHover pr-4 pl-4 rounded-xl border border-[#ecbaba] transition duration-300'
          onClick={logout}
        >
          log out
        </button>
      </div>

      {/* User Details */}
      <div className='w-full flex flex-col gap-3 p-4'>
        <div className='flex flex-col'>
          <h2 className='text-lg font-bold'>{user?.fullname}</h2>
          <h4 className='text-[#616161]'>@{user?.username}</h4>
        </div>
        <p>
          If it makes you happy, <br /> make it private
        </p>
        <p className='flex gap-1 items-center'>
          {/* <AiOutlineCalendar /> {getFormattedMonthAndYear(user?.created_at)} */}
        </p>
      </div>

      {/* User posts */}
      <div className='w-full'>
        <div className='w-full h-16 flex justify-center items-center border-b border-b-borderColor hover:bg-bgHover transition duration-500'>
          <h1 className='text-xl'>My Posts</h1>
        </div>

        {tweets.length ? (
          tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
        ) : (
          <div className='w-full flex justify-center p-4'>
            <h1>No Tweets Found!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
