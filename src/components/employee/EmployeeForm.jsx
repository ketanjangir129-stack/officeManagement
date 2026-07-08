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
    designation: "",
    joiningDate: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    status: "Active",
    assignedTasks: {},
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
      className="space-y-8"
    >

      {/* Form Fields */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Employee ID */}

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Employee ID
          </label>

          <input
            name="employeeId"
            placeholder="EMP001"
            onChange={handleChange}
            required
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            outline-none
            transition
            focus:border-violet-500
            focus:ring-4
            focus:ring-violet-100
            "
          />
        </div>

        {/* Full Name */}

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Full Name
          </label>

          <input
            name="fullName"
            placeholder="John Doe"
            onChange={handleChange}
            required
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            focus:border-violet-500
            focus:ring-4
            focus:ring-violet-100
            "
          />
        </div>

        {/* Email */}

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Email Address
          </label>

          <input
            name="email"
            placeholder="john@example.com"
            onChange={handleChange}
            required
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            focus:border-violet-500
            focus:ring-4
            focus:ring-violet-100
            "
          />
        </div>

        {/* Phone */}

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Phone Number
          </label>

          <input
            name="phone"
            placeholder="+91 9876543210"
            onChange={handleChange}
            required
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            focus:border-violet-500
            focus:ring-4
            focus:ring-violet-100
            "
          />
        </div>

        {/* DOB */}

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Date of Birth
          </label>

          <input
            name="dob"
            placeholder="DD/MM/YYYY"
            onChange={handleChange}
            required
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            focus:border-violet-500
            focus:ring-4
            focus:ring-violet-100
            "
          />
        </div>

        {/* Designation */}

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Designation
          </label>

          <input
            name="designation"
            placeholder="Frontend Developer"
            onChange={handleChange}
            required
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            focus:border-violet-500
            focus:ring-4
            focus:ring-violet-100
            "
          />
        </div>

        {/* Joining Date */}

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Joining Date
          </label>

          <input
            name="joiningDate"
            placeholder="DD/MM/YYYY"
            onChange={handleChange}
            required
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            focus:border-violet-500
            focus:ring-4
            focus:ring-violet-100
            "
          />
        </div>

        {/* City */}

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            City
          </label>

          <input
            name="city"
            placeholder="Jaipur"
            onChange={handleChange}
            required
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            focus:border-violet-500
            focus:ring-4
            focus:ring-violet-100
            "
          />
        </div>

        {/* State */}

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            State
          </label>

          <input
            name="state"
            placeholder="Rajasthan"
            onChange={handleChange}
            required
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            focus:border-violet-500
            focus:ring-4
            focus:ring-violet-100
            "
          />
        </div>

        {/* Pincode */}

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Pincode
          </label>

          <input
            name="pincode"
            placeholder="302001"
            onChange={handleChange}
            required
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            focus:border-violet-500
            focus:ring-4
            focus:ring-violet-100
            "
          />
        </div>

        {/* Address */}

        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Address
          </label>

          <textarea
            name="address"
            placeholder="Enter full address..."
            onChange={handleChange}
            required
            rows={4}
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            resize-none
            transition
            focus:border-violet-500
            focus:ring-4
            focus:ring-violet-100
            "
          />
        </div>
      </div>

      {/* Footer */}

      <div className="flex justify-end gap-3 border-slate-200">
        <button
          type="button"
          onClick={onClose}
          className="
          px-5
          py-3
          rounded-xl
          border
          border-slate-300
          font-medium
          text-slate-700
          hover:bg-slate-50
          transition
          cursor-pointer
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          className="
          px-6
          py-3
          rounded-xl
          bg-violet-600
          text-white
          font-medium
          shadow-sm
          hover:bg-violet-700
          hover:shadow-md
          transition-all
          cursor-pointer
          "
        >
          Save Employee
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;