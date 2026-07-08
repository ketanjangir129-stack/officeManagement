// components/common/Header.jsx

import { FiSearch } from "react-icons/fi";

function Header() {
  return (
    <header className="bg-white px-4 md:px-6 py-4 border-b border-gray-200">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Profile */}
        <div className="flex items-end gap-3 self-end sm:self-auto">
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