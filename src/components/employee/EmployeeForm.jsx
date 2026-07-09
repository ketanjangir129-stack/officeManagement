import { useState } from "react";
import { useEmployees } from "../../context/EmployeeContext";
import { toast } from "react-toastify";

function EmployeeForm({ onClose }) {
  const { addEmployee } = useEmployees();

  const [formData, setFormData] = useState({
    employeeId: "JAI"+" ",
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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  //Validation function to check for empty fields and invalid inputs
  const validateForm = () => {
    const newErrors = {};

    if (!formData.employeeId.trim()) {
      newErrors.employeeId = "Employee ID is required";
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName =
        "Full Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Phone Number must be exactly 10 digits";
    }

    if (!formData.dob.trim()) {
      newErrors.dob = "Date of Birth is required";
    }

    if (!formData.designation.trim()) {
      newErrors.designation = "Designation is required";
    }

    if (!formData.joiningDate.trim()) {
      newErrors.joiningDate = "Joining Date is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode =
        "Pincode must be exactly 6 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address =
        "Address must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data:", formData);
    if (!validateForm()) return;
    try {
      await addEmployee(formData);
      console.log("Employee Saved Successfully");
      onClose();
      toast.success("Employee added successfully!");

    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >

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
            className="w-full rounded-xl  border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
          {errors.employeeId && (
            <p className="mt-1 text-sm text-red-500 font-semibold">
              {errors.employeeId}
            </p>
          )}
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
            className="w-full rounded-xl  border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm font-semibold text-red-500">
              {errors.fullName}
            </p>
          )}
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
            className="w-full rounded-xl  border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500 font-semibold">
              {errors.email}  
            </p>
          )}
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
            className="w-full rounded-xl  border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500 font-semibold">
              {errors.phone}
            </p>
          )}
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
            className="w-full rounded-xl  border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
          {errors.dob && (
            <p className="mt-1 text-sm text-red-500 font-semibold">
              {errors.dob}
            </p>
          )}
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
            className="w-full rounded-xl  border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
          {errors.designation && (
            <p className="mt-1 text-sm text-red-500 font-semibold">
              {errors.designation}
            </p>
          )}
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
            className="w-full rounded-xl  border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
          {errors.joiningDate && (
            <p className="mt-1 text-sm text-red-500 font-semibold">
              {errors.joiningDate}
            </p>
          )}
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
            className="w-full rounded-xl  border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-500 font-semibold">
              {errors.city}
            </p>
          )}
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
            className="w-full rounded-xl  border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-500 font-semibold">
              {errors.state}
            </p>
          )}
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
            className="w-full rounded-xl  border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
          {errors.pincode && (
            <p className="mt-1 text-sm text-red-500 font-semibold">
              {errors.pincode}
            </p>
          )}
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
            rows={4}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none resize-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500 font-semibold">
              {errors.address}
            </p>
          )}
        </div>
      </div>

      {/* Footer */}

      <div className="flex justify-end gap-3 border-slate-200">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-3 rounded-xl border border-slate-300 font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-violet-600 text-white font-medium shadow-sm hover:bg-violet-700 hover:shadow-md transition-all cursor-pointer"
        >
          Save Employee
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;