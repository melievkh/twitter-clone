import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "api/store";
import { AsyncThunks } from "api/store/action";
import { getTweets } from "api/store/selectors";

const useGetTweets = () => {
  const tweets = useSelector(getTweets);
  const dispatch = useAppDispatch();

  const fetchUsersQuery = useCallback(async () => {
    await dispatch(AsyncThunks.getTweets());
  }, [dispatch]);

  useEffect(() => {
    fetchUsersQuery();
  }, [fetchUsersQuery]);

  return tweets;
};

export default useGetTweets;
