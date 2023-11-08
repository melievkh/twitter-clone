import SearchComponent from "components/SearchComponent";
import Navbar from "./Navbar";
import MobileNavbar from "./Navbar/MobileNavbar";

const Layout = ({ children }: any) => {
  return (
    <div className='w-full h-[100vh] sm:flex flex-row text-[#272727]'>
      <div className='w-[15%] sm:flex hidden shadow-xl'>
        <Navbar />
      </div>

      <div className='fixed w-full sm:hidden flex bottom-0'>
        <MobileNavbar />
      </div>

      <div className='sm:w-[85%] w-full flex'>
        <div className='sm:w-[60%] w-full overflow-y-scroll overflow-hidden flex flex-col bg-[#e9e9e9]'>
          {children}
        </div>

        {/* Search Component */}
        <div className='w-[40%] sm:flex hidden bg-[#e9e9e9]'>
          <SearchComponent />
        </div>
      </div>
    </div>
  );
};

export default Layout;
