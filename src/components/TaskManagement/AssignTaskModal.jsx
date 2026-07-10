import TaskForm from "./TaskForm";

function AssignTaskModal({
  isOpen,
  employee,
  onClose,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
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
            className="rounded-xl bg-red-500 px-3 py-2 text-white transition hover:bg-red-600 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}

        <div className="max-h-[calc(90vh-80px)] overflow-y-auto hide-scrollbar">

          {/* Employee Info */}

          <div className="mx-6 mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <h3 className="mb-4 text-lg font-semibold text-blue-700">
              Employee Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">
                  Name
                </p>

                <p className="font-semibold text-slate-800">
                  {employee?.fullName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Designation
                </p>

                <p className="font-semibold text-slate-800">
                  {employee?.designation}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Employee ID
                </p>

                <p className="font-semibold text-slate-800">
                  {employee?.employeeId}
                </p>
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
    </div>
  );
}

export default AssignTaskModal;