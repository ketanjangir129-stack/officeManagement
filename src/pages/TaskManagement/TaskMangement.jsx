import { useEffect, useState } from "react";
import { getAllTasks } from "../../services/taskService";
import SearchFilter from "../../components/common/SearchFilter";
import TaskTable from "../../components/TaskManagement/TaskTable";
import { useParams } from "react-router-dom";
import EmployeeTaskTable from "../../components/TaskManagement/EmployeeTaskTable";



function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
const { id } = useParams();
  const loadTasks = async () => {
    setLoading(true);

    const data = await getAllTasks();

    if (data) {
      const taskArray = Object.entries(data).map(
        ([id, value]) => ({
          id,
          ...value,
        })
      );

      setTasks(taskArray);
    } else {
      setTasks([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) => {
      if (statusFilter === "all") return true;

      const employees = Object.values(
        task.assignedEmployees || {}
      );

      return employees.some(
        (emp) => emp.status === statusFilter
      );
    });

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Task Management
        </h1>

        <p className="text-slate-500">
          Manage all employee tasks
        </p>
      </div>

      {/* Search + Filter */}

      <div className="rounded-2xl bg-white p-5 shadow">

        <div className="flex gap-4">

          <SearchFilter
            value={search}
            onChange={setSearch}
            placeholder="Search task..."
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border px-4"
          >
            <option value="all">
              All
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>

        </div>

      </div>

      {/* Table */}

      <EmployeeTaskTable
        tasks={filteredTasks}
        loading={loading}
        reloadTasks={loadTasks}
      />

    </div>
  );
}

export default TaskManagement;