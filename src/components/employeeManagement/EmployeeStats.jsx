import {FiUsers,FiUserCheck,FiUserX,} from "react-icons/fi";

function EmployeeStats({ employees }) {
    const totalEmployees = employees.length;

    const activeEmployees = employees.filter(
        (emp) => emp.isOnline
    ).length;

    const inactiveEmployees = employees.filter(
        (emp) => !emp.isOnline
    ).length;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const newEmployeesThisMonth = employees.filter(
        (emp) => {
        if (!emp.joiningDate) return false;

        const date = new Date(emp.joiningDate);

        return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
        );
        }
    ).length;

    const stats = [
        {
            title: "Total Employees",
            value: totalEmployees,
            subtitle: "Registered Employees",
            icon: <FiUsers size={22} />,
            iconBg: "bg-violet-100",
            iconColor: "text-violet-600",
            valueColor: "text-slate-800",
        },
        {
            title: "Active Employees",
            value: activeEmployees,
            subtitle: "Currently Online",
            icon: <FiUserCheck size={22} />,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            valueColor: "text-green-600",
        },
        {
            title: "Inactive Employees",
            value: inactiveEmployees,
            subtitle: "Currently Offline",
            icon: <FiUserX size={22} />,
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
            valueColor: "text-red-600",
        },
        {
            title: "New Employees",
            value: newEmployeesThisMonth,
            subtitle: "Joined This Month",
            icon: <FiUsers size={22} />,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            valueColor: "text-blue-600",
        },
    ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-6
            shadow-sm
            hover:shadow-lg
            hover:-translate-y-1
            transition-all
            duration-300
            cursor-pointer
          "
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {stat.title}
              </p>

              <h2
                className={`text-4xl font-bold mt-3 ${stat.valueColor}`}
              >
                {stat.value}
              </h2>

              <p className="text-sm text-slate-400 mt-2">
                {stat.subtitle}
              </p>
            </div>

            <div
              className={`
                h-12
                w-12
                rounded-2xl
                flex
                items-center
                justify-center
                ${stat.iconBg}
                ${stat.iconColor}
              `}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmployeeStats;