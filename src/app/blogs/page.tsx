'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@/components/Card'
import { ParsedPage } from '@/types/notion'
import Loading from '@/components/Loading'

export default function Blogs() {
    const [pages, setPages] = useState<ParsedPage[]>([])
    const [cursor, setCursor] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)

    const fetchPages = async (cursor: string | null = null) => {
        setLoading(true)
        try {
            const res = await axios.post('/api/notion', {
                cursor,
                filters: {
                    "and": [
                        {
                            "or": [
                                {
                                    "property": "Type",
                                    "select": {
                                        "equals": "Article"
                                    }
                                },
                                {
                                    "property": "Type",
                                    "select": {
                                        "equals": "Journal"
                                    }
                                },
                                {
                                    "property": "Type",
                                    "select": {
                                        "equals": "Typist"
                                    }
                                },
                                {
                                    "property": "Type",
                                    "select": {
                                        "equals": "Poetry"
                                    }
                                }
                            ]
                        },
                        {
                            "property": "Featured",
                            "checkbox": {
                                "equals": true
                            }
                        }
                    ]
                }

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
                        type={page.type}
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