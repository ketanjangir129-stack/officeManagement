import { Navigate } from "react-router-dom";
import { useEmployees } from "../context/EmployeeContext";

function EmployeeProtectedRoute({
  children,
}) {
  const { employees, loading } = useEmployees();
  const employeeId = localStorage.getItem("employeeId");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const employeeExists =
    employees.some(
      (emp) => emp.id === employeeId
    );

  if (!employeeExists) {
    localStorage.removeItem(
      "employeeId"
    );

    return (
      <Navigate
        to="/employees-login"
        replace
      />
    );
  }

  return children;
}

export default EmployeeProtectedRoute;