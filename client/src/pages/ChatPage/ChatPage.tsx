import { getUsers } from "api/store/selectors";
import Footer from "components/Layout/Footer";
import UserList from "components/UserList";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ChatPage = () => {
  const users = useSelector(getUsers);
  return (
    <div className='w-full'>
      <div className='w-full h-16 border-b border-b-[#ddd] flex items-center pl-4'>
        <h2 className='text-xl'>People to chat with...</h2>
      </div>

      <ul className='w-full h-max p-4 overflow-scroll'>
        <h1>Suggested people</h1>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/chat/${user.id}`}>
              <UserList key={user.id} {...user} />
            </Link>
          </li>
        ))}
      </ul>

      <div className='w-full p-8'>
        <Footer />
      </div>
    </div>
  );
};

export default ChatPage;
