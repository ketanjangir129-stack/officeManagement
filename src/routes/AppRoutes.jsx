// routes/AppRoutes.jsx

import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Employees from "../pages/Employees/Employees";
import AddEmployee from "../pages/Employees/AddEmployee";

const AppRoutes = () => {
  return (
    <Routes>

      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/employees" element={<Employees />}/>
        <Route path="/employees/add" element={<AddEmployee />}/>
      </Route>

    </Routes>
  );
};

export default AppRoutes;