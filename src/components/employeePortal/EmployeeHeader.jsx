import { useEmployees } from "../../context/EmployeeContext";

function EmployeeHeader() {
  const { employees } = useEmployees();
  const employeeId = localStorage.getItem("employeeId");
  const employee = employees.find(
    (emp) => emp.id === employeeId
  );

  return (
    <header className="bg-white px-4 md:px-6 py-4 border-b border-gray-200">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Welcome */}
        <div>
          <p className="text-lg font-semibold text-gray-900">
            Welcome, {employee?.fullName || "Employee"}
          </p>

          <p className="text-sm text-gray-500">
            Employee Portal
          </p>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-3">

          <div
            className="
              w-10
              h-10
              rounded-full
              bg-violet-600
              text-white
              flex
              items-center
              justify-center
              font-semibold
              text-lg
              uppercase
            "
          >
            {employee?.fullName?.charAt(0) || "E"}
          </div>

        </div>

      </div>
    </header>
  );
}

export default EmployeeHeader;