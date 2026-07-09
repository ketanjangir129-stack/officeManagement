import { Outlet } from "react-router-dom";
import EmployeeSidebar from "../components/employeePortal/EmployeeSidebar";
import EmployeeHeader from "../components/employeePortal/EmployeeHeader";

function EmployeeLayout() {
    return (
        <div className="flex h-screen bg-slate-100">

            <EmployeeSidebar />

             {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <EmployeeHeader />
                <main className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6">
                    <Outlet />
                </main>
            </div>

        </div>
    );
}

export default EmployeeLayout;
