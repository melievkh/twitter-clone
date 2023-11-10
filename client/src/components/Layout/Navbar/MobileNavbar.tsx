import { Link } from "react-router-dom";

import { navList } from "helpers/navList";
import { AddTweetModal } from "modal/AddTwitModal";

const MobileNavbar = () => {
  return (
    <div className='w-full h-[50px] flex items-center sm:p-2 p-0 bg-[#e9e9e9] transition duration-300'>
      <ul className='w-full h-auto flex items-center justify-around sm:mt-2 mt-0'>
        {navList.map((item) => (
          <Link to={item.url} key={item.id}>
            <button className='sm:w-12 w-8 sm:h-12 h-8 hover:bg-[#ddd] flex justify-center items-center rounded-full'>
              <item.icon className='sm:text-3xl text-xl text-[#1e1e1e]' />
            </button>
          </Link>
        ))}
        <li>
          <AddTweetModal />
        </li>
      </ul>
    </div>
  );
};

export default MobileNavbar;
