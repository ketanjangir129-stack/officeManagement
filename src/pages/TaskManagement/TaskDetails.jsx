import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllTasks } from "../../services/taskService";
import {TaskTable} from "../../components/TaskManagement/TaskTable"
function TaskDetailsPage() {
 const [tasks, setTasks] = useState([]);
  const { taskId } = useParams();
  const loadTasks = async () => {
    setLoading(true);

    const data = await getAllTasks();

    if (data) {
      const taskArray = Object.entries(data).map(
        ([id, value]) => ({
          id,
          ...value,
        })
      );

      setTasks(taskArray);
    } else {
      setTasks([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      Task ID: {taskId}
    </div>
  );
}

export default TaskDetailsPage;