const Sidebar = () => {
  return (
    <aside className="w-1/5 h-full px-4 md:relative absolute -left-full md:left-0">
      <h2 className="text-xl md:text-2xl font-bold font-urbanist text-slate-800">
        Filters
      </h2>
      {Array.from({ length: 50 }).map((_, index) => (
        <div
          key={index}
          className="bg-white border-2 border-slate-200 rounded-lg p-2 flex flex-col gap-y-2 my-2"
        >
          <h3 className="text-lg md:text-lg font-bold font-urbanist text-slate-800">
            {`Filter ${index + 1}`}
          </h3>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
