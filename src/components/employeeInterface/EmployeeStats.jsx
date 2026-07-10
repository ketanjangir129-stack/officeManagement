function EmployeeStats() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">

      <Card
        title="Total Tasks"
        value={0}
        color="bg-violet-100 text-violet-700"
      />

      <Card
        title="Pending"
        value={0}
        color="bg-yellow-100 text-yellow-700"
      />

      <Card
        title="In Progress"
        value={0}
        color="bg-blue-100 text-blue-700"
      />

      <Card
        title="Completed"
        value={0}
        color="bg-green-100 text-green-700"
      />

    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h2 className={`mt-4 text-4xl font-bold ${color}`}>
        {value}
      </h2>

    </div>
  );
}

export default EmployeeStats;