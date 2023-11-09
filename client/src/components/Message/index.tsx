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
      <div className='bg-gray-100 p-2 rounded-md'>
        <div className='font-bold text-gray-800'>{senderId}</div>
        <div className='text-gray-600'>{messageContent}</div>
        <div className='text-xs text-gray-500'>
          {new Date(created_at).toLocaleTimeString()}
        </div>
      </div>
    </li>
  );
};

export default Message;
