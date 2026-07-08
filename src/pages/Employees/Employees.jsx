import { useState } from "react";

import AddEmployeeModal from "../../components/employee/AddEmployeeModal";

import { useEmployees } from "../../context/EmployeeContext";

function Employees() {
  const [openModal, setOpenModal] = useState(false);

  const { employees } = useEmployees();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Employees
        </h1>

        <button
          onClick={() => setOpenModal(true)}
          className="
          bg-violet-600
          text-white
          px-5
          py-3
          rounded-xl
          "
        >
          Add Employee
        </button>
      </div>

      <div
        className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        "
      >
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="
            p-4
            hover:bg-gray-50
            cursor-pointer
            "
          >
            <h3 className="font-semibold">
              {employee.firstName}{" "}
              {employee.lastName}
            </h3>

            <p className="text-sm text-gray-500">
              {employee.email}
            </p>
          </div>
        ))}
      </div>

      <AddEmployeeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}

export default Employees;