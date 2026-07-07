// components/common/Header.jsx

import { FiSearch } from "react-icons/fi";

function Header() {
  return (
    <header className="bg-white px-4 md:px-6 py-4 border-b border-gray-200">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <FiSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search employees, tasks..."
            className="
              w-full
              pl-11
              pr-4
              py-2.5
              bg-gray-50
              border
              border-gray-200
              rounded-xl
              outline-none
              transition-all
              duration-200
              focus:bg-white
              focus:border-violet-500
              focus:ring-4
              focus:ring-violet-100
            "
          />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <img
            src="https://png.pngtree.com/png-clipart/20240917/original/pngtree-administrator-admin-avatar-png-image_16031562.png"
            alt="Admin"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="hidden sm:block">
            <h4 className="font-semibold text-gray-900">
              Admin
            </h4>

            <p className="text-sm text-gray-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;