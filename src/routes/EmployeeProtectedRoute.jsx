import { Navigate } from "react-router-dom";

function EmployeeProtectedRoute({
    children,
}) {
    const employeeId = localStorage.getItem("employeeId");
 
    return employeeId ? children : <Navigate to="/employee-login" />;
}

export default EmployeeProtectedRoute;