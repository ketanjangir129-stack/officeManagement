import { useEffect } from "react";
import { useEmployees } from "../../context/EmployeeContext";
import { useNavigate } from "react-router-dom";

function EmployeeSidebar() {

    const navigate = useNavigate();
    const employeeId =localStorage.getItem("employeeId");
    const { employees,updateOnlineStatus,loading } = useEmployees();
    const employee = employees.find(
        (emp) => emp.id === employeeId
    );
    
    if (loading) {
    return (
        <aside className="w-80 flex items-center justify-center bg-slate-800 text-white">
            Loading...
        </aside>
    );
    useEffect(() => {
    if (!loading && !employee) {
        navigate("/employees-login");
    }
}, [employee, loading]);
}

    const handleLogout = async () => {
        console.log("Logout clicked");
        const employeeId = localStorage.getItem("employeeId");
        console.log("Employee ID:", employeeId);
        if (employeeId) {
            await updateOnlineStatus(employeeId, false);
            console.log("Status updated");
        }
        localStorage.removeItem("employeeId");  
        navigate("/employees-login");
    };

    return (
        <aside className="w-80 bg-slate-800 text-white border-r border-slate-200 flex flex-col">

            {/* Profile */}

            <div className="p-6 border-b border-slate-700">
                <div className="flex flex-col items-center">

                    <div className="w-24 h-24 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-4xl font-bold">
                        {employee?.fullName?.trim()?.charAt(0)?.toUpperCase()}
                    </div>

                    <h2 className="mt-4 text-xl font-bold">
                        {employee?.fullName}
                    </h2>

                    <p className="text-slate-300">
                        {employee?.designation}
                    </p>

                </div>

            </div>

            {/* Employee Info */}

            <div className="flex-1 p-6 space-y-5">

                <Info
                    title="Employee ID"
                    value={employee?.employeeId}
                />

                <Info
                    title="Email"
                    value={employee?.email}
                />

                <Info
                    title="Phone"
                    value={employee?.phone}
                />

                <Info
                    title="Status"
                    value={employee?.status}
                />

            </div>

            {/* Logout */}

            <div className="p-6 border-t border-slate-700">

                <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                >
                    Logout
                </button>

            </div>

        </aside>
    );
}

function Info({ title, value }) {
    return (
        <div>
            <p className="text-sm text-slate-400">
                {title}
            </p>

            <p className="font-medium text-slate-200">
                {value || "-"}
            </p>
        </div>
    );
}

export default EmployeeSidebar;