import { useState } from "react";
import { useEmployees } from "../../context/EmployeeContext";

import EmployeeTaskTable from "../../components/employeeInterface/EmployeeTaskTable";
import SearchFilter from "../../components/common/SearchFilter";
import NotificationBell from "../../components/employeeInterface/NotificationBell";

function EmployeeTasks() {
  const { employees } = useEmployees();

  const employeeId = localStorage.getItem("employeeId");

  const employee = employees.find(
    (emp) => emp.id === employeeId
  );

  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome,
            <span className="text-violet-600">
              {" "}
              {employee?.fullName}
            </span>
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage your assigned tasks.
          </p>
        </div>

        <div className="flex items-center gap-5 self-end sm:self-auto">
          <NotificationBell />
        </div>
      </div>



      {/* Search */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <SearchFilter
          value={search}
          onChange={setSearch}
          placeholder="Search Task..."
        />
      </div>

      {/* Task Table */}

      <EmployeeTaskTable
        employeeId={employeeId}
        search={search}
      />

    </div>
  );
}

export default EmployeeTasks;