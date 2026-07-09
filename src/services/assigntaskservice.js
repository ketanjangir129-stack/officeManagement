import { ref, update, onValue } from "firebase/database";
import { db } from "../firebase/firebase";

export const subscribeAssignedTasks = (callback) => {
  const assignRef = ref(db, "assignTask");

  return onValue(assignRef, (snapshot) => {
    callback(snapshot.exists() ? snapshot.val() : {});
  });
};

export const assignTask = async (
  employeeId,
  taskId
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