import { useState } from "react";
import { useEmployees } from "../../context/EmployeeContext";

function EmployeeForm({ onClose }) {
  const { addEmployee } = useEmployees();

  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    department: "",
    designation: "",
    joiningDate: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    status: "Active",
    assignedTasks:{
      
    },

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
      className="grid grid-cols-1 md:grid-cols-2 gap-5 hide-scrollbar"
    >
      <input
        name="employeeId"
        placeholder="Employee ID"
        onChange={handleChange}
        className="border rounded-xl p-3"
        required
      />

      <input
name="fullName"
        placeholder="Full Name"

        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        className="border rounded-xl p-3"
        required
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border rounded-xl p-3"
        required
      />

      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        className="border rounded-xl p-3"
        required
      />


      <input
        name="dob"
        onChange={handleChange}
        className="border rounded-xl p-3"
        placeholder="Date of Birth"
        required
      />

      <input
        name="department"
        placeholder="Department"
        onChange={handleChange}
        className="border rounded-xl p-3"
        required
      />


      <input
        name="joiningDate"
        onChange={handleChange}
        className="border rounded-xl p-3"
        placeholder="Joining Date"
        required
      />
      <input
        name="city"
        placeholder="City"
        onChange={handleChange}
        className="border rounded-xl p-3"
        required
      />

      <input
        name="state"
        placeholder="State"
        onChange={handleChange}
        className="border rounded-xl p-3"
        required
      />

      <input
        name="pincode"
        placeholder="Pincode"
        onChange={handleChange}
        className="border rounded-xl p-3"
        required
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
        required
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