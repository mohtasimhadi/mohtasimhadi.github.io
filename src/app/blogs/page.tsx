'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@/components/Card'
import { ParsedPage } from '@/types/notion'
import Loading from '@/components/Loading'

export default function Blogs() {
    const [cursor, setCursor] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [articles, setArticles] = useState<ParsedPage[]>([])
    const [journals, setJournals] = useState<ParsedPage[]>([])
    const [typists, setTypists] = useState<ParsedPage[]>([])
    const [poetries, setPoetries] = useState<ParsedPage[]>([])

    const fetchPages = async (cursor: string | null = null) => {
        setLoading(true)
        try {
            const res = await axios.post('/api/notion', {
                cursor,
                filters: {
                    and: [
                        {
                            or: [
                                { property: 'Type', select: { equals: 'Article' } },
                                { property: 'Type', select: { equals: 'Journal' } },
                                { property: 'Type', select: { equals: 'Typist' } },
                                { property: 'Type', select: { equals: 'Poetry' } }
                            ]
                        },
                        {
                            property: 'Featured',
                            checkbox: { equals: true }
                        }
                    ]
                }
            })

            const newPages: ParsedPage[] = res.data.results
            setArticles(prev => [...prev, ...newPages.filter(p => p.type === 'Article')])
            setJournals(prev => [...prev, ...newPages.filter(p => p.type === 'Journal')])
            setTypists(prev => [...prev, ...newPages.filter(p => p.type === 'Typist')])
            setPoetries(prev => [...prev, ...newPages.filter(p => p.type === 'Poetry')])
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
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
            <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 pb-8 border-b border-gray-300">
                    {articles.map((page) => (
                        <Card key={page.id} variant="normal" {...page} />
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 border-b border-gray-300">
                    <div className="flex flex-col gap-4 col-span-2">
                        {journals.map((page) => (
                            <Card key={page.id} variant="normal" {...page} />
                        ))}
                    </div>

                    <div className="flex flex-col gap-4 border-l border-gray-300">
                        {poetries.map((page) => (
                            <Card key={page.id} variant="normal" {...page} />
                        ))}
                    </div>
                </div>

            </div>

            <div className="flex flex-col gap-4 lg:border-l border-gray-300 lg:pl-6">
                {typists.map((page) => (
                    <Card key={page.id} variant="normal" {...page} />
                ))}
            </div>

            {hasMore && (
                <div className="lg:col-span-3 mt-6 text-center">
                    <button
                        onClick={() => fetchPages(cursor)}
                        className="p-4 text-black rounded-lg hover:underline transition disabled:opacity-50"
                        disabled={loading}
                    >
                        Load More
                    </button>
                    {loading && <Loading />}
                </div>
            )}
        </main>
    )
}
