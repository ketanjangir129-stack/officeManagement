import { createContext, useContext, useEffect, useState } from "react";
import { ref, onValue, push, set } from "firebase/database";

import { db } from "../firebase/firebase";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = () => {
    const employeeRef = ref(db, "employees");

    onValue(employeeRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setEmployees([]);
        setLoading(false);
        return;
      }

      const employeeList = Object.entries(data).map(
        ([id, employee]) => ({
          id,
          ...employee,
        })
      );

      setEmployees(employeeList);
      setLoading(false);
    });
  };

  const addEmployee = async (employeeData) => {
  try {
    console.log("Starting Firebase Write");

    const employeeRef = push(ref(db, "employees"));

    console.log("Generated Key:", employeeRef.key);

    await set(employeeRef, {
      ...employeeData,
      createdAt: Date.now(),
    });

    console.log("Firebase Write Completed");
  } catch (error) {
    console.error("Firebase Error:", error);
  }
};

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        addEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  return useContext(EmployeeContext);
};