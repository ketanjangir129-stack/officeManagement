import { db } from "../firebase/firebase";
import { ref, onValue } from "firebase/database";

export const subscribeEmployees = (callback) => {
  const employeeRef = ref(db, "employees");

  return onValue(employeeRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }

    const data = snapshot.val();

    const employees = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    callback(employees);
  });
};
