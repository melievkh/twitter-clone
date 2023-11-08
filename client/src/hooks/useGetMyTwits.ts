import ITweetProps from "types";
import useGetTweets from "./useGetTwits";

const useGetMyTweets = (userId: any) => {
  const tweets = useGetTweets();

  const myTweets = tweets.filter(
    (tweet: ITweetProps) => tweet.user_id === userId,
  );

  return myTweets;
};

export default useGetMyTweets;
