import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEmployees } from "../../context/EmployeeContext";
import EmployeeTaskTable from "../../components/TaskManagement/EmployeeTaskTable"
import SearchFilter from "../../components/common/SearchFilter";
import { searchFilter } from "../../utils/searchFilter";
import AssignTaskModal from "../../components/TaskManagement/AssignTaskModal";
import { subscribeEmployeeTasks } from "../../services/assignTaskService";
import { createTask } from "../../services/taskService";
import { assignTask } from "../../services/assignTaskService";
import { toast } from "react-toastify";
import { createNotification } from "../../services/notificationService";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/common/Pagination";
import SearchSkeleton from "../../components/skeletons/SearchSkeleton";
import TableSkeleton from "../../components/skeletons/TableSkeleton";


function EmployeeTaskManagement() {
    const { employeeId } = useParams();
    const navigate = useNavigate();

    const { employees } = useEmployees();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);


    const [statusFilter, setStatusFilter] = useState("all");
    const [search, setSearch] = useState("");
    const searchedTasks = searchFilter(tasks, search, [
        "title",
        "priority",
    ]);
    const filteredTasks =
        statusFilter === "all"
            ? searchedTasks
            : searchedTasks.filter(
                (task) => task.status === statusFilter
    );

    const [showAssignModal, setShowAssignModal] =
        useState(false);

    const handleAssignTask = async (taskData) => {
        try {
            const { assignedEmployees, ...taskOnlyData } = taskData;
            const result = await createTask(taskOnlyData);
            if (!result.success) {
                toast.error("Failed to create task");
                return;
            }
            await assignTask(employee.id, result.taskId);
            await createNotification(
                employee.id,
                result.taskId
            );
            toast.success("Task Assigned Successfully");
            setShowAssignModal(false);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };
    useEffect(() => {
        if (!employeeId) return;

        setLoading(true);

        const unsubscribe = subscribeEmployeeTasks(
            employeeId,
            (taskArray) => {
                setTasks(taskArray);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, [employeeId]);

    //using pagination
    const {
        currentPage,
        totalPages,
        paginatedData,
        goToPage,
        nextPage,
        prevPage,
        setCurrentPage,
    } = usePagination(filteredTasks, 5);
    useEffect(() => {
        setCurrentPage(1);
    }, [search, statusFilter]);


    const employee = employees.find(
        (emp) => emp.id === employeeId
    );
    if (!employee) {
        return (
            <div className="mt-4 flex flex-col gap-5">
                <SearchSkeleton />
                <TableSkeleton />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div >
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 rounded-lg bg-slate-200 px-4 py-2 hover:bg-slate-300"
                >
                    Back
                </button>
            </div>

            <div className="flex items-center justify-between">
                {/* Header */}
                <div>

                    <div> <h1 className="text-3xl font-bold">
                        {employee.fullName}
                    </h1>

                        <p className="text-slate-500">
                            {employee.designation}
                        </p></div>
                </div>
                <div>
                    <button
                        onClick={() => setShowAssignModal(true)}
                        className="rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700"
                    >
                        + Assign Task
                    </button>
                </div>

            </div>


            {/* search bar  */}
            <div className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm">
                <SearchFilter
                    value={search}
                    onChange={setSearch}
                    placeholder="Search by title or priority..."
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-xl border px-4 py-2"
                >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {/* Task Table */}

            <EmployeeTaskTable
                tasks={paginatedData}
                loading={loading}
                employeeId={employeeId}
            >
                {/* using pagination component */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                    onNext={nextPage}
                    onPrev={prevPage}
                />
            </EmployeeTaskTable>

            {/* Assign Modal */}

            <AssignTaskModal
                isOpen={showAssignModal}
                employee={employee}
                onClose={() => setShowAssignModal(false)}
                onSubmit={handleAssignTask}
            />

        </div>
    );
}

export default EmployeeTaskManagement;