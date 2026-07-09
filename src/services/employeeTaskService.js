import { db } from "../firebase/firebase";
import { ref, get, update } from "firebase/database";

// Fetch all tasks assigned to one employee
const getEmployeeTasks = async (employeeId) => {
  try {
    // Get assigned tasks
    const assignSnapshot = await get(
      ref(db, `assignTask/${employeeId}`)
    );

    if (!assignSnapshot.exists()) {
      return [];
    }

    const assignedTasks = assignSnapshot.val();

    const tasks = [];

    // Loop through each task ID
    for (const taskId of Object.keys(assignedTasks)) {
      const taskSnapshot = await get(
        ref(db, `tasks/${taskId}`)
      );

      if (taskSnapshot.exists()) {
        tasks.push({
          taskId,
          ...taskSnapshot.val(),

          // Data from assignTask
          status: assignedTasks[taskId].status,
          assignedAt: assignedTasks[taskId].assignedAt,
        });
      }
    }

    return tasks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const updateEmployeeTaskStatus = async (
  employeeId,
  taskId,
  status
) => {
  try {
    await update(
      ref(db, `assignTask/${employeeId}/${taskId}`),
      {
        status,
        updatedAt: Date.now(),
      }
    );

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export {
    getEmployeeTasks,
    updateEmployeeTaskStatus
}