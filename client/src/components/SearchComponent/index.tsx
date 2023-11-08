import { HiOutlineSearch } from "react-icons/hi";

import CustomButton from "components/CustomButton";
import Footer from "components/Layout/Footer";
import useGetUsers from "hooks/useGetUsers";
import UserList from "components/UserList";
import { Link } from "react-router-dom";

const SearchComponent = () => {
  const users = useGetUsers();
  const filteredUsers = users.slice(0, 6);

  return (
    <div className='w-full relative overflow-scroll pl-8 h-full border-l border-l-[#b4b4b4]'>
      <header className='w-full h-16 flex items-center'>
        <HiOutlineSearch className='absolute ml-4 text-[#5a5a5a]' />
        <input
          type='search'
          placeholder='search...'
          className='w-[80%] h-[40px] p-2 outline-none border border-[#bcbcbc] bg-inherit rounded-[50px] indent-8'
        />
      </header>

      <div className='w-full flex flex-col gap-6'>
        <div className='w-[80%] bg-[#dcdcdc] p-3 flex flex-col gap-2 rounded-2xl'>
          <h1 className='text-2xl'>Subscribe to Premium</h1>
          <p>
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </p>
          <CustomButton>Subscribe</CustomButton>
        </div>

        <div className='w-[80%] bg-[#dcdcdc] p-3 flex flex-col gap-2 rounded-2xl'>
          <h1 className='text-2xl'>Who to follow</h1>
          <ul>
            {filteredUsers.map((user) => (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>
                  <UserList key={user.id} {...user} />
                </Link>
              </li>
            ))}
          </ul>

          <CustomButton className='w-[30%] h-[30px] text-xs'>
            show more
          </CustomButton>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default SearchComponent;
