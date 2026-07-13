import Skeleton from "./Skeleton";

function EmployeeDetailsSkeleton() {
  return (
    <div className="space-y-6">

      {/* Back Button */}
      <Skeleton className="h-10 w-28 rounded-lg" />

      {/* Employee Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row">

          {/* Profile Image */}
          <Skeleton className="h-28 w-28 rounded-full" />

          {/* Employee Info */}
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-60 rounded-lg" />
            <Skeleton className="h-5 w-40 rounded-lg" />

            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-28 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <Skeleton className="mb-6 h-7 w-48 rounded-lg" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {[...Array(8)].map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-5 w-full rounded" />
            </div>
          ))}

        </div>
      </div>

      {/* Address Information */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <Skeleton className="mb-6 h-7 w-40 rounded-lg" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {[...Array(4)].map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-5 w-full rounded" />
            </div>
          ))}

        </div>
      </div>

      {/* Employment Information */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <Skeleton className="mb-6 h-7 w-52 rounded-lg" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {[...Array(6)].map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-5 w-full rounded" />
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default EmployeeDetailsSkeleton;