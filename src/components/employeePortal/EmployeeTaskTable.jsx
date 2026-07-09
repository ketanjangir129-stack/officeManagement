import { useEffect, useState } from "react";
import EmployeeTaskModal from "./EmployeeTaskModal";
import {
getEmployeeTasks,
updateEmployeeTaskStatus,
} from "../../services/employeeTaskService";

function EmployeeTaskTable({ employeeId, search }) {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [selectedTask, setSelectedTask] = useState(null);
const [showModal, setShowModal] = useState(false);
// Fetch Tasks
const loadTasks = async () => {
setLoading(true);

const data = await getEmployeeTasks(employeeId);

setTasks(data);
setLoading(false);
};
const handleViewTask = (task) => {
setSelectedTask(task);
setShowModal(true);
};

useEffect(() => {
if (employeeId) {
loadTasks();
}
}, [employeeId]);

// Update Status
const handleStatusChange = async (
taskId,
status
) => {
const success = await updateEmployeeTaskStatus(
employeeId,
taskId,
status
);

if (success) {
await loadTasks();

setSelectedTask((prev) => ({
...prev,
status,
}));
}
};

// Search
const filteredTasks = tasks.filter((task) =>
(task.title || "")
.toLowerCase()
.includes(search.toLowerCase())
);

if (loading) {
return (
<div className="rounded-2xl bg-white p-10 text-center">
Loading Tasks...
</div>
);
}

return (
<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

<div className="overflow-x-auto">

<table className="w-full">

<thead className="bg-slate-100">

<tr>

    <th className="px-6 py-4 text-left">
    Task
    </th>

    <th className="px-6 py-4 text-left">
    Priority
    </th>

    <th className="px-6 py-4 text-left">
    Deadline
    </th>

    <th className="px-6 py-4 text-left">
    Status
    </th>

</tr>

</thead>

<tbody>

{filteredTasks.length > 0 ? (

    filteredTasks.map((task) => (

    <tr
        key={task.taskId}
        className="border-t hover:bg-slate-50"
    >

        <td className="px-6 py-4">
        <h3 className="font-semibold">
            {task.title}
        </h3>

        <p className="text-sm text-slate-500">
            {task.description}
        </p>
        </td>

        <td className="px-6 py-4">

        <span
            className={`rounded-full px-3 py-1 text-sm font-medium
            ${
            task.priority === "High"
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
<span
className={`rounded-full px-3 py-1 text-sm font-medium
${
task.status === "Completed"
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