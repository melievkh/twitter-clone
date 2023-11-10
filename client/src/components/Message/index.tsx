// Message.tsx
import React from "react";

interface MessageProps {
  message: {
    senderId: string;
    message: string;
    created_at: string;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { senderId, message: messageContent, created_at } = message;

  return (
    <li className='flex items-end mb-2'>
      <div className='flex-shrink-0 w-8 h-8 mr-2 rounded-full bg-[#545bc1]'></div>
      <div className='bg-bgHover p-2 rounded-md'>
        <h1 className='font-bold'>{senderId}</h1>
        <h2>{messageContent}</h2>
        <p className='text-xs text-[#acacac]'>
          {new Date(created_at).toLocaleTimeString()}
        </p>
      </div>
    </li>
  );
};

export default Message;
