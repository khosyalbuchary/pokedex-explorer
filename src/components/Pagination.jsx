export default function Pagination({ prevUrl, nextUrl, onNavigate }) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        type="button"
        disabled={!prevUrl}
        onClick={() => onNavigate(prevUrl)}
        className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      <button
        type="button"
        disabled={!nextUrl}
        onClick={() => onNavigate(nextUrl)}
        className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
