import { db } from "../firebase/firebase";
import {
  ref,
  push,
  set,
  onValue,
  update,
} from "firebase/database";

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