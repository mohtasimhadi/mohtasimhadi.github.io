import type { ParsedPage } from "@/types/notion"

interface ContentSectionProps {
  title: string
  items: ParsedPage[]
  loading: boolean
  skeletonCount: number
  columns: 1 | 2 | 3
}

export default function ContentSection({ title, items, loading, skeletonCount, columns }: ContentSectionProps) {
  const gridCols =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className={`grid ${gridCols} gap-4`}>
        {loading ? (
          [...Array(skeletonCount)].map((_, index) => (
            <div
              key={`${title.toLowerCase()}-skeleton-${index}`}
              className="bg-slate-100 animate-pulse rounded-lg h-32"
            ></div>
          ))
        ) : items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4"
            >
              <div className="flex items-start gap-3">
                {item.cover && (
                  <div className="w-12 h-12 bg-slate-200 rounded overflow-hidden flex-shrink-0">
                    <img src={item.cover || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-base mb-1 line-clamp-1">{item.title}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {item.date ? new Date(item.date).toLocaleDateString() : "No date"}
                    </span>
                    <button className="text-slate-700 hover:text-slate-900 text-xs font-medium">Read more</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-500">No {title.toLowerCase()} to display</p>
        )}
      </div>
    </section>
  )
}
