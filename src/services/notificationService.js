import { db } from "../firebase/firebase";
import {
  ref,
  push,
  set,
  onValue,
  update,
} from "firebase/database";
import { getTaskById } from "./taskService";

export const createNotification = async (
  employeeId,
  taskId
) => {
  const notificationRef = push(
    ref(db, `notifications/${employeeId}`)
  );

  await set(notificationRef, {
    message: "New Task Assigned",
    taskId,
    type: "assign",
    read: false,
    createdAt: Date.now(),
  });
};

export const subscribeNotifications = (
  employeeId,
  callback
) => {
  const notificationRef = ref(
    db,
    `notifications/${employeeId}`
  );

  return onValue(notificationRef, (snapshot) => {
    callback(snapshot.val() || {});
  });
};

export const markAsRead = async (
  employeeId,
  notificationId
) => {
  await update(
    ref(
      db,
      `notifications/${employeeId}/${notificationId}`
    ),
    {
      read: true,
    }
  );
};

export const createUnassignNotification = async (
  employeeId,
  taskId
) => {
  try {
    const task = await getTaskById(taskId);

    const notificationRef = push(
      ref(db, `notifications/${employeeId}`)
    );

    await set(notificationRef, {
      title: "Task Unassigned",
      message: `Task has been unassigned`,
      taskId,
      type: "unassign",
      createdAt: Date.now(),
      read: false,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};