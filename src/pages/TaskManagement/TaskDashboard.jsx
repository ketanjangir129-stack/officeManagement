import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useEmployees } from "../../context/EmployeeContext";
import { searchFilter } from "../../utils/searchFilter";

import SearchFilter from "../../components/common/SearchFilter";
import AssignTaskModal from "../../components/TaskManagement/AssignTaskModal";

import { createTask } from "../../services/taskService";


import { createNotification } from "../../services/notificationService";
import Pagination from "../../components/common/Pagination";
import usePagination from "../../hooks/usePagination";

import {
  assignTask,
  subscribeAssignedTasks,
} from "../../services/assignTaskService";
import { useNavigate } from "react-router-dom";

import TaskManagement from "./TaskMangement.jsx";

function TaskDashboard() {
  const { employees, loading } = useEmployees();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [assignedTasks, setAssignedTasks] = useState({});
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [activeTab, setActiveTab] = useState("employees");

  useEffect(() => {
    const unsubscribe = subscribeAssignedTasks(setAssignedTasks);

    return () => unsubscribe();
  }, []);

  const filteredEmployees = searchFilter(
    employees,
    search,
    ["fullName", "employeeId"]
  );

  //Pagination hook used here
  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
    setCurrentPage
  } = usePagination(filteredEmployees, 5);
  //resets pagination when searching employees
  useEffect(() => {
    setCurrentPage(1);
  }, [search, setCurrentPage]);

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
      const { assignedEmployees, ...taskOnlyData } = taskData;

      const result = await createTask(taskOnlyData);

      if (!result.success) {
        toast.error("Failed to create task");
        return;
      }

      const employeeIds = Object.keys(
        taskData.assignedEmployees
      );

      for (const employeeId of employeeIds) {
        await assignTask(employeeId, result.taskId);

        await createNotification(
          employeeId,
          result.taskId
        );
      }
      await createNotification(
        selectedEmployee.id,
        result.taskId
      );

      toast.success("Task Assigned Successfully");

      closeModal();


    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };


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
    );
  }

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
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab("employees")}
          className={`px-4 py-2 rounded-lg ${activeTab === "employees"
            ? "bg-violet-600 text-white"
            : "bg-gray-200"
            }`}
        >
          Employees
        </button>

        <button
          onClick={() => setActiveTab("tasks")}
          className={`px-4 py-2 rounded-lg ${activeTab === "tasks"
            ? "bg-violet-600 text-white"
            : "bg-gray-200"
            }`}
        >
          Tasks
        </button>
      </div>

      {activeTab === "employees" && (
        <>
          {/* Search */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SearchFilter
              value={search}
              onChange={setSearch}
              placeholder="Search Employee..."
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

                  {paginatedData.length > 0 ? (

                    paginatedData.map((employee) => (
                      <tr
                        key={employee.id}
                        onClick={() => navigate(`/tasks/employee/${employee.id}`)}
                        className="border-b border-slate-100 transition hover:bg-violet-50 cursor-pointer"
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

                            {assignedTasks[employee.id]
                              ? Object.keys(assignedTasks[employee.id]).length
                              : 0}
                          </span>

                        </td>

                        <td className="px-6 py-4 text-center">

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAssignClick(employee);
                            }}
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

              {/* Pagination component */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                onNext={nextPage}
                onPrev={prevPage}
              />
            </div>
          </div>


          {/* Assign Task Modal */}
          <AssignTaskModal
            isOpen={showAssignModal}
            employee={selectedEmployee}
            employees={employees}
            onClose={closeModal}
            onSubmit={handleAssignTask}
          />
        </>
      )}


      {activeTab === "tasks" && <TaskManagement />}
    </div>
  );
}

export default TaskDashboard;