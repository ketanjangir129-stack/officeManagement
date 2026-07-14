import { ref, update,remove , onValue,get } from "firebase/database";
import { db } from "../firebase/firebase";

export const subscribeEmployeeTasks = (
  employeeId,
  callback
) => {
  const assignRef = ref(db, `assignTask/${employeeId}`);

  return onValue(assignRef, async (snapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }

    const assignedTasks = snapshot.val();

    const tasksSnapshot = await get(ref(db, "tasks"));

    if (!tasksSnapshot.exists()) {
      callback([]);
      return;
    }

    const allTasks = tasksSnapshot.val();

    const employeeTasks = Object.keys(assignedTasks)
      .filter((taskId) => allTasks[taskId])
      .map((taskId) => ({
        taskId,
        ...allTasks[taskId],
        status: assignedTasks[taskId].status,
        assignedAt: assignedTasks[taskId].assignedAt,
      }));

    callback(employeeTasks);
  });
};
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

export const updateTask = async (taskId, updatedTask) => {
  try {
    await update(
      ref(db, `tasks/${taskId}`),
      updatedTask
    );

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getAssignedEmployees = async (taskId) => {
  try {
    // Get all task assignments
    const assignSnapshot = await get(ref(db, "assignTask"));

    // Get all employees
    const employeeSnapshot = await get(ref(db, "employees"));

    if (!assignSnapshot.exists() || !employeeSnapshot.exists()) {
      return [];
    }

    const assignments = assignSnapshot.val();
    const employees = employeeSnapshot.val();

    const assignedEmployees = [];

    for (const employeeId in assignments) {
      if (assignments[employeeId][taskId]) {
        if (employees[employeeId]) {
          assignedEmployees.push({
            id: employeeId,
            ...employees[employeeId],
            status: assignments[employeeId][taskId].status,
            assignedAt: assignments[employeeId][taskId].assignedAt,
          });
        }
      }
    }

    return assignedEmployees;
  } catch (error) {
    console.error(error);
    return [];
  }
};
