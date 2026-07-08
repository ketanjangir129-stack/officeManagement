import { useParams } from "react-router-dom";
import { useEmployees } from "../../context/EmployeeContext";

function EmployeeDetails() {
  const { id } = useParams();

  const { employees } = useEmployees();

  const employee = employees.find(
    (emp) => emp.id === id
  );

  if (!employee) {
    return (
      <div className="text-center py-20">
        Employee Not Found
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Employee Details
          </h1>

          <p className="text-slate-500 mt-1">
            Complete employee information
          </p>
        </div>

        <div className="flex gap-3">
          <button
            className="
            px-5
            py-3
            rounded-xl
            bg-blue-600
            text-white
            hover:bg-blue-700
            transition
            "
          >
            Edit
          </button>

          <button
            className="
            px-5
            py-3
            rounded-xl
            bg-red-600
            text-white
            hover:bg-red-700
            transition
            "
          >
            Delete
          </button>
        </div>
      </div>

      {/* Employee Card */}

      <div
        className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-sm
        p-8
        "
      >
        <div className="flex items-center gap-5 mb-8">

          <div
            className="
            w-20
            h-20
            rounded-full
            bg-violet-100
            text-violet-600
            flex
            items-center
            justify-center
            text-3xl
            font-bold
            "
          >
            {employee.fullName?.charAt(0)}
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {employee.fullName}
            </h2>

            <p className="text-slate-500">
              {employee.designation}
            </p>
          </div>
        </div>

        {/* Details Grid */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
          "
        >
          <Info
            label="Employee ID"
            value={employee.employeeId}
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
            label="Date of Birth"
            value={employee.dob}
          />

          <Info
            label="Designation"
            value={employee.designation}
          />

          <Info
            label="Joining Date"
            value={employee.joiningDate}
          />

          <Info
            label="City"
            value={employee.city}
          />

          <Info
            label="State"
            value={employee.state}
          />

          <Info
            label="Pincode"
            value={employee.pincode}
          />

          <Info
            label="Status"
            value={employee.status}
          />
        </div>

        {/* Address */}

        <div className="mt-8">
          <h3 className="font-semibold text-slate-700 mb-2">
            Address
          </h3>

          <div
            className="
            p-4
            rounded-xl
            bg-slate-50
            border
            "
          >
            {employee.address}
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <h3 className="font-semibold text-slate-800 mt-1">
        {value || "-"}
      </h3>
    </div>
  );
}

export default EmployeeDetails;