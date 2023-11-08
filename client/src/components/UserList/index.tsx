import { FaUser } from "react-icons/fa6";

import CustomButton from "components/CustomButton";

const UserList = (props: any) => {
  const { username, fullname } = props;
  return (
    <div className='w-full h-fit flex justify-center items-center rounded-xl hover:bg-[#e5e5e5] transition duration-300 p-2 cursor-pointer'>
      <div className='w-[20%] flex justify-center items-center'>
        <div className='w-12 h-12 rounded-full flex justify-center items-center'>
          <FaUser />
        </div>
      </div>
      <div className='w-[60%] h-full flex flex-col'>
        <h1 className='text-md'>{fullname}</h1>
        <h3 className='text-md text-[#8b8b8b]'>@{username}</h3>
      </div>
      <CustomButton className='text-sm'>follow</CustomButton>
    </div>
  );
};

export default UserList;
