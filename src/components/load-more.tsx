"use client"

interface LoadMoreButtonProps {
  onClick: () => void
  loading: boolean
}

export default function LoadMoreButton({ onClick, loading }: LoadMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition disabled:opacity-50 shadow-md"
      disabled={loading}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Loading more...
        </span>
      ) : (
        "Load More"
      )}
    </button>
  )
}
