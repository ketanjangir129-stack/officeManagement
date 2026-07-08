import { useEffect, useState } from "react";
import EmployeeTaskTable from "../../components/task/EmployeeTaskTable";
import { subscribeEmployees } from "../../services/employeeService";

function TaskManagement() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

 useEffect(() => {
  const unsubscribe = subscribeEmployees(setEmployees);

  return () => unsubscribe();
}, []);

  const loadEmployees = async () => {
    const employeeList = await getAllEmployees();
    setEmployees(employeeList);
  };

  const handleAssignTask = (employee) => {
    setSelectedEmployee(employee);
    console.log(employee);
  };

  return (
    <EmployeeTaskTable
      employees={employees}
      onAssignTask={handleAssignTask}
    />
  );
}

export default TaskManagement;
