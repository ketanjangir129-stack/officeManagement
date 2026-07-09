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
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredEmployees = searchFilter(
      employees,
      search,
      ["fullName", "employeeId"]
    ).filter((employee) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "active") {
        return employee.isOnline === true;
      }
      if (statusFilter === "inactive") {
        return employee.isOnline === false;
      }
      return true;
  });

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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchFilter
              value={search}
              onChange={setSearch}
              placeholder="Search employee..."
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) =>setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-violet-500"
          >
            <option value="all">All Employees</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
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
                  Status
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
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          employee.isOnline
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {employee.isOnline ? "Active": "inActive"}
                      </span>
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
                    colSpan={7}
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