import EmployeeForm from "./EmployeeForm";

function AddEmployeeModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="
      fixed inset-2em 50px 20px z-50
      flex items-center justify-center
      bg-black/40 backdrop-blur-sm
      p-4
      "
    >
      <div
        className="
        bg-white
        w-full
        max-w-6xl
        max-h-[90vh]
        overflow-y-auto
        rounded-3xl
        p-6
        shadow-xl
        hide-scrollbar
        "
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Add Employee
          </h2>

          <button
            onClick={onClose}
            className="cursor-pointer text-3xl bg-red-500 text-white rounded-full w-8 h-8 flex justify-center items-center hover:bg-red-600 transition-all"
          >
            ×
          </button>
        </div>

        <EmployeeForm onClose={onClose} />
      </div>
    </div>
  );
}

export default AddEmployeeModal;