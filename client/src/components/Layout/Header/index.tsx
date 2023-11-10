const Header = () => {
  return (
    <div className='top-0 w-full h-[60px] bg-none flex text-[#242424] backdrop-blur-md'>
      <div className='w-[50%] flex justify-center items-center hover:bg-[#ddd] transition duration-300 cursor-pointer'>
        <h1>For You</h1>
      </div>
      <div className='w-[50%] flex justify-center items-center hover:bg-[#ddd] transition duration-300 cursor-pointer'>
        <h1>Following</h1>
      </div>
    </div>
  );
};

export default Header;
