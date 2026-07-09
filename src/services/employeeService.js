import { update, ref } from "firebase/database";
import { db } from "../firebase/firebase";

export const assignTaskToEmployee = async (
  employeeId,
  taskId,
  task
) => {
  try {
    await update(
      ref(db, `employees/${employeeId}/assignedTasks`),
      {
        [taskId]: {
          title: task.title,
          priority: task.priority,
          deadline: task.deadline,
          status: "Pending",
          assignedAt: Date.now(),
        },
      }
    );

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};