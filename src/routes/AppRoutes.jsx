import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Employees from "../pages/EmployeesManagement/Employees";
import TaskDashboard from "../pages/TaskManagement/TaskDashboard";
import EmployeeDetails from "../pages/EmployeesManagement/EmployeeDetails";
import EmployeeLogin from "../pages/EmployeeInterface/EmployeeLogin";
import EmployeeProtectedRoute from "./EmployeeProtectedRoute";
import EmployeeLayout from "../layouts/EmployeeLayout";
import EmployeeTasks from "../pages/EmployeeInterface/EmployeeTasks";
import EmployeeTaskManagement from "../pages/TaskManagement/EmployeeTaskManagement";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Admin Routes */}
      <Route element={<DashboardLayout />}>
        {/* <Route path="/" element={<Dashboard />}/> */}
        <Route path="/" element={<Navigate to="/employees" replace />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
        <Route path="/tasks" element={<TaskDashboard />} />

        <Route
          path="/tasks/employee/:employeeId"
          element={<EmployeeTaskManagement />}
        />
      </Route>
{/* <Route
    path="/tasks/employee/:id"
    element={<EmployeeTaskManagement />}
/> */}

      {/* Employee Login */}
      <Route path="/employees-login" element={<EmployeeLogin />} />

      {/* Employee Portal */}

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