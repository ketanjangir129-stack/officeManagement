import { ref, update,remove , onValue,get } from "firebase/database";
import { db } from "../firebase/firebase";

export const subscribeAssignedTasks = (callback) => {
  const assignRef = ref(db, "assignTask");

  return onValue(assignRef, (snapshot) => {
    callback(snapshot.exists() ? snapshot.val() : {});
  });
};


export const globaldelete = async (taskId) => {
  try {
    // Delete task
     
    await remove(ref(db, `tasks/${taskId}`));

    // Get all assignments
    const snapshot = await get(ref(db, "assignTask"));

    if (snapshot.exists()) {
      const assignments = snapshot.val();

      // Remove task from every employee
      for (const employeeId in assignments) {
        if (assignments[employeeId][taskId]) {
          await remove(
            ref(db, `assignTask/${employeeId}/${taskId}`)
          );
        }
      }
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const removeTaskAssignment = async (
  employeeId,
  taskId
) => {
  try {
    await remove(
      ref(db, `assignTask/${employeeId}/${taskId}`)
    );

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
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