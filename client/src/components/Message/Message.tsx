import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "api/store";
import { AsyncThunks } from "api/store/action";
import { getUser, getUserById, getUserId } from "api/store/selectors";
import { IMessageType } from "types";

const Message = (message: IMessageType) => {
  const {
    sender_id,
    message: messageContent,
    timestamp,
    recipient_id,
  } = message;
  const dispatch = useAppDispatch();
  const senderUser = useSelector(getUser);
  const senderUserId = useSelector(getUserId);
  const recipicentUser = useSelector(getUserById);

  const fetchSenderUserDetails = () => {
    dispatch(AsyncThunks.getUser(senderUserId));
  };

  useEffect(() => {
    fetchSenderUserDetails();
  }, []);

  return (
    <li className='mb-2 h-fit flex items-end justify-start gap-1'>
      <div className='flex-shrink-0 w-8 h-8 ml-2 rounded-full bg-[#545bc1]'></div>

      <div className='bg-bgHover p-2 rounded-md min-w-[60px] h-auto'>
        <h1 className='font-bold text-sm'>{sender_id}</h1>
        <p className='text-xs'>{messageContent}</p>
        <div className='text-[8px] text-[#c1c1c1] text-right'>
          {new Date(timestamp).toLocaleTimeString(undefined, {
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
