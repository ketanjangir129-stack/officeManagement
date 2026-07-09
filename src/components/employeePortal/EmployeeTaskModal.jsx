function EmployeeTaskModal({
isOpen,
task,
onClose,
onStatusChange,
}) {
if (!isOpen || !task) return null;

const priorityColor = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};
const handleStatusChange = async (taskId, status) => {
const success = await updateEmployeeTaskStatus(
  employeeId,
  taskId,
  status
);


if (success) {
  await loadTasks();
  setShowModal(false);
  setSelectedTask(null);
}
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
            View and update task status
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

      <div className="space-y-6 p-6">

        <div>
          <label className="text-sm text-slate-500">
            Task Title
          </label>

          <h3 className="mt-1 text-xl font-semibold text-slate-800">
            {task.title}
          </h3>
        </div>

        <div>
          <label className="text-sm text-slate-500">
            Description
          </label>

          <p className="mt-2 rounded-xl bg-slate-100 p-4 text-slate-700">
            {task.description}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="text-sm text-slate-500">
              Priority
            </label>

            <div className="mt-2">
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  priorityColor[task.priority]
                }`}
              >
                {task.priority}
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-500">
              Deadline
            </label>

            <p className="mt-2 font-semibold text-slate-700">
              {task.deadline}
            </p>
          </div>

        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-500">
            Task Status
          </label>

          <select
            value={task.status}
            onChange={(e) =>{
            onStatusChange(task.taskId, e.target.value);
            onClose();
            }
            }
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-violet-500 focus:outline-none"
          >
            <option value="Pending">
              Pending
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>
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
);
}

export default EmployeeTaskModal;