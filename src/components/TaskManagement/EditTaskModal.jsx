import TaskForm from "./TaskForm";
import { updateTask } from "../../services/taskService";
import { toast } from "react-toastify";

function EditTaskModal({
  isOpen,
  task,
  onClose,
}) {
  if (!isOpen || !task) return null;

  const handleUpdate = async (updatedTask) => {
  const success = await updateTask(
    task.taskId,
    updatedTask
  );

  if (success) {
    toast.success("Task Updated Successfully");
    onClose();
  } else {
    toast.error("Failed to update task");
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div>
            <h2 className="text-2xl font-bold">
              Edit Task
            </h2>

            <p className="text-sm text-slate-500">
              Update task details
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600"
          >
            ✕
          </button>

        </div>

        {/* Form */}

        <div className="p-6">

          <TaskForm
            initialData={task}
            onSubmit={handleUpdate}
            hideEmployeeSelection={true}
          />

        </div>

      </div>

    </div>
  );
}

export default EditTaskModal;