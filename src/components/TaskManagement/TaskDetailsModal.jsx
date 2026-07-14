import { useEffect, useState } from "react";
import { getAssignedEmployees } from "../../services/assignTaskService";

function TaskDetailsModal({
  isOpen,
  task,
  onClose,
}) {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    if (!task) return;

    const loadEmployees = async () => {
      const data = await getAssignedEmployees(task.taskId);
      setEmployees(data);
    };

    loadEmployees();
  }, [task]);

  if (!isOpen || !task) return null;

  const priorityColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Task Details
            </h2>

            <p className="text-sm text-slate-500">
              View complete task information
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600"
          >
            ✕
          </button>

        </div>

        {/* Body */}
<div className="max-h-[calc(90vh-80px)] overflow-y-auto hide-scrollbar">
        <div className="space-y-6 p-6 overflow-y-auto ">

          {/* Title */}

          <div>
            <p className="text-sm text-slate-500">
              Task Title
            </p>

            <h3 className="mt-1 text-xl font-semibold text-slate-800">
              {task.title}
            </h3>
          </div>
          <div className="flex justify-start items-center gap-10">
            <div>

              <p className="text-sm text-slate-500">
                Priority
              </p>

              <div className="mt-2">

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${priorityColor[task.priority]
                    }`}
                >
                  {task.priority}
                </span>

              </div>

            </div>
            <div >

              <p className="text-sm text-slate-500">
                Task Type
              </p>

              <div className="mt-2">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${task.taskType === "single"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                    }`}
                >
                  {task.taskType === "single"
                    ? "Single"
                    : "Collaborative"}
                </span>
              </div>
            </div>
          </div>
          {/* Description */}

          <div>
            <p className="text-sm text-slate-500">
              Description
            </p>

            <div className="mt-2 rounded-xl bg-slate-100 p-4 text-pretty">
              {task.description}
            </div>
          </div>
          {/* Assigned Employees */}

          <div>
            <p className="mb-3 text-sm text-slate-500">
              Assigned Employees
            </p>

            {employees.length > 0 ? (
              <div className="space-y-3 max-h-42 overflow-y-auto hide-scrollbar">
                {employees.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {employee.fullName}
                      </p>

                      <p className="text-sm text-slate-500">
                        {employee.designation}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${employee.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : employee.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {employee.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-slate-500">
                No employees assigned.
              </div>
            )}
          </div>
          {/* Priority + Deadline */}

          <div className="grid gap-5 md:grid-cols-2">
            {/* Created */}

            <div>

              <p className="text-sm text-slate-500">
                Created On
              </p>

              <p className="mt-2">
                {new Date(task.createdAt).toLocaleString("en-gb")}
              </p>

            </div>


            <div>

              <p className="text-sm text-slate-500">
                Deadline
              </p>

              <p className="mt-2 font-semibold">
                {new Date(task.deadline).toLocaleDateString("en-gb")}
              </p>

            </div>

          </div>



          {/* Updated */}

          <div>

            <p className="text-sm text-slate-500">
              Last Updated
            </p>

            <p className="mt-2">
              {new Date(task.updatedAt).toLocaleString()}
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end border-t p-6">

          <button
            onClick={onClose}
            className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
          >
            Close
          </button>

        </div>

      </div>
</div>
    </div>
  );
}

export default TaskDetailsModal;