import { useState } from "react";
import { removeTaskAssignment } from "../../services/assignTaskService";
import TaskDetailsModal from "./TaskDetailsModal";
import EditTaskModal from "./EditTaskModal";
import { toast } from "react-toastify";
import { createUnassignNotification, } from "../../services/notificationService";
import { FcDeleteDatabase } from "react-icons/fc";
import TableSkeleton from "../skeletons/TableSkeleton";

function EmployeeTaskTable({
    employeeId,
    tasks,
    loading,
    reloadTasks,
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

    const handleRemoveAssignment = async (taskId) => {
        const confirmDelete = window.confirm(
            "Un-Assign this task for this employee?"
        );

        if (!confirmDelete) return;

        const success = await removeTaskAssignment(
            employeeId,
            taskId
        );

        if (success) {
            await createUnassignNotification(
                employeeId,
                taskId
            );
            toast.success("Task Unassigned");
            setShowDetails(false);
            setShowEdit(false);
            setSelectedTask(null);
            reloadTasks();
        }
    };

    if (loading) {
        return <TableSkeleton />
    }
    return (
        <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">

                    <table className="min-w-full table-fixed">

                        <thead className="bg-slate-100">
                            <tr className="border-b border-slate-200">

                                <th className=" px-6 py-4 text-left text-sm font-semibold uppercase text-slate-600">
                                    Title 
                                </th>

                                <th className=" px-6 py-4 text-center text-sm font-semibold uppercase text-slate-600">
                                    Priority
                                </th>
                                <th className=" px-6 py-4 text-center text-sm font-semibold uppercase text-slate-600">
                                    Type
                                </th>

                                <th className=" px-6 py-4 text-center text-sm font-semibold uppercase text-slate-600">
                                    Status
                                </th>


                                <th className=" px-6 py-4 text-center text-sm font-semibold uppercase text-slate-600">
                                    Deadline
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

                                        <td className="px-6 py-4  font-medium text-slate-700 max-w-[350px] truncate">
                                            {task.title}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${task.priority === "High"
                                                    ? "bg-red-100 text-red-700"
                                                    : task.priority === "Medium"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-green-100 text-green-700"
                                                    }`}
                                            >
                                                {task.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
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



                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${task.status === "Completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : task.status === "In Progress"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-blue-100 text-blue-700"
                                                    }`}
                                            >
                                                {task.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center text-slate-600">
                                            {new Date(task.deadline).toLocaleDateString("en-GB")}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(task);
                                                    }}
                                                    className="rounded-lg bg-green-600 px-3 py-2 text-white transition hover:bg-green-700"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveAssignment(task.taskId);
                                                    }}
                                                    className="rounded-lg bg-orange-500 px-3 py-2 text-white transition hover:bg-orange-600"
                                                >
                                                    Un Assign
                                                </button>

                                            </div>
                                        </td>
      
     

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
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
                onUpdated={reloadTasks}
            />
        </div>
    );
}

export default EmployeeTaskTable;