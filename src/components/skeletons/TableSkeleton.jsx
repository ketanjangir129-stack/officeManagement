import Skeleton from "./Skeleton";

function TableSkeleton({ rows = 7 }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            {[...Array(7)].map((_, index) => (
              <th key={index} className="px-6 py-4">
                <Skeleton className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {[...Array(rows)].map((_, row) => (
            <tr key={row}>
              {[...Array(7)].map((_, col) => (
                <td key={col} className="px-6 py-4">
                  <Skeleton className="h-5 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableSkeleton;