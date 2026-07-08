// components/common/Sidebar.jsx
import {MdDashboard,MdPeople,} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { SiGoogletasks } from "react-icons/si";

function Sidebar() {
  return (
    <aside
      className="hidden md:block w-64 bg-slate-900 text-white shrink-0"
    >
      <div className="p-5 border-b border-slate-700">
        <h2 className="font-semibold text-xl">
          oManagement
        </h2>
      </div>

      <nav className="p-4 space-y-2">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 p-3 rounded-lg transition-colors ${
              isActive
                ? "bg-violet-600 text-white"
                : "hover:bg-slate-700"
            }`
          }
        >
          <MdDashboard size={20} />
          Dashboard
        </NavLink>

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
    </aside>
  );
}

export default Sidebar;