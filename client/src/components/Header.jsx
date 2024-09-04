import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { FaBars, FaX } from "react-icons/fa6";
import SearchExplorer from "@components/SearchExplorer";
import Navbar from "@components/Navbar";
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navRef = useRef(null);
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
    navRef.current.classList.toggle("scale-x-100");
  }
  return (
    <header className="z-20 sticky top-0 flex items-center justify-between md:h-20 h-16 px-4 bg-white">
      <Link to="/" className="lg:w-[25%]">
        <h1 className="text-3xl md:text-4xl font-nevan text-slate-800">
          Housefy
        </h1>
      </Link>
      <SearchExplorer />
      <Navbar navRef={navRef} />
      <button
        type="button"
        onClick={handleShowMenu}
        className="transition-all ease-in-out duration-500 flex md:hidden"
      >
        {showMenu ? (
          <FaX className="w-6 h-6" />
        ) : (
          <FaBars className="w-6 h-6" />
        )}
      </button>
    </header>
  );
};

export default Header;
