import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmployees } from "../../context/EmployeeContext";
import { toast } from "react-toastify";

function EmployeeLogin() {

    const [employeeId, setEmployeeId] = useState("");
    const navigate = useNavigate();
    const { employees } = useEmployees();

    const handleLogin = () => {

        if (!employeeId.trim()) {
            toast.error("Employee ID is required");
            return;
        }

        const employee = employees.find(
            (emp) =>
                emp.employeeId.toLowerCase() ===
                employeeId.toLowerCase()
        );
        if (!employee) {
            toast.error("Employee not found");
            return;
        }
        localStorage.setItem(
            "employeeId",
            employee.id
        );
        toast.success("Login Successful");
        navigate("/employee/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Employee Login
                </h1>

                <p className="text-center text-slate-500 mb-8">
                    Login using Employee ID
                </p>

                <input
                    type="text"
                    placeholder="EMP001"
                    value={employeeId}
                    onChange={(e) =>
                        setEmployeeId(e.target.value)
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-500"
                />

                <button
                    onClick={handleLogin}
                    className="w-full mt-5 bg-violet-600 text-white py-3 rounded-xl hover:bg-violet-700"
                >
                    Login
                </button>

            </div>

        </div>
    );
}

export default EmployeeLogin;