import { useState, useEffect } from "react";
import { PiSmileySticker } from "react-icons/pi";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import CustomButton from "components/CustomButton";
import useGetUserById from "hooks/useGetUserById";
import Message from "components/Message";
import { useSelector } from "react-redux";
import { getUserId } from "api/store/selectors";
import { useAppDispatch } from "api/store";
import { AsyncThunks } from "api/store/action";

interface IMessagesType {
  senderId: string;
  message: string;
  created_at: string;
}

const ChatRoom = () => {
  const { user_id } = useParams();
  const senderId = useSelector(getUserId);
  const user = useGetUserById(user_id);
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState<IMessagesType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const socket = io("http://localhost:4001");

  useEffect(() => {
    socket.on("message", (message: IMessagesType) => {});

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendPrivateMessage = () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        senderId,
        message: newMessage,
        created_at: new Date().toISOString(),
      };

      socket.emit("privateMessage", { recipientId: user_id, messageData });
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");
    }
  };

  return (
    <div className='w-full h-full flex flex-col'>
      <header className='w-full h-[10%] sm:relative fixed top-0 border-b border-b-[#ddd] flex flex-col justify-center items-center z-10'>
        <h1>{user?.fullname}</h1>
        <h2 className='text-[#555] text-sm'>@{user?.username}</h2>
      </header>

      <div className='w-full h-[80%] overflow-scroll'>
        <ul className='p-2'>
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </ul>
      </div>

      <footer className='sm:w-[50%] w-full bottom-0 fixed h-[10%] flex justify-center items-center gap-2 z-10'>
        <input
          type='text'
          placeholder='type your message...'
          className='w-[70%] h-10 text-sm indent-2 rounded-2xl border outline-none'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <button className='w-[40px] h-[40px] hover:bg-[#ddd] flex justify-center items-center rounded-full'>
          <PiSmileySticker className='text-2xl' />
        </button>

        <CustomButton
          className='bg-[#4251d4] text-[#e5e5e5] hover:text-[#b4b4b4]'
          onclick={sendPrivateMessage}
        >
          Send
        </CustomButton>
      </footer>
    </div>
  );
};

export default ChatRoom;
