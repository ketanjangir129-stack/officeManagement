
import { MdPeople } from "react-icons/md";
import { SiGoogletasks } from "react-icons/si";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      className="
        hidden
        md:flex
        flex-col
        w-64
        h-screen
        bg-slate-800
        text-white
        shrink-0
      "
    >
      {/* Logo */}
      <div className="p-5 border-b border-slate-700">
        <h2 className="font-semibold text-xl">
          oManagement
        </h2>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 flex-1">

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `flex items-center gap-2 p-3 rounded-lg transition-colors ${
              isActive
                ? "bg-violet-600 text-white"
                : "hover:bg-slate-700"
            }`
          }
        >
          <MdPeople size={20} />
          Employees
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `flex items-center gap-2 p-3 rounded-lg transition-colors ${
              isActive
                ? "bg-violet-600 text-white"
                : "hover:bg-slate-700"
            }`
          }
        >
          <SiGoogletasks size={20} />
          Tasks
        </NavLink>

      </nav>

      {/* Profile Section */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <img
            src="https://png.pngtree.com/png-clipart/20240917/original/pngtree-administrator-admin-avatar-png-image_16031562.png"
            alt="Admin"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <h4 className="font-semibold text-white">
              Admin
            </h4>

            <p className="text-sm text-slate-400">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;