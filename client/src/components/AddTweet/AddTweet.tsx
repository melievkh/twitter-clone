import { useState } from "react";
import { toast } from "react-toastify";
import { TfiGallery } from "react-icons/tfi";
import { CiLocationOn } from "react-icons/ci";
import { PiSmileySticker } from "react-icons/pi";
import { AiOutlineFileGif } from "react-icons/ai";

import { tweetsActions } from "api/store/reducers/slices/tweetsReducer";
import CustomButton from "components/CustomButton";
import { AsyncThunks } from "api/store/action";
import { useAppDispatch } from "api/store";

const AddTweet = () => {
  const [caption, setCaption] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleChange = (e: any) => {
    setCaption(e.target.value);
  };

  const handleAddPost = async (e: any) => {
    try {
      e.preventDefault();
      if (!caption) {
        toast.error("Please enter a caption");
        return;
      }

      await dispatch(AsyncThunks.createTweet(caption));
      toast.success("Created successfully!");
      setCaption("");
    } catch (error: any) {
      toast.error(error.message);
      dispatch(tweetsActions.clearError());
    }
  };
  return (
    <div className='w-full h-max flex flex-col items-center border-b border-b-[#484848] pl-4 pr-4'>
      <input
        placeholder='What is happening?!'
        className='w-full h-[120px] outline-none bg-inherit'
        value={caption}
        name='caption'
        onChange={handleChange}
        autoComplete='off'
      />
      <div className='w-full flex items-center'>
        <div className='flex w-full gap-4 p-2'>
          <button className='w-[40px] h-[40px] hover:bg-bgHover text-[#4a4deb] text-xl flex justify-center items-center rounded-full'>
            <TfiGallery />
          </button>
          <button className='w-[40px] h-[40px] hover:bg-bgHover text-[#4a4deb] text-xl flex justify-center items-center rounded-full'>
            <AiOutlineFileGif />
          </button>
          <button className='w-[40px] h-[40px] hover:bg-bgHover text-[#4a4deb] text-xl flex justify-center items-center rounded-full'>
            <PiSmileySticker />
          </button>
          <button className='w-[40px] h-[40px] hover:bg-bgHover text-[#4a4deb] text-xl flex justify-center items-center rounded-full'>
            <CiLocationOn />
          </button>
        </div>
        <CustomButton
          className='h-8 bg-[#4043d9] hover:bg-[#5456d7] hover:text-[#ddd] border-none transition duration-300'
          onclick={handleAddPost}
        >
          post
        </CustomButton>
      </div>
    </div>
  );
};

export default AddTweet;
