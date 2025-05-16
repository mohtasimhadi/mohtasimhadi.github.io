'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@/components/Card'
import { ParsedPage } from '@/types/notion'
import Loading from '@/components/Loading'

export default function Research() {
    const [cursor, setCursor] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [patents, setPatents] = useState<ParsedPage[]>([])
    const [publications, setPublications] = useState<ParsedPage[]>([])
    const [presentations, setPresentations] = useState<ParsedPage[]>([])
    const [projects, setProjects] = useState<ParsedPage[]>([])
    const [newsItems, setNewsItems] = useState<ParsedPage[]>([])

    const fetchPages = async (cursor: string | null = null) => {
        setLoading(true)
        try {
            const [featuredRes, newsRes] = await Promise.all([
                axios.post('/api/notion', {
                    cursor,
                    filters: {
                        and: [
                            {
                                or: [
                                    { property: 'Type', select: { equals: 'Patent' } },
                                    { property: 'Type', select: { equals: 'Publication' } },
                                    { property: 'Type', select: { equals: 'Presentation' } },
                                    { property: 'Type', select: { equals: 'Project' } }
                                ]
                            },
                            {
                                property: 'Featured',
                                checkbox: { equals: true }
                            }
                        ]
                    }
                }),
                axios.post('/api/notion', {
                    cursor,
                    filters: {
                        property: 'Type',
                        select: { equals: 'News' }
                    }
                })
            ])

            const featuredPages: ParsedPage[] = featuredRes.data.results
            const newsPages: ParsedPage[] = newsRes.data.results

            setPatents(prev => [...prev, ...featuredPages.filter(p => p.type === 'Patent')])
            setPublications(prev => [...prev, ...featuredPages.filter(p => p.type === 'Publication')])
            setPresentations(prev => [...prev, ...featuredPages.filter(p => p.type === 'Presentation')])
            setProjects(prev => [...prev, ...featuredPages.filter(p => p.type === 'Project')])
            setNewsItems(prev => [...prev, ...newsPages.filter(p => p.type === 'News')])

            setCursor(featuredRes.data.next_cursor || newsRes.data.next_cursor)
            setHasMore(featuredRes.data.has_more || newsRes.data.has_more)
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
                    {patents.map((page) => (
                        <Card key={page.id} variant="normal" {...page} />
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 border-b border-gray-300">
                    <div className="flex flex-col gap-4 col-span-2">
                        {projects.map((page) => (
                            <Card key={page.id} variant="normal" {...page} />
                        ))}
                    </div>

                    <div className="flex flex-col gap-4 border-l border-gray-300">
                        {publications.map((page) => (
                            <Card key={page.id} variant="normal" {...page} />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-b border-gray-300">
                    {presentations.map((page) => (
                        <Card key={page.id} variant="normal" {...page} />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4 lg:border-l border-gray-300 lg:pl-6">
                {newsItems.slice(0, 5).map((page) => (
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
