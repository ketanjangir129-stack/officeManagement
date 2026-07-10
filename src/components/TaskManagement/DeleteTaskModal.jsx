import { Deletebutton } from "../../services/taskService";
import { removeTaskAssignment } from "../../services/assignTaskService";
import { toast } from "react-toastify";

function DeleteTaskModal({
  isOpen,
  task,
  onClose,
  onDeleted,
}) {
  if (!isOpen || !task) return null;

  const handleDelete = async (taskId) => {
  const confirmDelete = window.confirm(
    "Remove task from the employees?"
  );

  if (!confirmDelete) return;

  const success = await deleteTaskGlobally(taskId);

  if (success) {
    toast.success("Task Removed Successfully");

    reloadTasks();
  }
};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="border-b p-6">
          <h2 className="text-2xl font-bold text-red-600">
            Delete Task
          </h2>

          <p className="mt-2 text-slate-500">
            This action cannot be undone.
          </p>
        </div>

        {/* Body */}

        <div className="space-y-4 p-6">

          <p>
            Are you sure you want to delete
          </p>

          <div className="rounded-xl bg-slate-100 p-4">

            <h3 className="font-semibold">
              {task.title}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              {task.description}
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-5 py-2 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteTaskModal;