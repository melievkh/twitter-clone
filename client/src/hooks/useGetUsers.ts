import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "api/store";
import { AsyncThunks } from "api/store/action";
import { getUsers } from "api/store/selectors";

const useGetUsers = () => {
  const users = useSelector(getUsers);
  const dispatch = useAppDispatch();

  const fetchUsersQuery = useCallback(async () => {
    await dispatch(AsyncThunks.getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    fetchUsersQuery();
  }, [fetchUsersQuery]);

  return users;
};

export default useGetUsers;
