import { update, ref } from "firebase/database";
import { db } from "../firebase/firebase";

export const assignTaskToEmployee = async (employeeId, taskId) => {
  try {
    await update(ref(db, `employees/${employeeId}`), {
      [`assignedTasks/${taskId}`]: {
        status: "Pending",
        assignedAt: Date.now(),
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Assign Task Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};