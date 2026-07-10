import { Outlet } from "react-router-dom";
import EmployeeSidebar from "../components/employeeInterface/EmployeeSidebar";
import EmployeeHeader from "../components/employeeInterface/EmployeeHeader";

function EmployeeLayout() {
    return (
        <div className="flex h-screen bg-slate-100">

            <EmployeeSidebar />

             {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <main className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 hide-scrollbar">
                    <Outlet />
                </main>
            </div>

        </div>
    );
}

export default EmployeeLayout;
