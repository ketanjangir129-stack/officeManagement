import { createContext, useContext, useEffect, useState } from "react";
import { ref, onValue, push, set, update, remove } from "firebase/database";

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
      const duplicateErrors = {};

      const employeeIdExists = employees.some(
        (employee) =>
          employee.employeeId?.trim().toLowerCase() ===
          employeeData.employeeId?.trim().toLowerCase()
      );

      if (employeeIdExists) {
        duplicateErrors.employeeId =
          "Employee ID already exists";
      }

      const emailExists = employees.some(
        (employee) =>
          employee.email?.trim().toLowerCase() ===
          employeeData.email?.trim().toLowerCase()
      );

      if (emailExists) {
        duplicateErrors.email =
          "Email already exists";
      }

      const phoneExists = employees.some(
        (employee) =>
          employee.phone?.trim() ===
          employeeData.phone?.trim()
      );

      if (phoneExists) {
        duplicateErrors.phone =
          "Phone number already exists";
      }

      if (Object.keys(duplicateErrors).length > 0) {
        return {
          success: false,
          errors: duplicateErrors,
        };
      }

      const employeeRef = push(ref(db, "employees"));

      await set(employeeRef, {
        ...employeeData,
        password:employeeData.employeeId,
        passwordChanged: false,
        role:"employee",
        createdAt: Date.now(),
      });

      return {
        success: true,
      };

    } catch (error) {
      console.error(error);

      return {
        success: false,
        errors: {
          general: "Something went wrong",
        },
      };
    }
  };

  // update Employee
  const updateEmployee = async (employeeId,updatedData) => {
    try {
      await update(
        ref(db, `employees/${employeeId}`),
        updatedData
      );

      console.log("Employee Updated");
    } catch (error) {
      console.error(error);
    }
  };

  // delete Employee
  const deleteEmployee = async (employeeId) => {
    try {
      await remove(
        ref(db, `employees/${employeeId}`)
      );

      console.log("Employee Deleted");
    } catch (error) {
      console.error(error);
    }
  };

  // status active or inactive
  const updateOnlineStatus = async (
    employeeId,
    isOnline
  ) => {
    try {
      await update(
        ref(db, `employees/${employeeId}`),
        {
          isOnline,
        }
      );
       console.log("Status Updated:",isOnline);
    } catch (error) {
      console.error(error);
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
        updateEmployee,
        deleteEmployee,
        updateOnlineStatus
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  return useContext(EmployeeContext);
};