function TaskDetailsModal({
  isOpen,
  task,
  onClose,
}) {
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

        <div className="space-y-6 p-6">

          {/* Title */}

          <div>
            <p className="text-sm text-slate-500">
              Task Title
            </p>

            <h3 className="mt-1 text-xl font-semibold text-slate-800">
              {task.title}
            </h3>
          </div>

          {/* Description */}

          <div>
            <p className="text-sm text-slate-500">
              Description
            </p>

            <div className="mt-2 rounded-xl bg-slate-100 p-4">
              {task.description}
            </div>
          </div>

          {/* Priority + Deadline */}

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <p className="text-sm text-slate-500">
                Priority
              </p>

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

              <p className="text-sm text-slate-500">
                Deadline
              </p>

              <p className="mt-2 font-semibold">
                {task.deadline}
              </p>

            </div>

          </div>

          {/* Created */}

          <div>

            <p className="text-sm text-slate-500">
              Created On
            </p>

            <p className="mt-2">
              {new Date(task.createdAt).toLocaleString("en-gb")}
            </p>

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
  );
}

export default TaskDetailsModal;