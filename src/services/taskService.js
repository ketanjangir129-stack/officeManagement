import {db} from "../firebase/firebase";

import {
    ref, 
    push,
    set,
    get,
    update,
    remove,
} from "firebase/database";

const tasksRef= ref(db,"tasks");

export const createTask = async (taskdata) =>{
    try {
        const newTaskRef = push(tasksRef);
        
        await set(newTaskRef,{
            ...taskdata,
            createdAt: Date.now(),
            updatedAt: Date.now(),

        });
        return {
            success: true,
            id: newTaskRef.key,
        };
    } catch (error){
        console.error("Create Task Error:", error);
        return {
            success: false,
            error: error.message,
        };
    }
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
