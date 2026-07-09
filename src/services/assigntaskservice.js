import { ref, update } from "firebase/database";
import { db } from "../firebase/firebase";

export const assignTask = async (
  employeeId,
  taskId,
  taskData
) => {
  try {
    await update(ref(db, `assignTask/${employeeId}`), {
      [taskId]: {
        status: "Pending",
        assignedAt: Date.now(),
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error.message,
    };
  }
};