import { Link } from "react-router-dom";
import { SiGravatar } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

import { navList } from "helpers/navList";
import ROUTES from "router/routes";
import { AddTweetModal } from "modal/AddTwitModal";

const Navbar = () => {
  return (
    <div className='w-full h-[100vh] overflow-scroll flex sm:flex-col flex-row items-end p-2 bg-[#e9e9e9] border-r border-r-[#ddd] transition duration-300'>
      <ul className='flex flex-col gap-4 items-center mt-2'>
        <Link
          to={ROUTES.HOME}
          className='w-[50px] h-[50px] hover:bg-[#ddd] flex justify-center items-center rounded-full'
        >
          <FaXTwitter className='text-3xl text-[#1e1e1e]' />
        </Link>

        {navList.map((item) => (
          <Link to={item.url} key={item.id}>
            <button className='w-[50px] h-[50px] hover:bg-[#ddd] flex justify-center items-center rounded-full'>
              <item.icon className='text-3xl text-[#1e1e1e]' />
            </button>
          </Link>
        ))}
        <AddTweetModal />
        <button className='w-[60px] h-[60px] mt-12 flex justify-center items-center rounded-full'>
          <SiGravatar style={{ fontSize: 40 }} />
        </button>
      </ul>
    </div>
  );
};

export default Navbar;
