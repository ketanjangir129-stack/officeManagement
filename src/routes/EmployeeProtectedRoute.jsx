function EmployeeProtectedRoute({ children }) {
  const employeeId = localStorage.getItem("employeeId");

  if (!employeeId) {  
    return <Navigate to="/employees-login" replace />;
  }

  return children;
}
export default EmployeeProtectedRoute;