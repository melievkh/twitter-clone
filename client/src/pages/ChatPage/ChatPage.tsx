import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import UserList from "components/UserList/UserList";
import Footer from "components/Layout/Footer";
import { getUsers } from "api/store/selectors";

const ChatPage = () => {
  const users = useSelector(getUsers);

  return (
    <div className='w-full'>
      <div className='w-full h-16 border-b border-b-borderColor flex items-center pl-4'>
        <h2 className='sm:text-xl text-md'>People to chat with...</h2>
      </div>

      <ul className='w-full h-max p-4 overflow-scroll  bg-bgColor'>
        <h1 className='sm:text-lg text-sm'>Suggested people</h1>
        {users?.map((user) => (
          <li key={user.id}>
            <Link to={`/chat/${user.id}`}>
              <UserList key={user.id} user={user} />
            </Link>
          </li>
        ))}
      </ul>

      <div className='w-full p-8 bg-bgColor'>
        <Footer />
      </div>
    </div>
  );
};

export default ChatPage;
