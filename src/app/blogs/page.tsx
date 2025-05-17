'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@/components/Card'
import { ParsedPage } from '@/types/notion'
import Loading from '@/components/Loading'
import Link from 'next/link'

export default function Blogs() {
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
                                { property: 'Type', select: { equals: 'Poetry' } },
                                { property: 'Type', select: { equals: 'Typist' } },
                                { property: 'Type', select: { equals: 'Journal' } }
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
        } catch (err) {
            console.error(err)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchPages()
    }, [])

    return (
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 min-h-screen">
            <div className="lg:col-span-2 space-y-8">
                <div className="p-4 bg-emerald-50">
                    <p className='text-2xl font-semibold mb-4'>Featured Article</p>
                    {loading && <Loading/>}
                    {articles.map((page) => (
                        <Card key={page.id} variant="normal" {...page} />
                    ))}
                    <div className="text-right mt-4">
                        <Link href='/articles' className="text-sm text-emerald-700 hover:underline">See more →</Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 p-4 bg-amber-50">
                        <p className='text-2xl font-semibold mb-4'>My Journals</p>
                        {loading && <Loading/>}
                        {journals.map((page) => (
                            <div key={page.id} className='border-b border-amber-200'>
                            <Card variant="normal" {...page} />
                            </div>
                        ))}
                        <div className="text-right mt-4">
                            <Link href='/journals' className="text-sm text-amber-700 hover:underline">See more →</Link>
                        </div>
                    </div>
                    <div className="bg-pink-50 p-4">
                        <p className='text-2xl font-semibold mb-4'>Assorted Words I Call Poetry</p>

                        {poetries.map((page) => (
                            <div key={page.id} className='border-b border-pink-200'>
                                <Card variant="normal" {...page} />
                            </div>
                        ))}
                        <div className="text-right mt-4">
                            <Link href='/poetries' className="text-sm text-pink-700 hover:underline">See more →</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6 lg:border-l border-gray-200 lg:pl-6">
                <section className="w-full flex flex-col items-center justify-center gap-4 p-6 bg-stone-100">
                    <img
                        src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1651636647i/16014._UY200_CR26,0,200,200_.jpg"
                        alt="Andrei Tarkovsky"
                        className="w-32 h-32 rounded-full object-cover shadow-md"
                    />
                    <blockquote className="text-center max-w-2xl text-gray-700 italic text-lg">
                        “A man writes because he is tormented, because he doubts. He needs to constantly prove to himself and the others that he’s worth something. And if I know for sure that I’m a genius? Why write then? What the hell for?”
                        <br />
                        <span className="block mt-2 text-sm text-gray-600">― Andrei Tarkovsky</span>
                    </blockquote>
                </section>
                <div className="bg-indigo-50 p-4">
                    <p className='text-2xl font-semibold mb-4'>Sometimes, I just keep punching my keyboard!</p>
                    {loading && <Loading/>}
                    {typists.map((page) => (
                        <div key={page.id} className='border-b border-indigo-200'>
                        <Card variant="normal" {...page} />
                        </div>
                    ))}
                    <div className="text-right mt-4">
                        <Link href='/typist' className="text-sm text-indigo-700 hover:underline">See more →</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
