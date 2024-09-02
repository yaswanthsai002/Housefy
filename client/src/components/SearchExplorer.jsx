import { IoSearch } from "react-icons/io5";
const SearchExplorer = () => {
  return (
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
  );
};

export default SearchExplorer;
