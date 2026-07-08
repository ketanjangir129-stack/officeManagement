
import AddEmployeeModal from "../../components/employee/AddEmployeeModal";

import { useEmployees } from "../../context/EmployeeContext";


function EmployeeTaskTable({employees, onAssignTask}){
     if (!employees || employees.length === 0) {
    return (
      <div className="no-data">
        <h3>No Employees Found</h3>
      </div>
    );
  }

  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Status</th>
            <th>Assigned Tasks</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <td>{index + 1}</td>

              <td>{employee.employeeId}</td>

              <td>{employee.fullName}</td>

              <td>{employee.department}</td>


              <td>
                <span
                  className={
                    employee.status === "Active"
                      ? "status-active"
                      : "status-inactive"
                  }
                >
                  {employee.status}
                </span>
              </td>

              <td>
                {employee.assignedTasks
                  ? Object.keys(employee.assignedTasks).length
                  : 0}
              </td>

              <td>
                <button
                  className="assign-btn"
                  onClick={() => onAssignTask(employee)}
                >
                  Assign Task
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTaskTable;