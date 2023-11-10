import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";

import { navList } from "helpers/navList";
import ROUTES from "router/routes";

const Navbar = () => {
  return (
    <div className='w-full h-[100vh] overflow-scroll flex sm:flex-col flex-row items-end p-2 border-r border-r-borderColor transition duration-300'>
      <ul className='flex flex-col gap-4 items-center mt-2'>
        <Link
          to={ROUTES.HOME}
          className='w-[50px] h-[50px] hover:bg-bgHover flex justify-center items-center rounded-full'
        >
          <FaXTwitter className='text-3xl' />
        </Link>

        {navList.map((item) => (
          <Link to={item.url} key={item.id}>
            <button className='w-[50px] h-[50px] hover:bg-bgHover flex justify-center items-center rounded-full'>
              <item.icon className='text-3xl' />
            </button>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
