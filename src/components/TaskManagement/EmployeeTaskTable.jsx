import { useState } from "react";
import { globaldelete } from "../../services/assignTaskService";
import TaskDetailsModal from "./TaskDetailsModal";
import EditTaskModal from "./EditTaskModal";
import { toast } from "react-toastify";

function EmployeeTaskTable({
    tasks,
    loading,
    reloadTasks,
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

  const handleRemoveAssignment = async (taskId) => {
  const success = await removeTaskAssignment(
    employeeId,
    taskId
  );

  if (success) {
    toast.success("Task Unassigned");
    loadTasks();
  }
};
    if (loading) {
        return (
            <div className="rounded-2xl bg-white p-10 text-center">
                Loading tasks...
            </div>
        );
    }
    return (
        <div className="space-y-6">

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-slate-100">

                            <tr>

                                <th className="px-6 py-4 text-left">
                                    Title
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Priority
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Deadline
                                </th>

                                <th className="px-6 py-4 text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {tasks.length > 0 ? (

                                tasks.map((task) => (

                                    <tr
                                        key={task.taskId}
                                        className="border-t hover:bg-slate-50"
                                    >

                                        <td className="px-6 py-4">
                                            {task.title}
                                        </td>

                                        <td className="px-6 py-4">

                                            <span
                                                className={`rounded-full px-3 py-1 text-sm
            ${task.priority === "High"
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
                                            {task.deadline}
                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex justify-center gap-2">

                                                <button
                                                    onClick={() =>
                                                        handleView(task)
                                                    }
                                                    className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                                                >
                                                    View
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleEdit(task)
                                                    }
                                                    className="rounded-lg bg-green-600 px-3 py-2 text-white hover:bg-green-700"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        globaldelete(task.taskId)
                                                    }
                                                    className="rounded-lg bg-orange-500 px-3 py-2 text-white hover:bg-orange-600"
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
                                        colSpan={4}
                                        className="py-10 text-center text-slate-500"
                                    >
                                        No Tasks Found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

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
                onUpdated={reloadTasks}
            />

        </div>
    );
}

export default EmployeeTaskTable;