import { Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";

import { navList } from "helpers/navList";
import ROUTES from "router/routes";
import useAuth from "hooks/useAuth";

const Navbar = () => {
  const { logoutUser } = useAuth();

  const handleLogOut = async () => {
    await logoutUser();
  };

  return (
    <div className='w-full h-[100vh] overflow-scroll flex sm:flex-col flex-row items-end justify-between p-2 border-r border-r-borderColor transition duration-300'>
      <ul className='flex flex-col gap-4 items-center mt-2'>
        <Link
          to={ROUTES.HOME}
          className='w-[50px] h-[50px] hover:bg-bgHover flex justify-center items-center rounded-full transition duration-300'
        >
          <FaXTwitter className='text-3xl' />
        </Link>

        {navList.map((item) => (
          <Link to={item.url} key={item.id}>
            <button className='w-[50px] h-[50px] focus:bg-bgHover hover:bg-bgHover flex justify-center items-center rounded-full transition duration-300'>
              <item.icon className='text-2xl' />
            </button>
          </Link>
        ))}
      </ul>
      <div className='w-full flex justify-end mb-6'>
        <button
          className='flex justify-center items-center gap-2 text-md text-[#a14a4a] hover:bg-deleteBgColor rounded-xl p-2 transition duration-300'
          onClick={handleLogOut}
        >
          logout
          <LuLogOut className='text-xl' />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
