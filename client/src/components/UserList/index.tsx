import { FaUser } from "react-icons/fa6";

import CustomButton from "components/CustomButton";

const UserList = ({ user }: any) => {
  console.log(user);
  return (
    <div className='w-full h-fit flex justify-center items-center rounded-xl hover:bg-bgHover transition duration-300 p-2 cursor-pointer'>
      <div className='w-[20%] flex justify-center items-center'>
        <div className='w-12 h-12 rounded-full flex justify-center items-center'>
          <FaUser />
        </div>
      </div>
      <div className='w-[60%] h-full flex flex-col'>
        <h1 className='text-md'>{user?.fullname}</h1>
        <h3 className='text-md text-[#929292]'>@{user?.username}</h3>
      </div>
      <CustomButton className='text-sm'>follow</CustomButton>
    </div>
  );
};

export default UserList;
