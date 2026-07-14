import { useEffect, useState } from "react";
import { useEmployees } from "../../context/EmployeeContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import EmployeeSidebarSkeleton from "../skeletons/EmployeeSidebarSkeleton";
import ChangePasswordModal from "./ChangePasswordModal";
import { toast } from "react-toastify";

function EmployeeSidebar() {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const employeeId = localStorage.getItem("employeeId");
    const { employees, updateOnlineStatus, loading } = useEmployees();
    const employee = employees.find(
        (emp) => emp.id === employeeId
    );

    if (loading) {
        return <EmployeeSidebarSkeleton />;
    }
    useEffect(() => {
        if (!loading && !employee) {
            navigate("/employees-login");
        }
    }, [employee, loading]);

    const handleLogout = async () => {
        try {
            setShowMenu(false);
            if (employeeId) {
                await updateOnlineStatus(employeeId,false);
            }
            localStorage.removeItem("employeeId");
            localStorage.removeItem("user");
            navigate("/login");
            toast.success("Logged out successfully");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <aside className="w-80 bg-slate-800 text-white border-r border-slate-200 flex flex-col h-screen overflow-hidden">

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

            <div className="flex-1 p-6 space-y-5 overflow-y-auto hide-scrollbar">

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

            {/* Profile Section  */}
            <div className="p-4 border-t border-slate-700 relative shrink-0">

                <button
                    onClick={() =>
                        setShowMenu(!showMenu)
                    }
                    className="w-full flex items-center justify-between bg-slate-700 hover:bg-slate-600 rounded-2xl p-3 transition cursor-pointer"
                >

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center font-bold">
                            {employee?.fullName
                                ?.charAt(0)
                                ?.toUpperCase()}
                        </div>

                        <div className="text-left">
                            <p className="font-semibold">
                                {employee?.fullName}
                            </p>
                        </div>

                    </div>

                    
                </button>

                {showMenu && (
                    <div className="absolute bottom-[88px] left-4 right-4 bg-slate-700 rounded-2xl shadow-xl overflow-hidden">
                        <button
                            onClick={() => {
                                setShowPasswordModal(true);
                                setShowMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-600 transition cursor-pointer"
                        >
                            <FiLock />
                            Change Password
                        </button>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-slate-600 transition cursor-pointer"
                        >
                            <FiLogOut />
                            Logout
                        </button>

                    </div>
                )}
            </div>

            {/* change password modal */}
            {showPasswordModal && (
                <ChangePasswordModal
                    employee={employee}
                    onClose={() =>
                    setShowPasswordModal(false)
                    }
                />
            )}

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