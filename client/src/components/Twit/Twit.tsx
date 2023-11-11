import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { BiRepost } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { CiViewBoard } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegComment, FaRegHeart, FaUser } from "react-icons/fa6";

import { getFormattedDateWithDay } from "utils/date";
import { getUserId } from "api/store/selectors";
import { AsyncThunks } from "api/store/action";
import { useAppDispatch } from "api/store";
import ITweetProps from "types";
import styles from "./style";

interface Props {
  tweet: ITweetProps;
}

const Tweet = ({ tweet }: Props) => {
  const dispatch = useAppDispatch();
  const userId = useSelector(getUserId);

  const handleDelete = async (id: any) => {
    await dispatch(AsyncThunks.deleteTweet(id));
    toast.success("Deleted successfully!");
  };

  return (
    <div className='w-full h-fit flex justify-center p-4 hover:bg-bgHover transition duration-300'>
      <div className='w-auto sm:flex hidden justify-center p-4'>
        <div className='w-12 h-12 rounded-full flex justify-center items-center border border-borderColor'>
          <FaUser size={28} />
        </div>
      </div>
      <div className='sm:w-[90%] w-full flex flex-col sm:gap-2 gap-1'>
        <div className='w-full flex gap-2 items-center'>
          <div className='sm:hidden flex w-5 h-5 rounded-full justify-center items-center border border-borderColor'>
            <FaUser className='text-sm' />
          </div>
          <h1>{tweet.fullname}</h1>
          <span>-</span>
          <h2 className='text-sm'>
            {getFormattedDateWithDay(tweet.created_at)}
          </h2>
          {tweet.user_id === userId && (
            <button
              className='w-[40px] h-[40px] hover:bg-deleteBgColor flex justify-center items-center rounded-full transition duration-300'
              onClick={() => handleDelete(tweet.id)}
            >
              <AiOutlineDelete className='text-sm text-deleteColor' />
            </button>
          )}
        </div>

        <div className='w-full'>
          <p className='text-sm'>{tweet.caption}</p>
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
