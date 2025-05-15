'use client'
import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import Card from '@/components/Card'
import { ParsedPage } from '@/types/notion'
import Loading from './Loading'

export default function Section({ type }: { type: string }) {
  const [pages, setPages] = useState<ParsedPage[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const fetchPages = useCallback(async (cursor: string | null = null) => {
    setLoading(true)
    try {
      const res = await axios.post('/api/notion', {
        cursor,
        filters: {
          and: [
            {
              property: 'Type',
              select: {
                equals: type,
              },
            },
          ],
        },
      })

      setPages((prev) => [...prev, ...res.data.results])
      setCursor(res.data.next_cursor)
      setHasMore(res.data.has_more)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }, [type]) // type is used inside fetchPages, so add it as dependency

  useEffect(() => {
    fetchPages()
  }, [fetchPages])

  return (
    <main className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <Card
            key={page.id}
            variant="normal"
            id={page.id}
            title={page.title}
            cover={page.cover}
            date={page.date}
            authors={page.authors}
            keywords={page.tags}
            type={type.toLocaleLowerCase()}
          />
        ))}
      </div>
      {hasMore && (

        <>
          {!loading && (
            <div className="mt-6 text-center">
              <button
                onClick={() => fetchPages(cursor)}
                className="p-4 text-black rounded-lg hover:underline transition disabled:opacity-50"
                disabled={loading}
              >
                Load More
              </button>
            </div>
          )}

          {loading && <Loading />}
        </>
      )}
    </main>
  )
}
