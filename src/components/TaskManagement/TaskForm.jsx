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

// ------------------------
// Handle Input Change
// ------------------------

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
  ...prev,
  [name]: value,
  }));
  // Remove error only when actual value exists
  if (value.trim()) {
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }
};

// ------------------------
// Select Employee
// ------------------------

const handleEmployeeSelect = (emp) => {
setFormData((prev) => {
const updatedEmployees = {
  ...prev.assignedEmployees,
};

if (updatedEmployees[emp.id]) {
  delete updatedEmployees[emp.id];
} else {
  updatedEmployees[emp.id] = {
    name: emp.fullName,
    status: "Pending",
    assignedAt: Date.now(),
    updatedAt: null,
  };
}

return {
  ...prev,
  assignedEmployees: updatedEmployees,
};
});
};

// ------------------------
// Validation
// ------------------------

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
} else {
const today = new Date();
today.setHours(0, 0, 0, 0);

const selectedDate = new Date(formData.deadline);

if (selectedDate < today) {
  newErrors.deadline =
    "Deadline cannot be in the past";
}
}

if (
  !hideEmployeeSelection &&
  Object.keys(formData.assignedEmployees).length === 0
) {
  newErrors.assignedEmployees =
    "Please select at least one employee";
}

setErrors(newErrors);

return Object.keys(newErrors).length === 0;
};

// ------------------------
// Submit
// ------------------------

const handleSubmit = async (e) => {
e.preventDefault();

if (!validateForm()) return;

const taskData = { ...formData };

await onSubmit(taskData);

};

return (
<form
onSubmit={handleSubmit}
className="space-y-6"
>
{/* Header */}

<div>
  <h2 className="text-2xl font-bold text-slate-800">
    Create Task
  </h2>

  <p className="text-sm text-slate-500">
    Assign a new task to employees.
  </p>
</div>

{/* Title */}

<div>
  <label className="mb-2 block font-medium">
    Task Title
  </label>

  <input
    type="text"
    name="title"
    value={formData.title}
    onChange={handleChange}
    placeholder="Enter task title"
    className="w-full rounded-xl border p-3 focus:border-violet-500 focus:outline-none"
  />

  {errors.title && (
    <p className="mt-1 text-sm text-red-500">
      {errors.title}
    </p>
  )}
</div>

{/* Description */}

<div>
  <label className="mb-2 block font-medium">
    Description
  </label>

  <textarea
    rows="4"
    name="description"
    value={formData.description}
    onChange={handleChange}
    placeholder="Task Description"
    className="w-full rounded-xl border p-3 focus:border-violet-500 focus:outline-none"
  />

  {errors.description && (
    <p className="mt-1 text-sm text-red-500">
      {errors.description}
    </p>
  )}
</div>

{/* Priority + Deadline */}

<div className="grid gap-5 md:grid-cols-2">

  <div>

    <label className="mb-2 block font-medium">
      Priority
    </label>

    <select
      name="priority"
      value={formData.priority}
      onChange={handleChange}
      className="w-full rounded-xl border p-3 focus:border-violet-500 focus:outline-none"
    >
      <option value="Low">Low</option>

      <option value="Medium">Medium</option>

      <option value="High">High</option>
    </select>

  </div>

  <div>

    <label className="mb-2 block font-medium">
      Deadline
    </label>

    <input
      type="date"
      name="deadline"
      min={new Date().toISOString().split("T")[0]}
      value={formData.deadline}
      onChange={handleChange}
      className="w-full rounded-xl border p-3 focus:border-violet-500 focus:outline-none"
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

    <label className="mb-3 block font-medium">
      Assign Employees
    </label>

    <div className="max-h-56 space-y-2 overflow-y-auto rounded-xl border p-4">

      {employees.length === 0 ? (

        <p className="text-slate-500">
          No employees available
        </p>

      ) : (

        employees.map((emp) => (

          <label
            key={emp.id}
            className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-slate-100"
          >

            <input
              type="checkbox"
              checked={
                !!formData.assignedEmployees[emp.id]
              }
              onChange={() =>
                handleEmployeeSelect(emp)
              }
            />

            <span className="font-medium">
              {emp.fullName}
            </span>

            <span className="text-sm text-slate-500">
              ({emp.employeeId})
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
    className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:bg-slate-400"
  >
    {isSubmitting ? "Saving..." : "Create Task"}
  </button>

</div>

</form>
);
}

export default TaskForm;