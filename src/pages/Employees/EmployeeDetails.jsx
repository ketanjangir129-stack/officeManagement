import { useParams } from "react-router-dom";
import { useEmployees } from "../../context/EmployeeContext";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function EmployeeDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    //coming from Employeecontext 
    const { employees, loading, updateEmployee, deleteEmployee, } = useEmployees();

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const employee = employees.find(
        (emp) => emp.id === id
    );
    const handleChange = (e) => {
        setEditData((prev) => ({
            ...prev,
            [e.target.name]:
                e.target.value,
        }));
    };
    const handleUpdate = async () => {
        try {
            await updateEmployee(employee.id, editData);
            toast.success("Employee Updated Successfully");
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed To Update Employee");
        }
    };
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Delete this employee?");
        if (!confirmDelete) return;
        try {
            setDeleting(true);
            await deleteEmployee(employee.id);
            toast.success("Employee Deleted");
            navigate("/employees", { replace: true, });
        } catch (error) {
            console.error(error);
            toast.error("Delete Failed");
            setDeleting(false);
        }
    };
    useEffect(() => {
        if (employee) {
            setEditData(employee);
        }
    }, [employee]);

    if (loading || deleting) {
        return (
            <div className="flex items-center justify-center h-[70vh]">
                <div className="text-center">
                    <div
                        className="
                w-12
                h-12
                border-4
                border-violet-200
                border-t-violet-600
                rounded-full
                animate-spin
                mx-auto
                "
                    />

                    <p className="mt-4 text-slate-600">
                        {deleting
                            ? "Deleting Employee..."
                            : "Loading Employee..."}
                    </p>
                </div>
            </div>
        );
    }
    if (!employee) {
        return null;
    }

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-3 cursor-pointer">
                        <p
                            onClick={() => navigate("/employees")}
                        >
                            <IoChevronBackOutline size={25} />
                        </p>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Employee Details
                        </h1>
                    </div>

                    <p className="text-slate-500 mt-1 pl-9">
                        Complete employee information
                    </p>
                </div>
            </div>

            {/* Employee Profile Card */}

            <div
                className="
                    bg-white
                    rounded-3xl
                    border
                    border-slate-200
                    shadow-sm
                    overflow-hidden
                "
            >
                {/* Banner */}

                <div
                    className="
                        h-25
                        bg-gradient-to-r
                        from-violet-600
                        via-purple-600
                        to-indigo-600
                    "
                />

                {/* Profile Content */}

                <div className="px-8 pb-8">

                    <div
                        className="
                            -mt-12
                            flex
                            flex-col
                            xl:flex-row
                            xl:items-end
                            xl:justify-between
                            gap-6
                        "
                    >
                        {/* Left Section */}

                        <div className="flex flex-col sm:flex-row sm:items-end gap-5">

                            {/* Avatar */}

                            <div
                                className="
                                    h-28
                                    w-28
                                    rounded-3xl
                                    bg-white
                                    shadow-lg
                                    border-4
                                    border-white
                                    flex
                                    items-center
                                    justify-center
                                    text-4xl
                                    font-bold
                                    text-violet-600
                                    shrink-0
                                "
                            >
                                {employee.fullName?.charAt(0)}
                            </div>

                            {/* Employee Info */}

                            <div className="pb-1">

                                <h2 className="text-3xl font-bold text-slate-800">
                                    {employee.fullName}
                                </h2>

                                <p className="text-slate-500 mt-3">
                                    {employee.designation}
                                </p>

                                <div className="flex flex-wrap items-center gap-3 mt-4">

                                    <span
                                        className="
                                            px-4
                                            py-1.5
                                            rounded-full
                                            text-sm
                                            font-medium
                                            bg-green-100
                                            text-green-700
                                        "
                                    >
                                        {employee.status}
                                    </span>

                                    <span
                                        className="
                                            px-4
                                            py-1.5
                                            rounded-full
                                            text-sm
                                            font-medium
                                            bg-slate-100
                                            text-slate-600
                                        "
                                    >
                                        {employee.employeeId}
                                    </span>

                                </div>

                            </div>
                        </div>

                        {/* Action Buttons */}

                        <div className="flex flex-wrap gap-3">

                            <button
                                onClick={() =>
                                    setIsEditing(!isEditing)
                                }
                                className="
                                    px-5
                                    py-3
                                    rounded-xl
                                    bg-blue-600
                                    text-white
                                    font-medium
                                    hover:bg-blue-700
                                    transition-all
                                    cursor-pointer
                                "
                            >
                                {isEditing ? "Cancel" : "Edit Employee"}
                            </button>

                            <button
                                onClick={handleDelete}
                                className="
                                    px-5
                                    py-3
                                    rounded-xl
                                    bg-red-600
                                    text-white
                                    font-medium
                                    hover:bg-red-700
                                    transition-all
                                    cursor-pointer
                                "
                            >
                                Delete
                            </button>

                            {isEditing && (
                                <button
                                    onClick={handleUpdate}
                                    className="
                                        px-5
                                        py-3
                                        rounded-xl
                                        bg-green-600
                                        text-white
                                        hover:bg-green-700
                                        cursor-pointer
                                    "
                                >
                                    Save Changes
                                </button>
                            )}

                        </div>
                    </div>

                    {/* Contact Information */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            xl:grid-cols-4
                            gap-5
                            mt-10
                        "
                    >
                        <EditableInfoCard
                            title="Email"
                            name="email"
                            value={editData?.email}
                            isEditing={isEditing}
                            onChange={handleChange}
                        />

                        <EditableInfoCard
                            title="Phone Number"
                            name="phone"
                            value={editData?.phone}
                            isEditing={isEditing}
                            onChange={handleChange}
                        />

                        <EditableInfoCard
                            title="Date of Birth"
                            name="dob"
                            value={editData?.dob}
                            isEditing={isEditing}
                            onChange={handleChange}
                        />

                        <EditableInfoCard
                            title="Joining Date"
                            name="joiningDate"
                            value={editData?.joiningDate}
                            isEditing={isEditing}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Personal Information */}

                    <div className="mt-10">

                        <h3
                            className="
                                text-lg
                                font-semibold
                                text-slate-800
                                mb-5
                            "
                        >
                            Personal Information
                        </h3>

                        <div
                            className="
                                grid
                                grid-cols-1
                                md:grid-cols-3
                                gap-5
                            "
                        >
                            <EditableInfoCard
                                title="Full Name"
                                name="fullName"
                                value={editData?.fullName}
                                isEditing={isEditing}
                                onChange={handleChange}
                            />
                            <EditableInfoCard
                                title="ID"
                                name="employeeId"
                                value={editData?.employeeId}
                                isEditing={isEditing}
                                onChange={handleChange}
                            />
                            <EditableInfoCard
                                title="City"
                                name="city"
                                value={editData?.city}
                                isEditing={isEditing}
                                onChange={handleChange}
                            />

                            <EditableInfoCard
                                title="State"
                                name="state"
                                value={editData?.state}
                                isEditing={isEditing}
                                onChange={handleChange}
                            />

                            <EditableInfoCard
                                title="Pincode"
                                name="pincode"
                                value={editData?.pincode}
                                isEditing={isEditing}
                                onChange={handleChange}
                            />

                            <EditableInfoCard
                                title="Designation"
                                name="designation"
                                value={editData?.designation}
                                isEditing={isEditing}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    {/* Address */}

                    <div className="mt-10">
                        {isEditing ? (
                            <textarea
                                name="address"
                                value={
                                    editData?.address || ""
                                }
                                onChange={handleChange}
                                rows={4}
                                className="
                                    w-full
                                    border
                                    rounded-xl
                                    p-4
                                "
                            />
                        ) : (
                            <div
                                className="bg-slate-50 border border-slate-200 rounded-2xl p-5"
                            >
                                {employee.address}
                            </div>
                        )}

                    </div>

                </div>
            </div>

        </div>
    );
}

function EditableInfoCard({
    title,
    name,
    value,
    isEditing,
    onChange,
}) {
    return (
        <div
            className="bg-slate-50 border border-slate-200 rounded-2xl p-5"
        >
            <p
                className="text-sm text-slate-500 mb-2"
            >
                {title}
            </p>

            {isEditing ? (
                <input
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    className="w-full border rounded-lg px-3 py-2 outline-none"
                />
            ) : (
                <h3
                    className="font-semibold text-slate-800"
                >
                    {value || "-"}
                </h3>
            )}
        </div>
    );
}

export default EmployeeDetails;