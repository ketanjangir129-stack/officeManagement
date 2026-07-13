import {db} from "../firebase/firebase";

import {
    ref, 
    push,
    set,
    get,
    update,
    remove,
    onValue
} from "firebase/database";

const tasksRef= ref(db,"tasks");

export const createTask = async (taskData) => {
  try {
    // Generate a unique Firebase key
    const newTaskRef = push(ref(db, "tasks"));

    // Save task data
    await set(newTaskRef, {
      ...taskData,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return {
      success: true,
      taskId: newTaskRef.key,
    };
  } catch (error) {

    return {
      success: false,
      error: error.message,
    };
  }
  
};
export const subscribeTasks = (callback) => {
  const tasksRef = ref(db, "tasks");

  return onValue(tasksRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();

      const taskArray = Object.entries(data).map(
        ([taskId, value]) => ({
          taskId,
          ...value,
        })
      );

      callback(taskArray);
    } else {
      callback([]);
    }
  });
};


export const getAllTasks = async () => {
  try {
    const snapshot = await get(tasksRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    return {};
  } catch (error) {
    console.error(error);

    return {};
  }
};

export const getTaskById = async (taskId) => {
  try {
    const snapshot = await get(ref(db, `tasks/${taskId}`));

    if (snapshot.exists()) {
      return snapshot.val();
    }

    return null;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const updateTask = async (taskId, updatedData) => {
  try {
    await update(ref(db, `tasks/${taskId}`), {
      ...updatedData,
      updatedAt: Date.now(),
    });

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};

export const deleteTask = async (taskId)=>{
    try { 
        await remove(ref(db,`tasks/${taskId}`));
        return true;
    } catch (error){
        console.error(error);
        return false;
    }
};

export const updateEmployeeStatus = async(
    taskId,
    employeeId,
    status
)=>{
    try{
        await update(
            ref(db, `tasks/${taskId}/assignedEmployees/${employeeId}`),
             {
        status,
        updatedAt: Date.now(),
      }
        );
        return true;
    } catch (error)
{
    console.error(error);
    return false
}
};