import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Employees from "../pages/EmployeesManagement/Employees";
import TaskDashboard from "../pages/TaskManagement/TaskDashboard";
import EmployeeDetails from "../pages/EmployeesManagement/EmployeeDetails";
import EmployeeProtectedRoute from "./EmployeeProtectedRoute";
import EmployeeLayout from "../layouts/EmployeeLayout";
import EmployeeTasks from "../pages/EmployeeInterface/EmployeeTasks";
import EmployeeTaskManagement from "../pages/TaskManagement/EmployeeTaskManagement";
import Login from "../pages/Auth/Login";
import AdminProtectedRoute from "./AdminProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route
        element={
          <AdminProtectedRoute>
            <DashboardLayout />
          </AdminProtectedRoute>
        }
      >
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
        <Route path="/tasks" element={<TaskDashboard />} />
        <Route
          path="/tasks/employee/:employeeId"
          element={<EmployeeTaskManagement />}
        />
      </Route>

      {/* Employee Routes */}
      <Route
        element={
          <EmployeeProtectedRoute>
            <EmployeeLayout />
          </EmployeeProtectedRoute>
        }
      >
        <Route path="/employee/tasks" element={<EmployeeTasks />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;