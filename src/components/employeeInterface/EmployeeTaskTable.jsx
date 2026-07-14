import { useEffect, useState } from "react";
import EmployeeTaskModal from "./EmployeeTaskModal";
import {
    getEmployeeTasks,
    updateEmployeeTaskStatus, subscribeEmployeeTasks
} from "../../services/employeeTaskService";
import { searchFilter } from "../../utils/searchFilter"
import Pagination from "../../components/common/Pagination";
import usePagination from "../../hooks/usePagination";
import TableSkeleton from "../skeletons/TableSkeleton";

function EmployeeTaskTable({ employeeId, search }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [statusFilter, setStatusFilter] = useState("all");
    // Fetch Tasks

    const handleViewTask = (task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    useEffect(() => {
        if (!employeeId) return;

        const unsubscribe = subscribeEmployeeTasks(
            employeeId,
            (tasks) => {
                setTasks(tasks);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [employeeId]);

    // Update Status
    const handleStatusChange = async (taskId, status) => {
        const success = await updateEmployeeTaskStatus(
            employeeId,
            taskId,
            status
        );

        if (!success) return;

        setTasks((prev) =>
            prev.map((task) =>
                task.taskId === taskId
                    ? { ...task, status }
                    : task
            )
        );

        setSelectedTask((prev) => ({
            ...prev,
            status,
        }));

        setShowModal(false);
        setSelectedTask(null);
    };

    // Search

    const filteredTasks = searchFilter(
        tasks,
        search,
        ["title", "status"]
    ).filter((task) => {
        if (statusFilter === "all") return true;

        if (statusFilter === "Pending") {
            return task.status === "Pending";
        }

        if (statusFilter === "In Progress") {
            return task.status === "In Progress";
        }

        if (statusFilter === "Completed") {
            return task.status === "Completed";
        }

        return true;
    });

    //Pagination hook used here
    const {currentPage,totalPages,paginatedData,goToPage,nextPage,prevPage,setCurrentPage} = usePagination(filteredTasks,5);
    //resets pagination when searching employees
    useEffect(() => {
        setCurrentPage(1);
    }, [search, statusFilter]);

    useEffect(() => {
        const load = async () => {
            setLoading(true);

            const data = await getEmployeeTasks(employeeId);

            setTasks(data);

            setLoading(false);
        };

        load();
    }, [employeeId]);

    if(loading){
        return <TableSkeleton />
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-slate-600">
                                Task
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-slate-600">
                                Priority
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-slate-600">
                                Deadline
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-slate-600">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-slate-600">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {paginatedData.length > 0 ? (

                            paginatedData.map((task) => (

                                <tr
                                    key={task.taskId}
                                    className="border-b border-slate-100 transition hover:bg-violet-50"
                                >

                                    <td className="px-6 py-4 font-medium text-slate-700 max-w-[350px] truncate">

                                        {task.title}

                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-medium
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

                                    <td className="px-6 py-4 text-slate-600">
                                        {task.deadline}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-medium
                                                ${task.status === "Completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : task.status === "In Progress"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-blue-100 text-blue-700"
                                                }`}
                                        >
                                            {task.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleViewTask(task)}
                                            className="rounded-xl bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
                                        >
                                            View
                                        </button>
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
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                    onNext={nextPage}
                    onPrev={prevPage}
                />

            </div>
            <EmployeeTaskModal
                isOpen={showModal}
                task={selectedTask}
                onClose={() => setShowModal(false)}
                onStatusChange={handleStatusChange}
            />

        </div>


    );
}


export default EmployeeTaskTable;