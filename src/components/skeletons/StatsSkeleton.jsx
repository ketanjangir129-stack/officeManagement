import Skeleton from "./Skeleton";

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >
          <Skeleton className="h-4 w-24" />

          <Skeleton className="mt-4 h-8 w-16" />

          {/* <Skeleton className="mt-4 h-10 w-10 rounded-full" /> */}
        </div>
      ))}
    </div>
  );
}

export default StatsSkeleton;