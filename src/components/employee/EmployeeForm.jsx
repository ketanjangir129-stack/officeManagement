import { useState } from "react";
import { useEmployees } from "../../context/EmployeeContext";

function EmployeeForm({ onClose }) {
  const { addEmployee } = useEmployees();

  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    fatherName: "",
    dob: "",
    gender: "",
    department: "",
    designation: "",
    joiningDate: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    vehicleNumber: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    try {
        await addEmployee(formData);

        console.log("Employee Saved Successfully");

        onClose();
    } catch (error) {
        console.error("Save Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      <input
        name="employeeId"
        placeholder="Employee ID"
        onChange={handleChange}
        className="border rounded-xl p-3"
      />

      <input
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        className="border rounded-xl p-3"
      />

      <input
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
        className="border rounded-xl p-3"
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border rounded-xl p-3"
      />

      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        className="border rounded-xl p-3"
      />

      <input
        name="fatherName"
        placeholder="Father Name"
        onChange={handleChange}
        className="border rounded-xl p-3"
      />

      <input
        type="date"
        name="dob"
        onChange={handleChange}
        className="border rounded-xl p-3"
      />

      <input
        name="department"
        placeholder="Department"
        onChange={handleChange}
        className="border rounded-xl p-3"
      />

      <input
        name="designation"
        placeholder="Designation"
        onChange={handleChange}
        className="border rounded-xl p-3"
      />

      <input
        type="date"
        name="joiningDate"
        onChange={handleChange}
        className="border rounded-xl p-3"
      />

      <input
        name="vehicleNumber"
        placeholder="Vehicle Number"
        onChange={handleChange}
        className="border rounded-xl p-3"
      />

      <input
        name="city"
        placeholder="City"
        onChange={handleChange}
        className="border rounded-xl p-3"
      />

      <input
        name="state"
        placeholder="State"
        onChange={handleChange}
        className="border rounded-xl p-3"
      />

      <input
        name="pincode"
        placeholder="Pincode"
        onChange={handleChange}
        className="border rounded-xl p-3"
      />

      <textarea
        name="address"
        placeholder="Address"
        onChange={handleChange}
        className="
        border
        rounded-xl
        p-3
        md:col-span-2
        "
      />

      <button
        type="submit"
        className="
        md:col-span-2
        bg-violet-600
        text-white
        py-3
        rounded-xl
        font-medium
        hover:bg-violet-700
        "
      >
        Save Employee
      </button>
    </form>
  );
}

export default EmployeeForm;