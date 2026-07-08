import TaskForm from "./TaskForm";

function AssignTaskModal({
  isOpen,
  employee,
  onClose,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-3xl rounded-xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Assign Task
            </h2>
            <p className="text-sm text-gray-500">
              Assign a new task to an employee
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-500 px-3 py-2 text-white transition hover:bg-red-600"
          >
            ✕
          </button>
        </div>

        {/* Employee Info */}
        <div className="mx-6 mt-6 rounded-lg bg-blue-50 p-4">
          <h3 className="mb-2 text-lg font-semibold text-blue-700">
            Employee Details
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold">{employee?.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Designation</p>
              <p className="font-semibold">{employee?.designation}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Employee ID</p>
              <p className="font-semibold">{employee?.employeeId}</p>
            </div>
          </div>
        </div>

        {/* Task Form */}
        <div className="p-6">
          <TaskForm
            employee={employee}
            hideEmployeeSelection={true}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
    

  );
}

export default AssignTaskModal;