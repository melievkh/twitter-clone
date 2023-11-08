import { FaRegComment, FaRegHeart, FaUser } from "react-icons/fa6";
import { BiRepost } from "react-icons/bi";
import { CiViewBoard } from "react-icons/ci";
import { BsBookmark } from "react-icons/bs";

import useGetUserById from "hooks/useGetUserById";
import useShowDate from "hooks/useShowDate";
import ITweetProps from "types";
import styles from "./style";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch } from "api/store";
import { AsyncThunks } from "api/store/action";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getUserId } from "api/store/selectors";

const Tweet = (props: ITweetProps) => {
  const { created_at, caption, user_id, id } = props;
  const user = useGetUserById(user_id);
  const dispatch = useAppDispatch();
  const userId = useSelector(getUserId);
  // const error = useSelector(getTweetError);

  const { month, day } = useShowDate(created_at);

  const handleDelete = async (id: any) => {
    try {
      await dispatch(AsyncThunks.deleteTweet(id));

      toast.success("Deleted successfully!");
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className='w-full h-fit flex justify-center p-4 hover:bg-[#ddd] transition duration-300'>
      <div className='w-auto sm:flex hidden justify-center p-4'>
        <div className='w-12 h-12 rounded-full flex justify-center items-center border border-[#ddd]'>
          <FaUser size={28} />
        </div>
      </div>
      <div className='sm:w-[90%] w-full flex flex-col sm:gap-2 gap-1'>
        <div className='w-full flex gap-2 items-center'>
          <div className='sm:hidden flex w-5 h-5 rounded-full justify-center items-center border border-[#ddd]'>
            <FaUser className='text-sm' />
          </div>
          <h1>{user?.fullname}</h1>
          <span>-</span>
          <h2 className='text-sm text-[#7e7e7e]'>
            {month} {day}
          </h2>
          {user_id === userId && (
            <button
              className='w-[40px] h-[40px] hover:bg-[#ddd] flex justify-center items-center rounded-full'
              onClick={() => handleDelete(id)}
            >
              <AiOutlineDelete className='text-sm text-[#ec8080]' />
            </button>
          )}
        </div>

        <div className='w-full'>
          <p className='text-sm'>{caption}</p>
        </div>

        <div className='w-full flex justify-around'>
          <div className={styles.tweetIconContainer}>
            <button className={styles.iconButton}>
              <FaRegComment className={styles.tweetIcon} />
            </button>
            <span className={styles.tweetIconText}>17k</span>
          </div>
          <div className={styles.tweetIconContainer}>
            <button className={styles.iconButton}>
              <BiRepost className={styles.tweetIcon} />
            </button>
            <span className={styles.tweetIconText}>17k</span>
          </div>
          <div className={styles.tweetIconContainer}>
            <button className={styles.iconButton}>
              <FaRegHeart className={styles.tweetIcon} />
            </button>
            <span className={styles.tweetIconText}>300k</span>
          </div>
          <div className={styles.tweetIconContainer}>
            <button className={styles.iconButton}>
              <CiViewBoard className={styles.tweetIcon} />
            </button>
            <span className={styles.tweetIconText}>17k</span>
          </div>
          <div className={styles.tweetIconContainer}>
            <button className={styles.iconButton}>
              <BsBookmark className={styles.tweetIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
