import { useEmployees } from "../../context/EmployeeContext";

function EmployeeDashboard() {

    const employeeId =
        localStorage.getItem("employeeId");

    const { employees } = useEmployees();

    const employee = employees.find(
        (emp) => emp.id === employeeId
    );

    if (!employee) {
        return (
            <div className="p-10">
                Employee Not Found
            </div>
        );
    }

    return (
        <div className="p-8">

            <div className="bg-white rounded-3xl border p-8">

                <h1 className="text-3xl font-bold mb-6">
                    My Profile
                </h1>

                <div className="grid md:grid-cols-2 gap-6">

                    <Info
                        label="Employee ID"
                        value={employee.employeeId}
                    />

                    <Info
                        label="Name"
                        value={employee.fullName}
                    />

                    <Info
                        label="Email"
                        value={employee.email}
                    />

                    <Info
                        label="Phone"
                        value={employee.phone}
                    />

                    <Info
                        label="Designation"
                        value={employee.designation}
                    />

                    <Info
                        label="Status"
                        value={employee.status}
                    />

                </div>

            </div>

        </div>
    );
}

function Info({ label, value }) {
    return (
        <div>
            <p className="text-slate-500">
                {label}
            </p>

            <h3 className="font-semibold">
                {value}
            </h3>
        </div>
    );
}

export default EmployeeDashboard;