// layouts/DashboardLayout.jsx

import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;