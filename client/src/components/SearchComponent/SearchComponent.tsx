import { HiOutlineSearch } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Footer from "components/Layout/Footer";
import CustomButton from "components/CustomButton";
import UserList from "components/UserList/UserList";
import { getUserId, getUsers } from "api/store/selectors";

const SearchComponent = () => {
  const users = useSelector(getUsers);
  const userId = useSelector(getUserId);
  const suggestedUsers = users?.filter((user) => user.id !== userId);
  const filteredUsers = suggestedUsers.slice(0, 6);

  return (
    <div className='w-full relative overflow-scroll h-full border-l border-l-borderColor'>
      <header className='w-full h-[60px] flex items-center fixed top-0 z-10 shadow-sm backdrop-blur-md'>
        <HiOutlineSearch className='ml-4' />
        <input
          type='search'
          placeholder='search...'
          className='w-[80%] h-[40px] p-2 outline-none border-none bg-inherit rounded-[50px] indent-8'
        />
      </header>

      <div className='w-full flex flex-col gap-6 mt-16 overflow-scroll pl-8'>
        <div className='w-[80%] bg-[#0e0e12] p-3 flex flex-col gap-2 rounded-2xl'>
          <h1 className='text-2xl'>Subscribe to Premium</h1>
          <p>
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </p>
          <CustomButton>Subscribe</CustomButton>
        </div>

        <div className='w-[80%] bg-[#0e0e12] p-3 flex flex-col gap-2 rounded-2xl'>
          <h1 className='text-2xl'>Who to follow</h1>
          <ul>
            {filteredUsers.map((user) => (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>
                  <UserList key={user.id} user={user} />
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
