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
      <div className='bg-bgHover p-2 rounded-md'>
        <div className='font-bold text-sm'>{fullname}</div>
        <div className='text-xs'>{messageContent}</div>
        <div className='text-[8px] text-[#c1c1c1] text-right'>
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
