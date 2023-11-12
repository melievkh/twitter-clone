import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { UserType } from "types";

const ChatHeader = ({ recipientUser }: { recipientUser: UserType | null }) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default ChatHeader;
