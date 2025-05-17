'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@/components/Card'
import { ParsedPage } from '@/types/notion'
import Loading from '@/components/Loading'

export default function HomePage() {
    const [cursor, setCursor] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)

    const [patents, setPatents] = useState<ParsedPage[]>([])
    const [publications, setPublications] = useState<ParsedPage[]>([])
    const [presentations, setPresentations] = useState<ParsedPage[]>([])
    const [projects, setProjects] = useState<ParsedPage[]>([])
    const [newsItems, setNewsItems] = useState<ParsedPage[]>([])

    const [articles, setArticles] = useState<ParsedPage[]>([])
    const [journals, setJournals] = useState<ParsedPage[]>([])
    const [typists, setTypists] = useState<ParsedPage[]>([])
    const [poetries, setPoetries] = useState<ParsedPage[]>([])

    const fetchPages = async (cursor: string | null = null) => {
        setLoading(true)
        try {
            const [researchRes, newsRes, blogRes] = await Promise.all([
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
                            { property: 'Featured', checkbox: { equals: true } }
                        ]
                    }
                }),
                axios.post('/api/notion', {
                    cursor,
                    filters: { property: 'Type', select: { equals: 'News' } }
                }),
                axios.post('/api/notion', {
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
                            { property: 'Featured', checkbox: { equals: true } }
                        ]
                    }
                })
            ])

            const researchPages: ParsedPage[] = researchRes.data.results
            const newsPages: ParsedPage[] = newsRes.data.results
            const blogPages: ParsedPage[] = blogRes.data.results

            setPatents(prev => [...prev, ...researchPages.filter(p => p.type === 'Patent')])
            setPublications(prev => [...prev, ...researchPages.filter(p => p.type === 'Publication')])
            setPresentations(prev => [...prev, ...researchPages.filter(p => p.type === 'Presentation')])
            setProjects(prev => [...prev, ...researchPages.filter(p => p.type === 'Project')])
            setNewsItems(prev => [...prev, ...newsPages.filter(p => p.type === 'News')])

            setArticles(prev => [...prev, ...blogPages.filter(p => p.type === 'Article')])
            setJournals(prev => [...prev, ...blogPages.filter(p => p.type === 'Journal')])
            setTypists(prev => [...prev, ...blogPages.filter(p => p.type === 'Typist')])
            setPoetries(prev => [...prev, ...blogPages.filter(p => p.type === 'Poetry')])

            setCursor(researchRes.data.next_cursor || newsRes.data.next_cursor || blogRes.data.next_cursor)
            setHasMore(researchRes.data.has_more || newsRes.data.has_more || blogRes.data.has_more)
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
                {/* Research: Patents */}
                <section className="pb-8 border-b border-gray-300">
                    <h2 className="text-xl font-semibold mb-2">Patents</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {loading && (
                            <Loading/>
                        )}
                        {patents.map((page) => (
                            <Card key={page.id} variant="normal" {...page} />
                        ))}
                    </div>
                </section>

                {/* Research: Projects + Publications */}
                <section className="py-8 border-b border-gray-300 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-4 col-span-2">
                        <h2 className="text-xl font-semibold">Projects</h2>
                        {loading && (
                            <Loading/>
                        )}
                        {projects.map((page) => (
                            <Card key={page.id} variant="normal" {...page} />
                        ))}
                    </div>
                    <div className="flex flex-col gap-4 border-l border-gray-300 pl-4">
                        <h2 className="text-xl font-semibold">Publications</h2>
                        {loading && (
                            <Loading/>
                        )}
                        {publications.map((page) => (
                            <Card key={page.id} variant="normal" {...page} />
                        ))}
                    </div>
                </section>

                {/* Research: Presentations */}
                <section className="pt-8 border-b border-gray-300">
                    <h2 className="text-xl font-semibold mb-2">Presentations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {loading && (
                            <Loading/>
                        )}
                        {presentations.map((page) => (
                            <Card key={page.id} variant="normal" {...page} />
                        ))}
                    </div>
                </section>

                {/* Blog: Articles */}
                <section className="pt-8 border-b border-gray-300">
                    <h2 className="text-xl font-semibold mb-2">Articles</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {loading && (
                            <Loading/>
                        )}
                        {articles.map((page) => (
                            <Card key={page.id} variant="normal" {...page} />
                        ))}
                    </div>
                </section>

                {/* Blog: Journals + Poetries */}
                <section className="py-8 border-b border-gray-300 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-4 col-span-2">
                        <h2 className="text-xl font-semibold">Journals</h2>
                        {loading && (
                            <Loading/>
                        )}
                        {journals.map((page) => (
                            <Card key={page.id} variant="normal" {...page} />
                        ))}
                    </div>
                    <div className="flex flex-col gap-4 border-l border-gray-300 pl-4">
                        <h2 className="text-xl font-semibold">Poetries</h2>
                        {loading && (
                            <Loading/>
                        )}
                        {poetries.map((page) => (
                            <Card key={page.id} variant="normal" {...page} />
                        ))}
                    </div>
                </section>
            </div>

            {/* Sidebar: News and Typists */}
            <div className="flex flex-col gap-4 lg:border-l border-gray-300 lg:pl-6">
                <section>
                    <h2 className="text-xl font-semibold mb-2">News</h2>
                    {loading && (
                            <Loading/>
                        )}
                    {newsItems.slice(0, 5).map((page) => (
                        <Card key={page.id} variant="normal" {...page} />
                    ))}
                </section>

                <section className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Typists</h2>
                    {loading && (
                            <Loading/>
                        )}
                    {typists.map((page) => (
                        <Card key={page.id} variant="normal" {...page} />
                    ))}
                </section>
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
