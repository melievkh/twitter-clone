import { HiOutlineSearch } from "react-icons/hi";

const SearchPage = () => {
  return (
    <div className='w-full'>
      <div className='w-full p-10 h-16 flex items-center shadow-sm'>
        <HiOutlineSearch className='absolute ml-4 text-[#5a5a5a]' />
        <input
          type='search'
          placeholder='search for friends...'
          className='w-full h-[40px] p-2 outline-none border border-[#bcbcbc] bg-inherit rounded-[50px] indent-8'
        />
      </div>

      <div className='w-full flex flex-col items-center p-10'>
        <h1 className='text-xl text-[#575757]'>Nothing Found!</h1>
      </div>
    </div>
  );
};

export default SearchPage;
