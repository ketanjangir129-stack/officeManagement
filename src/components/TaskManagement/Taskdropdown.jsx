import { useMemo, useState } from "react";

function EmployeeDropdown({
  employees,
  selectedEmployees,
  onToggleEmployee,
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const value =
        `${emp.fullName} ${emp.employeeId}`
          .toLowerCase();

      return value.includes(search.toLowerCase());
    });
  }, [employees, search]);

  return (
   <div className="relative w-full">

      <button
        type="button"
        onClick={() => setOpen(!open)}
         className="w-full rounded-xl border bg-white px-4 py-3 text-left shadow-sm"

      >
        {Object.keys(selectedEmployees).length === 0
          ? "Select Employees"
          : `${Object.keys(selectedEmployees).length} Employee(s) Selected`}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-xl border bg-white shadow-xl">

          <div className="border-b p-3">
            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
               className="w-full rounded-lg border px-3 py-2 outline-none focus:border-violet-500"

            />
          </div>

          <div className="max-h-52 overflow-y-auto">

            {filteredEmployees.map((emp) => (
              <label
                key={emp.id}
                 className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-violet-50">
                <input
                  type="checkbox"
                  checked={!!selectedEmployees[emp.id]}
                  onChange={() => onToggleEmployee(emp)}
                />

                <div>
                  <p className="font-medium">
                    {emp.fullName}
                  </p>

                  <p className="text-sm text-slate-500">
                    {emp.employeeId}
                  </p>
                </div>
              </label>
            ))}

            {filteredEmployees.length === 0 && (
              <p className="p-4 text-center text-slate-500">
                No employee found
              </p>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeDropdown;