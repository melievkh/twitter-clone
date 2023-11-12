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
import {
  messageActions,
  messageReducer,
} from "api/store/reducers/slices/messageSlice";

const ChatRoom = () => {
  const messages: IMessageProps[] = useSelector(getMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const { userId: recipientId }: any = useParams();
  const recipientUser = useSelector(getUserById);
  const senderId = useSelector(getUserId);
  const dispatch = useAppDispatch();

  // connect to socket
  const socket = useSocketSetUp();
  const messageListRef = useRef<HTMLDivElement>(null);
  const messageBottomRef = useRef<HTMLDivElement>(null);

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
      // dispatch(messageActions.addMessage(messageData));
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
    if (messageBottomRef.current) {
      messageBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className='w-full h-full flex flex-col bg-bgColor'>
      <ChatHeader recipientUser={recipientUser} />

      <div
        ref={messageListRef}
        className='w-full flex-1 overflow-y-scroll sm:mt-0 mt-12'
      >
        <ul className='p-2 h-fit'>
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              recipientId={recipientId}
            />
          ))}
          <div ref={messageBottomRef} />
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
