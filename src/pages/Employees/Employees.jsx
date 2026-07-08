import { useState } from "react";

import AddEmployeeModal from "../../components/employee/AddEmployeeModal";

import { useEmployees } from "../../context/EmployeeContext";

function Employees() {
  const [openModal, setOpenModal] = useState(false);

  const { employees } = useEmployees();

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
                  S.No
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
                  Department
                </th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees.map((employee, index) => (
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
                      {index + 1}
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
                      {employee.department}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-16 text-center"
                  >
                    <h3 className="font-semibold text-slate-700">
                      No Employees Found / Employee List is Loading...
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