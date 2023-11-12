import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { getMessages, getUserById, getUserId } from "api/store/selectors";
import SendMessageForm from "./SendMessageForm/SendMessageForm";
import useSocketSetUp from "hooks/useSocketConnect";
import Message from "components/Message/Message";
import ChatHeader from "./ChatHeader/ChatHeader";
import { AsyncThunks } from "api/store/action";
import { useAppDispatch } from "api/store";
import { IMessageProps } from "types";

const ChatRoom = () => {
  const messages: IMessageProps[] = useSelector(getMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const { userId: recipientId }: any = useParams();
  const recipientUser = useSelector(getUserById);
  const senderId = useSelector(getUserId);
  const dispatch = useAppDispatch();

  // connect to socket
  const socket = useSocketSetUp();
  const messageListRef = useRef<any>(null);

  const fetchRecipientUserDetails = async () => {
    await dispatch(AsyncThunks.getUser(recipientId));
  };
  const fetchMessages = async () => {
    await dispatch(AsyncThunks.getMessages(recipientId));
  };

  const sendMessage = (e: any) => {
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

  useEffect(() => {
    fetchRecipientUserDetails();
    fetchMessages();
  }, [socket, recipientId]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='w-full h-full flex flex-col bg-bgColor'>
      <ChatHeader recipientUser={recipientUser} />

      <div className='w-full h-fit overflow-scroll sm:mt-0 mt-12 mb-14'>
        <ul className='p-2 h-fit'>
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              recipientId={recipientId}
            />
          ))}
        </ul>
      </div>

      <SendMessageForm
        sendMessage={sendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </div>
  );
};

export default ChatRoom;
