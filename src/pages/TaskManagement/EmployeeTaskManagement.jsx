import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEmployees } from "../../context/EmployeeContext";
import TaskTable from "../../components/TaskManagement/TaskTable"
import SearchFilter from "../../components/common/SearchFilter";
import AssignTaskModal from "../../components/TaskManagement/AssignTaskModal";
import { createTask } from "../../services/taskService";
import { assignTask } from "../../services/assignTaskService";
import { toast } from "react-toastify";
import { getEmployeeTasks } from "../../services/employeeTaskService";
function EmployeeTaskManagement() {
    const { employeeId } = useParams();
    const navigate = useNavigate();

    const { employees } = useEmployees();

    const employee = employees.find(
        (emp) => emp.id === employeeId
    );
    const [employeeTasks, setEmployeeTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadEmployeeTasks = async () => {
        setLoading(true);

        const tasks = await getEmployeeTasks(employee.id);

        setEmployeeTasks(tasks);

        setLoading(false);
    };
    const [search, setSearch] = useState("");

    const [showAssignModal, setShowAssignModal] =
        useState(false);

    const handleAssignTask = async (taskData) => {
        try {
            const { assignedEmployees, ...taskOnlyData } =
                taskData;

            const result = await createTask(taskOnlyData);

            if (!result.success) {
                toast.error("Failed to create task");
                return;
            }

            await assignTask(employee.id, result.taskId);

            toast.success("Task Assigned");

            setShowAssignModal(false);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };
    useEffect(() => {
        if (employee) {
            loadEmployeeTasks();
        }
    }, [employee]);
    if (!employee) {
        return (
            <div className="p-10 text-center">
                Employee not found
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <button
                        onClick={() => navigate(-1)}
                        className="mb-4 rounded-lg bg-slate-200 px-4 py-2 hover:bg-slate-300"
                    >
                        ← Back
                    </button>

                    <h1 className="text-3xl font-bold">
                        {employee.fullName}
                    </h1>

                    <p className="text-slate-500">
                        {employee.designation}
                    </p>

                </div>

                <button
                    onClick={() => setShowAssignModal(true)}
                    className="rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700"
                >
                    + Assign Task
                </button>

            </div>

            {/* Search */}

            <SearchFilter
                value={search}
                onChange={setSearch}
                placeholder="Search Task..."
            />

            {/* Task Table */}

            <TaskTable
                tasks={employeeTasks}
                loading={loading}
                reloadTasks={loadEmployeeTasks}
                employeeId={employee.id}
            />

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