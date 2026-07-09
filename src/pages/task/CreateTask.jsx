import { useNavigate } from "react-router-dom";
import TaskForm from "../../components/task/TaskForm";
import { createTask } from "../../services/taskService";
import { assignTask  } from "../../services/assigntaskservice";
import { useEmployees } from "../../context/EmployeeContext";

function CreateTask() {
const navigate = useNavigate();
const { employees } = useEmployees();

const handleCreateTask = async (taskData) => {


  const result = await createTask(taskData);

  

  if (!result.success) {
    
    return;
  }

  const taskId = result.taskId;


  const employeeIds = Object.keys(taskData.assignedEmployees);


  for (const empId of employeeIds) {


    await assignTask(empId, taskId, taskData);

  }
};

return (
  <TaskForm
    employees={employees}
    onSubmit={handleCreateTask}
  />
);
}

export default CreateTask;