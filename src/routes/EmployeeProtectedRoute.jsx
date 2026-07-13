import { Navigate } from "react-router-dom";
import { useEmployees } from "../context/EmployeeContext";
import EmployeeSidebarSkeleton from "../components/skeletons/EmployeeSidebarSkeleton";
import SearchSkeleton from "../components/skeletons/SearchSkeleton";

function EmployeeProtectedRoute({
  children,
}) {
  const { employees, loading } = useEmployees();
  const employeeId = localStorage.getItem("employeeId");

  if (loading) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
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