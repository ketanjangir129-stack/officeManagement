// components/common/SearchFilter.jsx

import { FiSearch } from "react-icons/fi";

function SearchFilter({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <FiSearch
        size={18}
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-slate-400
        "
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
        w-full
        pl-11
        pr-4
        py-3
        bg-white
        border
        border-slate-300
        rounded-xl
        outline-none
        transition-all
        focus:border-violet-500
        focus:ring-4
        focus:ring-violet-100
        "
      />
    </div>
  );
}

export default SearchFilter;