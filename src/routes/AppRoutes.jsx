// routes/AppRoutes.jsx

import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Employees from "../pages/Employees/Employees";
import TaskDashboard from "../pages/task/TaskDashboard";
import EmployeeDetails from "../pages/Employees/EmployeeDetails";

const AppRoutes = () => {
  return (
    <Routes>

      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/employees" element={<Employees />}/>
        <Route path="/employees/:id" element={<EmployeeDetails />}/>
        <Route path="/tasks" element={<TaskDashboard />}/>
      </Route>

    </Routes>
  );
};

export default AppRoutes;