import { useState } from "react";

function TaskForm({
  initialData = {},
  employees = [],
  onSubmit,
  isSubmitting = false,
  employee = null,
  hideEmployeeSelection = false,
}) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    priority: initialData.priority || "Medium",
    deadline: initialData.deadline || "",
    assignedEmployees: initialData.assignedEmployees || {},
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmployeeSelect = (employee) => {
    setFormData((prev) => {
      const updatedEmployees = {
        ...prev.assignedEmployees,
      };

      if (updatedEmployees[employee.id]) {
        delete updatedEmployees[employee.id];
      } else {
        updatedEmployees[employee.id] = {
          name: employee.fullName,
          status: "Pending",
          assignedAt: Date.now().toLocaleString("g-b"),
          updatedAt: null,
        };
      }

      return {
        ...prev,
        assignedEmployees: updatedEmployees,
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.deadline) {
      newErrors.deadline = "Deadline is required";
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const taskData = { ...formData };

    if (hideEmployeeSelection && employee) {
      taskData.assignedEmployees = {
        [employee.id]: {
          name: employee.fullName,
          status: "Pending",
          assignedAt: Date.now(),
          updatedAt: null,
        },
      };
    }

    onSubmit(taskData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl bg-white"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Create Task
        </h2>
        <p className="text-sm text-slate-500">
          Fill in the task details below.
        </p>
      </div>

      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Task Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">
            {errors.title}
          </p>
        )}
      </div>

      {/* Description */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Description
        </label>

        <textarea
          rows={5}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the task..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description}
          </p>
        )}
      </div>

      {/* Priority & Deadline */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          >
            <option value="Low">Low</option>

            <option value="Medium">Medium</option>

            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Deadline
          </label>

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          />

          {errors.deadline && (
            <p className="mt-1 text-sm text-red-500">
              {errors.deadline}
            </p>
          )}
        </div>

      </div>

      {/* Employee Selection */}

      {!hideEmployeeSelection && (
        <div>
          <label className="mb-3 block text-sm font-medium text-slate-700">
            Assign Employees
          </label>

          <div className="max-h-52 space-y-2 overflow-y-auto rounded-xl border border-slate-200 p-4">

            {employees.length === 0 ? (
              <p className="text-slate-500">
                No employees available
              </p>
            ) : (
              employees.map((employee) => (
                <label
                  key={employee.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-slate-100"
                >
                  <input
                    type="checkbox"
                    checked={
                      !!formData.assignedEmployees[employee.id]
                    }
                    onChange={() =>
                      handleEmployeeSelect(employee)
                    }
                    className="h-4 w-4 accent-violet-600"
                  />

                  <span className="font-medium">
                    {employee.fullName}
                  </span>

                  <span className="text-sm text-slate-500">
                    ({employee.employeeId})
                  </span>
                </label>
              ))
            )}

          </div>

          {errors.assignedEmployees && (
            <p className="mt-2 text-sm text-red-500">
              {errors.assignedEmployees}
            </p>
          )}
        </div>
      )}

      {/* Submit */}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? "Saving..." : "Save Task"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;