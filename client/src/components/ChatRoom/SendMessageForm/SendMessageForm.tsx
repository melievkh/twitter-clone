import { debounce } from "lodash";
import { PiSmileySticker } from "react-icons/pi";

import CustomButton from "components/CustomButton";

const SendMessageForm = ({
  sendMessage,
  newMessage,
  setNewMessage,
}: {
  sendMessage: any;
  newMessage: string;
  setNewMessage: any;
}) => {
  const debouncedSendPrivateMessage = debounce(sendMessage, 300);

  return (
    <form
      className='sm:w-[50%] w-full h-[12%] bg-bgColor bottom-0 fixed flex justify-center items-center gap-2 z-10 border-t border-t-borderColor'
      onSubmit={sendMessage}
    >
      <input
        type='text'
        placeholder='type your message...'
        className='w-[70%] h-10 text-sm indent-2 rounded-2xl border border-borderColor outline-none bg-inherit'
        value={newMessage}
        onChange={(e: any) => setNewMessage(e.target.value)}
        onBlur={debouncedSendPrivateMessage}
      />

      <button className='w-[40px] h-[40px] hover:bg-bgHover flex justify-center items-center rounded-full transition duration-300'>
        <PiSmileySticker className='text-2xl' />
      </button>

      <CustomButton className='bg-[#3965ab] border-none hover:text-[#9f9f9f]'>
        Send
      </CustomButton>
    </form>
  );
};

export default SendMessageForm;
