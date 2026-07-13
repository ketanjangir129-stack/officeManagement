import Skeleton from "./Skeleton";

function EmployeeSidebarSkeleton() {
  return (
    <aside className="w-80 bg-slate-800 text-white border-r border-slate-700 flex flex-col h-screen">

      {/* Profile */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex flex-col items-center">

          <Skeleton className="h-24 w-24 rounded-full" />

          <Skeleton className="mt-4 h-6 w-40 rounded-lg" />

          <Skeleton className="mt-2 h-4 w-28 rounded-lg" />

        </div>
      </div>

      {/* Employee Info */}
      <div className="flex-1 p-6 space-y-6">

        {[...Array(4)].map((_, index) => (
          <div key={index}>
            <Skeleton className="mb-2 h-4 w-24 rounded" />
            <Skeleton className="h-5 w-full rounded" />
          </div>
        ))}

      </div>

      {/* Logout Button */}
      <div className="p-6 border-t border-slate-700">
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>

    </aside>
  );
}

export default EmployeeSidebarSkeleton;