import { useState } from "react";
import "./TaskForm.css";

function TaskForm({
  initialData = {},
  employees = [],
  onSubmit,
  isSubmitting = false,
}) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    priority: initialData.priority || "Medium",
    deadline: initialData.deadline || "",
    assignedEmployees: initialData.assignedEmployees || {},
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle employee selection
  const handleEmployeeSelect = (employee) => {
    setFormData((prev) => {
      const updatedEmployees = {
        ...prev.assignedEmployees,
      };

      if (updatedEmployees[employee.uid]) {
        delete updatedEmployees[employee.uid];
      } else {
        updatedEmployees[employee.uid] = {
          name: employee.name,
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

  // Validation
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

    if (Object.keys(formData.assignedEmployees).length === 0) {
      newErrors.assignedEmployees =
        "Please assign at least one employee";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Create Task</h2>

      {/* Task Title */}
      <div className="form-group">
    <label>Task Title</label>

    <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
    />

    {errors.title && <p className="error">{errors.title}</p>}
</div>

      {/* Description */}
      <div>
        <label>Description</label>

        <textarea
          name="description"
          rows="5"
          placeholder="Enter task description"
          value={formData.description}
          onChange={handleChange}
        />

        {errors.description && (
          <p className="error">{errors.description}</p>
        )}
      </div>

      {/* Priority */}
      <div className="row">
         <div className="form-group">
        <label>Priority</label>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>

          <option value="Medium">Medium</option>

          <option value="High">High</option>
        </select>
        </div>
     

      {/* Deadline */}
      <div className="form-group">
        <label>Deadline</label>

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
        />

        {errors.deadline && (
          <p className="error">{errors.deadline}</p>
        )}
      </div>
       </div>

      {/* Employee Selection */}
      <div className="form-group">
        <label>Assign Employees</label>

        {employees.length === 0 ? (
          <p>No employees available</p>
        ) : (
          employees.map((employee) => (
            <div className="employee-item" key={employee.uid}>
              <label>
                <input
                  type="checkbox"
                  checked={
                    !!formData.assignedEmployees[employee.uid]
                  }
                  onChange={() =>
                    handleEmployeeSelect(employee)
                  }
                />

                {employee.name}
              </label>
            </div>
          ))
        )}

        {errors.assignedEmployees && (
          <p className="error">
            {errors.assignedEmployees}
          </p>
        )}
      </div>

      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Task"}
      </button>
    </form>
  );
}

export default TaskForm;