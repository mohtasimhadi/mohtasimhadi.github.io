'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function HomePage() {
  const [pages, setPages] = useState<any[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const fetchPages = async (cursor: string | null = null) => {
    setLoading(true)
    try {
      const res = await axios.get('/api/notion', {
        params: cursor ? { cursor } : {},
      })

      setPages((prev) => [...prev, ...res.data.results])
      setCursor(res.data.next_cursor)
      setHasMore(res.data.has_more)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPages()
  }, [])

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Notion Pages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <div
            key={page.id}
            className="border rounded-2xl shadow p-4 bg-white flex flex-col gap-2"
          >
            {page.cover && (
              <img
                src={page.cover}
                alt={page.title}
                className="w-full h-48 object-cover rounded-xl"
              />
            )}
            <h2 className="text-xl font-semibold">{page.title}</h2>
            {page.date && (
              <p className="text-gray-500 text-sm">
                📅 {new Date(page.date).toLocaleDateString()}
              </p>
            )}
            {page.authors?.length > 0 && (
              <p className="text-sm text-gray-600">
                ✍️ {page.authors.join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={() => fetchPages(cursor)}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </main>
  )
}