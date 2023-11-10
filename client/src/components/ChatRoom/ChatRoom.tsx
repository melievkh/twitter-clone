import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PiSmileySticker } from "react-icons/pi";

import socket from "socket";
import Message from "components/Message";
import CustomButton from "components/CustomButton";
import useSocketSetup from "hooks/useSocketSetup";
import { getUserById, getUserId } from "api/store/selectors";
import { AsyncThunks } from "api/store/action";
import { useAppDispatch } from "api/store";

interface IMessagesType {
  senderId: string;
  fullname: string | undefined;
  message: string;
  created_at: string;
}

const ChatRoom = () => {
  const { user_id }: any = useParams();
  const senderId = useSelector(getUserId);
  const user = useSelector(getUserById);
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState<IMessagesType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const fetchUserDetails = async () => {
    await dispatch(AsyncThunks.getUser(user_id));
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useSocketSetup();

  const sendPrivateMessage = () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        senderId,
        fullname: user?.fullname,
        message: newMessage,
        created_at: new Date().toISOString(),
      };

      socket.emit("sendMessage", { recipientId: user_id, messageData });
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");
    }
  };

  return (
    <div className='w-full h-full flex flex-col'>
      <header className='w-full h-[10%] sm:relative fixed top-0 border-b border-b-borderColor flex flex-col justify-center items-center z-10'>
        <h1>{user?.fullname}</h1>
        <h2 className='text-[#555] text-sm'>{user?.username}</h2>
      </header>
      <div className='w-full h-[80%] overflow-scroll'>
        <ul className='p-2'>
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </ul>
      </div>

      <footer className='sm:w-[50%] w-full bottom-0 fixed h-[12%] flex justify-center items-center gap-2 z-10 border-t border-t-borderColor'>
        <input
          type='text'
          placeholder='type your message...'
          className='w-[70%] h-10 text-sm indent-2 rounded-2xl border border-borderColor outline-none bg-inherit'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <button className='w-[40px] h-[40px] hover:bg-bgHover flex justify-center items-center rounded-full transition duration-300'>
          <PiSmileySticker className='text-2xl' />
        </button>

        <CustomButton
          className='bg-[#3965ab] border-none hover:text-[#9f9f9f]'
          onclick={sendPrivateMessage}
        >
          Send
        </CustomButton>
      </footer>
    </div>
  );
};

export default ChatRoom;
