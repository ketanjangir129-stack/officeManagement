import { MdPeople } from "react-icons/md";
import { SiGoogletasks } from "react-icons/si";
import { NavLink,useNavigate } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {toast} from "react-toastify";
import { useState } from "react";


function Sidebar() {

  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    localStorage.removeItem("employeeId");
    navigate("/login");
    toast.success("Logged out successfully");
  };


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
      <div className="relative p-4 border-t border-slate-700">

        <button
          onClick={() =>
            setShowProfile(!showProfile)
          }
          className="w-full flex items-center gap-3 cursor-pointer hover:bg-slate-700 rounded-xl p-2 transition"
        >
          <img
            src="https://png.pngtree.com/png-clipart/20240917/original/pngtree-administrator-admin-avatar-png-image_16031562.png"
            alt="Admin"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="text-left">
            <h4 className="font-semibold text-white">
              Admin
            </h4>

            <p className="text-sm text-slate-400">
              Administrator
            </p>
          </div>
        </button>
        {showProfile && (
          <div className="absolute bottom-20 left-4 right-4 bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
            <div className="p-4 space-y-3">

              <div>
                <p className="text-xs text-slate-500">
                  Username
                </p>

                <p className="font-medium text-slate-800">
                  {user?.username}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Role
                </p>
                <p className="font-medium text-slate-800">
                  Admin
                </p>
              </div>
            </div>
            <div className="p-4 border-t">
              <button
                onClick={handleLogout}
                className="w-full py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;