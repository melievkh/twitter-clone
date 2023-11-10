import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";

import { useAppDispatch } from "api/store";
import { AsyncThunks } from "api/store/action";
import { getUserById, getuserTweets } from "api/store/selectors";
import { getFormattedMonthAndYear } from "utils/date";
import Tweet from "components/Twit/Twit";
import ROUTES from "router/routes";

const UserDetailsPage = () => {
  const { id }: any = useParams();
  const dispatch = useAppDispatch();
  const user = useSelector(getUserById);
  const tweets = useSelector(getuserTweets);

  const fetchUserDetails = async () => {
    await dispatch(AsyncThunks.getUser(id));
  };

  const fetchTweets = async () => {
    await dispatch(AsyncThunks.getUserTweetsByUserId(id));
  };

  useEffect(() => {
    fetchTweets();
    fetchUserDetails();
  }, [fetchTweets, fetchUserDetails]);

  if (!user) return null;

  return (
    <div className='w-full h-[100vh] overflow-scroll flex flex-col mt-20'>
      <header className='fixed top-0 w-full h-14 flex items-center p-4 gap-4 backdrop-blur-md'>
        <Link to={ROUTES.HOME}>
          <BiArrowBack className='text-2xl' />
        </Link>

        <div className='flex flex-col'>
          <h3 className='text-lg'>{user?.fullname}</h3>
          <p className='text-sm '>posts</p>
        </div>
      </header>

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
          <AiOutlineCalendar /> {getFormattedMonthAndYear(user.created_at)}
        </p>
      </div>

      {/* User posts */}
      <div className='w-full'>
        <div className='w-full h-16 flex justify-center items-center border-b border-b-borderColor hover:bg-bgHover transition duration-500'>
          <h1 className='text-xl'>Posts</h1>
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

export default UserDetailsPage;
