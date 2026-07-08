import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useEmployees } from "../../context/EmployeeContext";
import { searchFilter } from "../../utils/searchFilter";
import SearchFilter from "../../components/common/SearchFilter";


function TaskDashboard() {
  const [search, setSearch] = useState("");

  const { employees } = useEmployees();

  {/*serach users */}
  const filteredEmployees = searchFilter(
        employees, 
        search, 
        ["fullName", "employeeId"]
    );


  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Employee Task Management
        </h1>

        <p className="mt-1 text-slate-500">
          Assign and manage employee tasks
        </p>
      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <SearchFilter value={search} onChange={setSearch} placeholder="Search employee...." />
      </div>

      {/* Table */}

      <div
        className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-sm
        overflow-hidden
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className="
                bg-slate-50
                border-b
                border-slate-200
                "
              >
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase">
                  ID
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase">
                  Employee Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase">
                  Designation
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase">
                  Email
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="
                    border-b
                    border-slate-100
                    hover:bg-violet-50/40
                    transition-all
                    "
                  >
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {employee.employeeId}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                          h-10
                          w-10
                          rounded-full
                          bg-violet-100
                          text-violet-600
                          flex
                          items-center
                          justify-center
                          font-semibold
                          "
                        >
                          {employee.fullName.charAt(0)}
                        </div>

                        <span className="font-medium text-slate-800">
                          {employee.fullName}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {employee.designation}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className="
                        inline-flex
                        items-center
                        rounded-full
                        bg-green-100
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-green-700
                        "
                      >
                        {employee.email}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        className="
                        px-4
                        py-2
                        rounded-xl
                        bg-violet-600
                        text-white
                        text-sm
                        font-medium
                        hover:bg-violet-700
                        transition-all
                        cursor-pointer
                        "
                      >
                        Assign Task
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-16 text-center"
                  >
                    <h3 className="font-semibold text-slate-700">
                      No Employee Found
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Try a different search keyword.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TaskDashboard;