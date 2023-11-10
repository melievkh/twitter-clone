// Message.tsx
import React from "react";

interface MessageProps {
  message: {
    senderId: string;
    fullname: string | undefined;
    message: string;
    created_at: string;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { message: messageContent, created_at, fullname } = message;

  return (
    <li className='flex items-end mb-2'>
      <div className='flex-shrink-0 w-8 h-8 mr-2 rounded-full bg-[#545bc1]'></div>
      <div className='bg-gray-100 p-2 rounded-md'>
        <div className='font-bold text-gray-800'>{fullname}</div>
        <div className='text-gray-600'>{messageContent}</div>
        <div className='text-xs text-gray-500'>
          {new Date(created_at).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
      </div>
    </li>
  );
};

export default Message;
