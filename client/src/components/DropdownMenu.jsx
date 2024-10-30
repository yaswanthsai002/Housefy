/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../redux/features/navBarSlice.js";
import { privateNavTabs } from "../../constants.js";

const DropdownMenu = ({ isOpen, setIsOpen, handleSignout }) => {
  const dispatch = useDispatch();
  const handleClick = (activeTab) => {
    dispatch(setActiveTab(activeTab));
    setIsOpen(false);
  };
  return (
    <div className="relative md:block hidden">
      {isOpen && (
        <div className="absolute right-0 top-8 z-10 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-1000 ease-in-out">
          <div className="py-1">
            {privateNavTabs.map((item) => (
              <Link
              key={item.tabId}
                to={item.to}
                onClick={() => handleClick(item.tabId)}
                className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {item.tabDisplayText}
              </Link>
            ))}
            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={handleSignout}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
