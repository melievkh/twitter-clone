import { Link, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";

import { navList } from "helpers/navList";
import ROUTES from "router/routes";
import useAuth from "hooks/useAuth";

const Navbar = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logoutUser();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className='w-full h-[100vh] overflow-scroll flex sm:flex-col flex-row items-end justify-between p-2 border-r border-r-borderColor transition duration-300'>
      <ul className='flex flex-col gap-4 items-end mt-2 p-2'>
        <li>
          <Link
            to={ROUTES.HOME}
            className='text-2xl font-sans font-extrabold bg-gradient-to-r from-cyan-400 to-red-500 bg-clip-text text-transparent'
          >
            Tweetto
          </Link>
        </li>

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
          className='flex justify-center items-center gap-2 font-sans text-md text-deleteColor hover:bg-deleteBgColor rounded-xl p-2 transition duration-300'
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
