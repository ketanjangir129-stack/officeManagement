import { useEffect, useState } from "react";
import SearchFilter from "../../components/common/SearchFilter";
import { searchFilter } from "../../utils/searchFilter"
import TaskTable from "../../components/TaskManagement/TaskTable";
import { subscribeTasks } from "../../services/taskService";
import { subscribeAssignedTasks } from "../../services/assignTaskService";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/common/Pagination";

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const searchedTasks = searchFilter(tasks, search, [
    "title",
    "deadline",
  ]);

  useEffect(() => {
    const unsubscribe = subscribeTasks((taskArray) => {
      setTasks(taskArray);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeAssignedTasks(setAssignedTasks);

    return () => unsubscribe();
  }, []);



  const filteredTasks = searchedTasks.filter((task) => {
    const statusMatch =
      statusFilter === "all" || task.status === statusFilter;

    const priorityMatch =
      priorityFilter === "all" || task.priority === priorityFilter;

    return statusMatch && priorityMatch;
  });

  const {currentPage,totalPages,paginatedData,goToPage,nextPage,prevPage,setCurrentPage} = usePagination(filteredTasks,5);
  useEffect(()=>{
    setCurrentPage(1);
  },[search,statusFilter,priorityFilter]);

  return (
    <>
      {/* search bar */}
      <div className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm">
        <SearchFilter
          value={search}
          onChange={setSearch}
          placeholder="Search by title, priority or deadline..."
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="rounded-xl border px-4 py-2"
        >
          <option value="all">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      {/* your UI */}

      <TaskTable
        tasks={paginatedData}
        loading={loading}
        assignedTasks={assignedTasks}
      >
        {/* using pagination component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onNext={nextPage}
          onPrev={prevPage}
        />

      </TaskTable>
    </>
  );
}

export default TaskManagement;