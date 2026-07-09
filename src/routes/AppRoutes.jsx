import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Employees from "../pages/Employees/Employees";
import TaskDashboard from "../pages/task/TaskDashboard";
import EmployeeDetails from "../pages/Employees/EmployeeDetails";
import EmployeeLogin from "../pages/EmployeePortal/EmployeeLogin";
import EmployeeProtectedRoute from "./EmployeeProtectedRoute";
import EmployeeLayout from "../layouts/EmployeeLayout";
import EmployeeTasks from "../pages/EmployeePortal/EmployeeTasks";


const AppRoutes = () => {
  return (
    <Routes>

      {/* Admin Routes */}
      <Route element={<DashboardLayout />}>
        {/* <Route path="/" element={<Dashboard />}/> */}
        <Route path="/" element={<Navigate to="/employees" replace />} />
        <Route path="/employees" element={<Employees />}/>
        <Route path="/employees/:id" element={<EmployeeDetails />}/>
        <Route path="/tasks" element={<TaskDashboard />}/>
      </Route>


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
        <Route path="/employee/tasks" element={<EmployeeTasks />}/>
      </Route>

    </Routes>
  );
};

export default AppRoutes;