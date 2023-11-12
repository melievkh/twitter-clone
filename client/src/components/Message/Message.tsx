import { IMessageProps, UserType } from "types";

const Message = ({
  message,
  recipientId,
}: {
  message: IMessageProps;
  recipientId?: string;
}) => {
  const { message: messageContent, sender_id } = message;
  return (
    <>
      {sender_id === recipientId ? (
        <li className='mb-2 h-fit flex items-end justify-start gap-1'>
          <div className='flex-shrink-0 w-8 h-8 ml-2 rounded-full bg-[#954cf6]'></div>

          <div className='bg-bgHover p-2 rounded-md min-w-[100px] h-auto'>
            <p className='text-xs'>{messageContent}</p>
            <div className='text-[8px] text-[#c1c1c1] text-right'>
              {new Date(message.timestamp).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </div>
          </div>
        </li>
      ) : (
        <li className='mb-2 h-fit flex items-end justify-end gap-1'>
          <div className='bg-bgHover p-2 rounded-md min-w-[80px] h-auto'>
            <p className='text-xs'>{messageContent}</p>
            <div className='text-[8px] text-[#c1c1c1] text-right'>
              {new Date(message.timestamp).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </div>
          </div>

          <div className='flex-shrink-0 w-8 h-8 ml-2 rounded-full bg-[#99d63c]'></div>
        </li>
      )}
    </>
  );
};

export default Message;
