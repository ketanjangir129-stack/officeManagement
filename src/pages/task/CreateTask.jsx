import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../../components/task/TaskForm";
import { createTask } from "../../services/taskService";

function CreateTask() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Temporary employee data
  // Replace this with Firebase data later
  const employees = [
    {
      uid: "uid1",
      name: "Rahul",
    },
    {
      uid: "uid2",
      name: "Aman",
    },
    {
      uid: "uid3",
      name: "Mukesh",
    },
  ];

  const handleSubmit = async (taskData) => {
    try {
      setIsSubmitting(true);

      const result = await createTask(taskData);

      if (result.success) {
        alert("Task created successfully.");

        // navigate("/tasks");
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-task-page">
      <TaskForm
        employees={employees}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default CreateTask;