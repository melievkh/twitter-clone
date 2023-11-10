import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineFileGif } from "react-icons/ai";
import { PiSmileySticker } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { GrGallery } from "react-icons/gr";

import { useAppDispatch } from "api/store";
import { AsyncThunks } from "api/store/action";
import { tweetsActions } from "api/store/reducers/slices/tweetsReducer";
import CustomButton from "components/CustomButton";

const AddTweet = () => {
  const [caption, setCaption] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleChange = (e: any) => {
    setCaption(e.target.value);
  };

  const handleAddPost = async (e: any) => {
    try {
      if (!caption) {
        e.preventDefault();
        toast.error("Please enter a caption");
        return;
      }

      await dispatch(AsyncThunks.createTweet(caption));
      toast.success("Created successfully!");
      setCaption("");
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message);
      dispatch(tweetsActions.clearError());
    }
  };
  return (
    <form
      className='w-full h-max flex flex-col items-center border-b border-b-[#484848] pl-4 pr-4 pt-4'
      onSubmit={handleAddPost}
    >
      <input
        placeholder='What is happening?!'
        className='w-full h-[120px] outline-none bg-inherit'
        value={caption}
        name='caption'
        onChange={handleChange}
        autoComplete='off'
      />
      <div className='w-full flex'>
        <div className='flex w-full gap-4 p-2'>
          <button className='w-[50px] h-[50px] hover:bg-bgHover flex justify-center items-center rounded-full'>
            <GrGallery />
          </button>
          <button className='w-[50px] h-[50px] hover:bg-bgHover flex justify-center items-center rounded-full'>
            <AiOutlineFileGif />
          </button>
          <button className='w-[50px] h-[50px] hover:bg-bgHover flex justify-center items-center rounded-full'>
            <PiSmileySticker />
          </button>
          <button className='w-[50px] h-[50px] hover:bg-bgHover flex justify-center items-center rounded-full'>
            <CiLocationOn />
          </button>
        </div>
        <CustomButton className='h-10 bg-[#4043d9] border-none'>
          post
        </CustomButton>
      </div>
    </form>
  );
};

export default AddTweet;
