'use client'
import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import Card from '@/components/Card'
import { ParsedPage } from '@/types/notion'
import SkeletonCard from './ui/SkeletonCard'

export default function Section({ type, vertical = false, card_variant = 'normal' }: { type: string, vertical?: boolean, card_variant?: 'large' | 'normal' | 'long' }) {

      const [pages, setPages] = useState<ParsedPage[]>([])
      const [cursor, setCursor] = useState<string | null>(null)
      const [hasMore, setHasMore] = useState(true)
      const [loading, setLoading] = useState(false)
      const [isClient, setIsClient] = useState(false);

      useEffect(() => {
            setIsClient(true);
      }, []);

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
      }, [type])

      useEffect(() => {
            fetchPages()
      }, [fetchPages])

      if (!isClient) return null;


      return (
            <main className="container mx-auto px-4">
                  <div
                        className={
                              vertical
                                    ? 'flex flex-col gap-6'
                                    : card_variant === 'long'
                                          ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                                          : 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'
                        }
                  >
                        {pages.map((page) => (
                              <Card key={page.id} variant={card_variant} {...page} />
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

                              {loading && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                          {Array.from({ length: 6 }).map((_, index) => (
                                                <SkeletonCard key={index} />
                                          ))}
                                    </div>
                              )}
                        </>
                  )}
            </main>

      )
}
