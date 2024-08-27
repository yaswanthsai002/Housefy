import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="flex items-center justify-between h-16 px-4">
      <Link to="/" className="lg:w-[25%]">
        <h1 className="text-2xl md:text-4xl font-nevan text-slate-800">
          Housefy
        </h1>
      </Link>
      <div className="lg:flex items-center self-center justify-between lg:w-[25%] border-slate-800 border-2 rounded-md hidden">
        <input
          type="search"
          name="searchInput"
          id="searchInput"
          className="w-[80%] p-1 text-sm bg-transparent border-none outline-none md:p-2 md:text-base font-semibold placeholder:text-slate-700 text-slate-900"
          placeholder="Explore Houses"
        />
        <button className="flex justify-center w-[20%] p-1 font-medium text-white border-none outline-none md:p-2 bg-slate-800 rounded-tr-sm rounded-br-sm">
          <IoSearch
            fill="#fff"
            className="w-4 h-4 cursor-pointer md:h-6 md:w-6"
          />
        </button>
      </div>
      <nav className="flex items-center justify-around lg:w-[25%] gap-x-4">
        <Link
          to="/"
          className="text-base font-semibold text-center transition duration-1000 ease-in-out lg:text-lg text-md hover:underline underline-offset-2"
        >
          Home
        </Link>
        <Link
          to="/explore"
          className="text-base font-semibold text-center transition duration-1000 ease-in-out lg:text-lg text-md hover:underline underline-offset-2"
        >
          Explore
        </Link>
        <Link
          to="/signin"
          className="p-1 text-center text-white transition duration-200 ease-in-out border-2 border-transparent rounded-sm lg:font-semibold lg:p-2 text-md bg-slate-800 hover:border-slate-900 hover:text-slate-900 hover:bg-transparent"
        >
          Signin / Signup
        </Link>
      </nav>
    </header>
  );
};

export default Header;
