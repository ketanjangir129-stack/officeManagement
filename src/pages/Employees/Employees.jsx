import { useState } from "react";
import AddEmployeeModal from "../../components/employee/AddEmployeeModal";
import { useEmployees } from "../../context/EmployeeContext";
import SearchFilter from "../../components/common/SearchFilter";
import {searchFilter} from "../../utils/searchFilter";
import { useNavigate } from "react-router-dom";

function Employees() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const { employees, loading } = useEmployees();
  const navigate = useNavigate();

  const filteredEmployees = searchFilter(
    employees, 
    search, 
    ["fullName", "employeeId"]
  );

  //loader
  if (loading) {
    return (
        <div className="flex items-center justify-center h-[70vh]">
            <div className="text-center">
                <div
                    className="
                        w-12
                        h-12
                        border-4
                        border-violet-200
                        border-t-violet-600
                        rounded-full
                        animate-spin
                        mx-auto
                    "
                />
                <p className="mt-4 text-slate-600">
                    Loading employees...
                </p>
            </div>
        </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Employees
          </h1>

          <p className="mt-1 text-slate-500">
            Manage employee records and information
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="
          bg-violet-600
          text-white
          px-5
          py-3
          rounded-xl
          font-medium
          shadow-sm
          hover:bg-violet-700
          hover:shadow-md
          transition-all
          cursor-pointer
          "
        >
          + Add Employee
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <SearchFilter value={search} onChange={setSearch} placeholder="Search employee...." />
      </div>

      {/* Employee Table */}

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
                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-600 uppercase tracking-wide">
                  ID
                </th>

                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-600 uppercase tracking-wide">
                  Name
                </th>

                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-600 uppercase tracking-wide">
                  Email
                </th>

                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-600 uppercase tracking-wide">
                  Phone
                </th>

                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-600 uppercase tracking-wide">
                  Designation
                </th>

                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-600 uppercase tracking-wide">
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
                    duration-200
                    cursor-pointer
                    "
                  >
                    <td className="py-4 px-6 text-sm font-semibold text-slate-700">
                      {employee.employeeId}
                    </td>

                    <td className="py-4 px-6">
                      <h3
                        className="
                        font-semibold
                        text-slate-800
                        hover:text-violet-600
                        transition-colors
                        "
                      >
                        {employee.fullName}
                      </h3>
                    </td>

                    <td className="py-4 px-6 text-sm font-medium text-slate-600">
                      {employee.email}
                    </td>

                    <td className="py-4 px-6 text-sm font-medium text-slate-600">
                      {employee.phone}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-slate-600">
                      {employee.designation}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-slate-600">
                      <button 
                        onClick={() => navigate(`/employees/${employee.id}`)}
                        className="bg-violet-600 text-white px-5 py-2 rounded-xl font-medium shadow-sm hover:bg-violet-700 hover:shadow-md transition-all cursor-pointer"
                      >
                        Full Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-16 text-center"
                  >
                    <h3 className="font-semibold text-slate-700">
                      No Employees Found
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Click "Add Employee" to create your first employee.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddEmployeeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}

export default Employees;