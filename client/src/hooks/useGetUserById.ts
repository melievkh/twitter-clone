import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import { getUser } from "api/store/selectors";
import { AsyncThunks } from "api/store/action";
import { useAppDispatch } from "api/store";
import { UserType } from "types";

const useGetUserById = (userId: any) => {
  const user: UserType | null = useSelector(getUser);
  const dispatch = useAppDispatch();

  const fetchUserDetails = useCallback(async () => {
    await dispatch(AsyncThunks.getUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return user;
};

export default useGetUserById;
