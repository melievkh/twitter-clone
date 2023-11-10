import { useSelector } from "react-redux";
import { FaRegComment, FaRegHeart, FaUser } from "react-icons/fa6";
import { toast } from "react-toastify";
import { BiRepost } from "react-icons/bi";
import { CiViewBoard } from "react-icons/ci";
import { BsBookmark } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

import ITweetProps from "types";
import styles from "./style";
import { getFormattedDateWithDay } from "utils/date";
import { useAppDispatch } from "api/store";
import { AsyncThunks } from "api/store/action";
import { getUserId } from "api/store/selectors";

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
        <div className='w-12 h-12 rounded-full flex justify-center items-center hover:bg-bgHover transition duration-300'>
          <FaUser size={28} className='text-[#848484]' />
        </div>
      </div>
      <div className='sm:w-[90%] w-full flex flex-col sm:gap-2 gap-1'>
        <div className='w-full flex gap-2 items-center'>
          <div className='sm:hidden flex w-5 h-5 rounded-full justify-center items-center'>
            <FaUser className='text-sm' />
          </div>
          <h1>{tweet.fullname}</h1>
          <span>-</span>
          <h2 className='text-sm'>
            {getFormattedDateWithDay(tweet.created_at)}
          </h2>
          {tweet.user_id === userId && (
            <button
              className='w-[40px] h-[40px] hover:bg-[#232323] flex justify-center items-center rounded-full transition duration-300'
              onClick={() => handleDelete(tweet.id)}
            >
              <AiFillDelete className='text-sm text-deleteColor' />
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
