import "./EmployeeTaskTable.css";

function EmployeeTaskTable({
  employees,
  onAssignTask,
}) {
  return (
    <table className="employee-table">

      <thead>

        <tr>

          <th>Employee ID</th>

          <th>Name</th>

          <th>Department</th>

          <th>Status</th>

          <th>Action</th>

        </tr>

      </thead>

      <tbody>

        {employees.map((employee) => (

          <tr key={employee.id}>

            <td>{employee.employeeId}</td>

            <td>{employee.fullName}</td>

            <td>{employee.department}</td>

            <td>{employee.status}</td>

            <td>

              <button
                className="assign-btn"
                onClick={() =>
                  onAssignTask(employee)
                }
              >
                Assign Task
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default EmployeeTaskTable;