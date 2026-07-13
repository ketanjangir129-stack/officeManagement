
import Skeleton from "./Skeleton";

function SearchSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row">
        
        {/* Search Input */}
        <div className="flex-1">
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>

        {/* Filter Dropdown */}
        <Skeleton className="h-12 w-44 rounded-xl" />

      </div>
    </div>
  );
}

export default SearchSkeleton;