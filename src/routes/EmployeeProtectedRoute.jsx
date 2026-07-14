import { Navigate } from "react-router-dom";
import { useEmployees } from "../context/EmployeeContext";
import { useEffect } from "react";

function EmployeeProtectedRoute({ children }) {

    const user = JSON.parse(localStorage.getItem("user"));
    const { employees, loading } = useEmployees();

    const employee = employees.find(
        (emp) => emp.id === user?.id
    );

    useEffect(() => {

        if (
            !loading &&
            user &&
            user.role === "employee" &&
            !employee
        ) {
            localStorage.removeItem("user");
            localStorage.removeItem("employeeId");
            window.location.href = "/login";
        }

    }, [employee,loading,user]);

    if (loading) {
        return null;
    }

    if (
        !user ||
        user.role !== "employee"
    ) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (!employee) {
        return (
            <Navigate to="/login" replace />
        );
    }

    return children;
}

export default EmployeeProtectedRoute;