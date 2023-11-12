import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { PiSmileySticker } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";

import { getUserById, getUserId } from "api/store/selectors";
import CustomButton from "components/CustomButton";
import Message from "components/Message/Message";
import { AsyncThunks } from "api/store/action";
import { useAppDispatch } from "api/store";
import { IMessageType } from "types";
import socket from "socket";

const ChatRoom = () => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessageType[]>([]);
  const { userId: recipientId }: any = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const senderId = useSelector(getUserId);
  const recipientUser = useSelector(getUserById);

  const fetchRecipientUserDetails = async () => {
    await dispatch(AsyncThunks.getUser(recipientId));
  };

  useEffect(() => {
    fetchRecipientUserDetails();
  }, []);

  // Connect to socket and get stored messages
  useEffect(() => {
    socket.connect();

    const handleConnect = () => {
      console.log(socket.connected);
    };

    const handleStoredMessages = (storedMessages: IMessageType[]) => {
      console.log("Received stored messages:", storedMessages);
      setMessages(storedMessages);
    };

    socket.on("connect", handleConnect);
    socket.on("storedMessages", handleStoredMessages);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("storedMessages", handleStoredMessages);
      socket.disconnect();
    };
  }, []);

  // Join room

  useEffect(() => {
    socket.emit("joinRoom", recipientId);

    return () => {};
  }, []);

  useEffect(() => {
    console.log(messages, "messages");
  }, [messages]);

  const sendPrivateMessage = (e: any) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      const messageData = {
        sender_id: senderId,
        recipient_id: recipientId,
        message: newMessage,
      };
      socket.emit("sendMessage", messageData);
      setNewMessage("");
    }
  };

  const debouncedSendPrivateMessage = debounce(sendPrivateMessage, 300);

  return (
    <div className='w-full h-full flex flex-col bg-bgColor'>
      <header className='w-full h-[10%] sm:relative fixed top-0 border-b border-b-borderColor backdrop-blur-lg flex flex-col justify-center items-center z-10'>
        <button
          className='w-[40px] h-[40px] absolute left-0 ml-3 hover:bg-bgHover flex justify-center items-center rounded-full transition duration-300'
          onClick={() => navigate(-1)}
        >
          <BiArrowBack className='text-2xl text-[#c4c4c4]' />
        </button>
        <h1>{recipientUser?.fullname}</h1>
        <h2 className='text-[#555] text-sm'>{recipientUser?.username}</h2>
      </header>

      <div className='w-full h-fit overflow-scroll sm:mt-0 mt-12 mb-14'>
        <ul className='p-2 h-fit'>
          {messages.map((message, index) => (
            <Message key={index} {...message} />
          ))}
        </ul>
      </div>

      <form
        className='sm:w-[50%] w-full h-[12%] bg-bgColor bottom-0 fixed flex justify-center items-center gap-2 z-10 border-t border-t-borderColor'
        onSubmit={sendPrivateMessage}
      >
        <input
          type='text'
          placeholder='type your message...'
          className='w-[70%] h-10 text-sm indent-2 rounded-2xl border border-borderColor outline-none bg-inherit'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onBlur={debouncedSendPrivateMessage}
        />

        <button className='w-[40px] h-[40px] hover:bg-bgHover flex justify-center items-center rounded-full transition duration-300'>
          <PiSmileySticker className='text-2xl' />
        </button>

        <CustomButton className='bg-[#3965ab] border-none hover:text-[#9f9f9f]'>
          Send
        </CustomButton>
      </form>
    </div>
  );
};

export default ChatRoom;
