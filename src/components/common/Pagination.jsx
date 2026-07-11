import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between p-5 border-t border-slate-200">

      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
            <FiChevronLeft />
            Previous
      </button>

      <div className="flex gap-2">

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              onClick={() =>
                onPageChange(page)
              }
              className={`
                h-10
                w-10
                rounded-xl
                font-medium
                transition
                ${
                  currentPage === page
                    ? "bg-violet-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }
              `}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={
          currentPage === totalPages
        }
        className="
          flex items-center gap-2
          px-4 py-2
          rounded-xl
          border border-slate-200
          bg-white
          hover:bg-slate-50
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        Next
        <FiChevronRight />
      </button>
    </div>
  );
}

export default Pagination;