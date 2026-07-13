import { useState, useEffect } from "react";
import { globaldelete } from "../../services/assignTaskService";
import TaskDetailsModal from "./TaskDetailsModal";
import EditTaskModal from "./EditTaskModal";
import { toast } from "react-toastify";
import TableSkeleton from "../skeletons/TableSkeleton";

function TaskTable({
  employeeId,
  tasks,
  loading,
  assignedTasks,
  children
}) {

  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);



  const handleView = (task) => {
    setSelectedTask(task);
    setShowDetails(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowEdit(true);
  };

  if (loading) {
    return (
      <TableSkeleton />
    );
  }

  return (


    <div className="space-y-6">

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr className="border-b border-slate-200 bg-slate-50">

                <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-slate-600">
                  Title
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-slate-600">
                  Priority
                </th>
 <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-slate-600">
                  Task Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-slate-600">
                  Deadline
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold uppercase text-slate-600">
                  Assigned
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold uppercase text-slate-600">
                  Actions
                </th>

              </tr>

            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr
                    key={task.taskId}
                    onClick={() => handleView(task)}
                    className="cursor-pointer border-b border-slate-100 transition hover:bg-violet-50"
                  >
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {task.title}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${task.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
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
                    </td>


                    <td className="px-6 py-4 text-slate-600">
                      {new Date(task.deadline).toLocaleDateString("en-GB")}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                        {
                          Object.values(assignedTasks || {}).filter(
                            (employee) => employee[task.taskId]
                          ).length
                        }
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(task);
                          }}
                          className="rounded-lg bg-green-600 px-3 py-2 text-white hover:bg-green-700"
                        >
                          Edit
                        </button>

                        <button
                          onClick={async (e) => {
                            e.stopPropagation();

                            const confirmDelete = window.confirm(
                              "Delete this task for all employees?"
                            );

                            if (!confirmDelete) return;

                            const success = await globaldelete(task.taskId);

                            if (success) {
                              toast.success("Task Deleted Successfully");
                              setShowDetails(false);
                              setShowEdit(false);
                              setSelectedTask(null);
                            } else {
                              toast.error("Failed to delete task");
                            }
                          }}
                          className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                        >
                          Delete
                        </button>

                      </div>
                    </td>


                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-slate-500"
                  >
                    No Tasks Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
          {children}
        </div>

      </div>

      <TaskDetailsModal
        isOpen={showDetails}
        task={selectedTask}
        onClose={() => setShowDetails(false)}
      />

      <EditTaskModal
        isOpen={showEdit}
        task={selectedTask}
        onClose={() => setShowEdit(false)}

      />

    </div>
  );
}

export default TaskTable;