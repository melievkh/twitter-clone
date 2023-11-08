import { useState } from "react";
import { toast } from "react-toastify";
import { FaX } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineFileGif } from "react-icons/ai";
import { PiSmileySticker } from "react-icons/pi";
import { IoIosAdd } from "react-icons/io";
import { GrGallery } from "react-icons/gr";

import CustomButton from "components/CustomButton";
import { AsyncThunks } from "api/store/action";
import { useAppDispatch } from "api/store";
import { useSelector } from "react-redux";
import { getTweetError } from "api/store/selectors";
import { tweetsActions } from "api/store/reducers/slices/tweetsReducer";

export const AddTweetModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>("");
  const dispatch = useAppDispatch();
  const tweetError = useSelector(getTweetError);
  console.log(tweetError);

  const handleChange = (e: any) => {
    setCaption(e.target.value);
  };

  const handleAddPost = async (e: any) => {
    e.preventDefault();
    if (tweetError) {
      toast.error(tweetError?.message);
      dispatch(tweetsActions.clearError());
    } else {
      await dispatch(AsyncThunks.createTweet(caption));
      toast.success("Created successfully!");
      setCaption("");
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className='sm:w-12 w-8 sm:h-12 h-8 hover:bg-[#ddd] flex justify-center items-center rounded-full'
      >
        <IoIosAdd className='sm:text-3xl text-2xl text-[#1e1e1e] border border-[#616161] rounded-full' />
      </button>
      {showModal ? (
        <>
          <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto h-auto my-6 mx-auto max-w-3xl'>
              <form
                onSubmit={handleAddPost}
                className='rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'
              >
                <div className='flex items-start justify-between p-3'>
                  <button
                    className='bg-transparent float-right'
                    onClick={() => setShowModal(false)}
                  >
                    <FaX color='blue' />
                  </button>
                </div>
                <div className='w-[380px] h-max p-4 text-black'>
                  <textarea
                    placeholder='What is happening?!'
                    className='w-full h-[120px] outline-none border-b border-b-[#ddd]'
                    value={caption}
                    onChange={handleChange}
                  ></textarea>
                  <div className='flex items-center'>
                    <div className='flex w-full gap-4 p-2'>
                      <button className='w-[50px] h-[50px] hover:bg-[#ddd] flex justify-center items-center rounded-full'>
                        <GrGallery />
                      </button>
                      <button className='w-[50px] h-[50px] hover:bg-[#ddd] flex justify-center items-center rounded-full'>
                        <AiOutlineFileGif />
                      </button>
                      <button className='w-[50px] h-[50px] hover:bg-[#ddd] flex justify-center items-center rounded-full'>
                        <PiSmileySticker />
                      </button>
                      <button className='w-[50px] h-[50px] hover:bg-[#ddd] flex justify-center items-center rounded-full'>
                        <CiLocationOn />
                      </button>
                    </div>
                    <CustomButton className='h-10 bg-[#4043d9]'>
                      <p className='text-[#fff]'>post</p>
                    </CustomButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
