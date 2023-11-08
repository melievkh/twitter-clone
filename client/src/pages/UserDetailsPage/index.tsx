import { useAppDispatch } from "api/store";
import { AsyncThunks } from "api/store/action";
import { getUser } from "api/store/selectors";
import Tweet from "components/Twit/Twit";
import useGetMyTweets from "hooks/useGetMyTwits";
import useShowDate from "hooks/useShowDate";
import { useCallback, useEffect } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ROUTES from "router/routes";

const UserDetailsPage = () => {
  const { id }: any = useParams();
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);
  const tweets = useGetMyTweets(id);
  const countOfPosts = tweets.length;

  const fetchUserDetails = useCallback(async () => {
    await dispatch(AsyncThunks.getUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  console.log(user);

  const { created_at }: any = user;
  const { month, year } = useShowDate(created_at);
  return (
    <div className='w-full h-[100vh] overflow-scroll flex flex-col mt-20'>
      <header className='fixed top-0 w-full h-14 flex items-center p-4 gap-4 backdrop-blur-md'>
        <Link to={ROUTES.HOME}>
          <BiArrowBack className='text-2xl' />
        </Link>

        <div className='flex flex-col'>
          <h3 className='text-lg'>{user?.fullname}</h3>
          <p className='text-sm text-[#484848]'>{countOfPosts} posts</p>
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
          <AiOutlineCalendar /> {month} {year}
        </p>
      </div>

      {/* User posts */}
      <div className='w-full'>
        <div className='w-full h-16 flex justify-center items-center border-b border-b-[#c1c1c1] hover:bg-[#ddd] transition duration-500'>
          <h1 className='text-xl'>Posts</h1>
        </div>

        {tweets.length ? (
          tweets.map((tweet) => <Tweet key={tweet.id} {...tweet} />)
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
