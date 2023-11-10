import { Link } from "react-router-dom";

import { navList } from "helpers/navList";

const MobileNavbar = () => {
  return (
    <div className='w-full h-[50px] flex items-center sm:p-2 p-0 transition duration-300 bg-black'>
      <ul className='w-full h-auto flex items-center justify-around mt-2'>
        {navList.map((item) => (
          <Link to={item.url} key={item.id}>
            <button className='w-12 h-12 flex justify-center focus:bg-[#202020] items-center rounded-full'>
              <item.icon className='sm:text-3xl text-xl' />
            </button>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MobileNavbar;
