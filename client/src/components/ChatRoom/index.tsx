import { useState, useEffect } from "react";
import { PiSmileySticker } from "react-icons/pi";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import CustomButton from "components/CustomButton";
import useGetUserById from "hooks/useGetUserById";
import Message from "components/Message";
import { useSelector } from "react-redux";
import { getUserId } from "api/store/selectors";

interface IMessagesType {
  senderId: string;
  message: string;
  created_at: string;
}

const ChatRoom = () => {
  const { user_id } = useParams();
  const senderId = useSelector(getUserId);
  const user = useGetUserById(user_id);
  const [messages, setMessages] = useState<IMessagesType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const socket = io("http://localhost:4001");

  useEffect(() => {
    socket.on("message", (message: IMessagesType) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

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
    <div className='w-full h-[100%] flex flex-col justify-between'>
      <header className='w-full h-[10%] border-b border-b-[#ddd]  flex flex-col justify-center items-center top-0'>
        <h1>{user?.fullname}</h1>
        <h2 className='text-[#555] text-sm'>@{user?.username}</h2>
      </header>

      <ul className='p-2'>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </ul>

      <footer className='w-full h-[10%] border-t border-t-[#c2c2c2] flex justify-center items-center gap-2'>
        <input
          type='text'
          placeholder='type your message...'
          className='w-[70%] h-10 text-sm indent-2 rounded-2xl border focus:border-[#acb3f0] outline-none'
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
