import { useState } from "react";
import { useEmployees } from "../../context/EmployeeContext";
import { searchFilter } from "../../utils/searchFilter";
import SearchFilter from "../../components/common/SearchFilter";
import AssignTaskModal from "../../components/task/AssignTaskModal";
import { createTask } from "../../services/taskService";
import { assignTaskToEmployee } from "../../services/employeeService";
import { toast } from "react-toastify";

function TaskDashboard() {
  const { employees } = useEmployees();

  const [search, setSearch] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [showAssignModal, setShowAssignModal] = useState(false);

  const filteredEmployees = searchFilter(
    employees,
    search,
    ["fullName", "employeeId"]
  );

  // Open Modal
  const handleAssignClick = (employee) => {
    setSelectedEmployee(employee);
    setShowAssignModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setSelectedEmployee(null);
    setShowAssignModal(false);
  };

  // Save Task
  const handleAssignTask = async (taskData) => {
    try {
      const result = await createTask({
        ...taskData,

        assignedEmployees: {
          [selectedEmployee.id]: {
            name: selectedEmployee.fullName,
            status: "Pending",
          },
        },
      });

      if (result.success) {
        await assignTaskToEmployee(
          selectedEmployee.id,
          result.id
        );

        toast.success("Task Assigned Successfully");

        closeModal();
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

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

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <SearchFilter
          value={search}
          onChange={setSearch}
          placeholder="Search employee..."
        />
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-200 bg-slate-50">

                <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-slate-600">
                  ID
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-slate-600">
                  Employee
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-slate-600">
                  Designation
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-slate-600">
                  Email
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold uppercase text-slate-600">
                  Tasks
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold uppercase text-slate-600">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredEmployees.length > 0 ? (

                filteredEmployees.map((employee) => (

                  <tr
                    key={employee.id}
                    className="border-b border-slate-100 transition hover:bg-violet-50"
                  >

                    <td className="px-6 py-4 font-medium text-slate-700">
                      {employee.employeeId}
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-800">
                      {employee.fullName}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {employee.designation}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {employee.email}
                    </td>

                    <td className="px-6 py-4 text-center">

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

                        {employee.assignedTasks
                          ? Object.keys(employee.assignedTasks).length
                          : 0}

                      </span>

                    </td>

                    <td className="px-6 py-4 text-center">

                      <button
                        onClick={() =>
                          handleAssignClick(employee)
                        }
                        className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
                      >
                        Assign Task
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan={6}
                    className="py-10 text-center text-slate-500"
                  >
                    No Employees Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Assign Task Modal */}

      <AssignTaskModal
        isOpen={showAssignModal}
        employee={selectedEmployee}
        onClose={closeModal}
        onSubmit={handleAssignTask}
      />

    </div>
  );
}

export default TaskDashboard;