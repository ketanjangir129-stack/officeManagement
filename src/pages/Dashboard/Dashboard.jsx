import {
  MdPeople,
  MdTask,
  MdCheckCircle,
  MdPendingActions,
} from "react-icons/md";
import EmployeePerformanceChart from "../Dashboard/EmployeePerformanceChart";

const stats = [
  {
    title: "Total Employees",
    value: 128,
    change: "+12%",
    icon: MdPeople,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Total Tasks",
    value: 84,
    change: "+8%",
    icon: MdTask,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Completed Tasks",
    value: 45,
    change: "+5%",
    icon: MdCheckCircle,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Pending Tasks",
    value: 39,
    change: "+3%",
    icon: MdPendingActions,
    color: "bg-orange-100 text-orange-600",
  },
];

const recentActivities = [
  {
    title: "John assigned UI Design Task",
    time: "10 min ago",
  },
  {
    title: "Rahul completed Dashboard Module",
    time: "25 min ago",
  },
  {
    title: "Ketan added new employee",
    time: "1 hour ago",
  },
  {
    title: "Task deadline updated",
    time: "2 hours ago",
  },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-1 text-slate-500">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
                rounded-2xl
                border
                border-gray-100
                bg-white
                p-5
                shadow-sm
                transition
                hover:shadow-md
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {item.value}
                  </h2>

                  <p className="mt-2 text-sm text-green-500">
                    {item.change} this month
                  </p>
                </div>

                <div
                  className={`${item.color} rounded-xl p-3`}
                >
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Chart Area */}
        <div className="xl:col-span-2">
            <EmployeePerformanceChart />
        </div>

        {/* Activity Section */}
        <div
          className="
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-6
            shadow-sm
          "
        >
          <h2 className="mb-5 text-lg font-semibold">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="border-b border-gray-100 pb-3"
              >
                <p className="font-medium text-slate-700">
                  {activity.title}
                </p>

                <p className="text-sm text-slate-400">
                  {activity.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div
          className="
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-6
            shadow-sm
          "
        >
          <h2 className="mb-4 font-semibold">
            Department Summary
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Development</span>
              <span>45</span>
            </div>

            <div className="flex justify-between">
              <span>HR</span>
              <span>12</span>
            </div>

            <div className="flex justify-between">
              <span>Marketing</span>
              <span>18</span>
            </div>

            <div className="flex justify-between">
              <span>Sales</span>
              <span>22</span>
            </div>
          </div>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-6
            shadow-sm
          "
        >
          <h2 className="mb-4 font-semibold">
            Upcoming Deadlines
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>UI Design</span>
              <span className="text-red-500">
                Tomorrow
              </span>
            </div>

            <div className="flex justify-between">
              <span>API Integration</span>
              <span className="text-orange-500">
                3 Days
              </span>
            </div>

            <div className="flex justify-between">
              <span>Testing</span>
              <span className="text-green-500">
                1 Week
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;