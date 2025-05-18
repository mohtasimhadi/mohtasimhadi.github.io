'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@/components/Card'
import { ParsedPage } from '@/types/notion'
import SkeletonCard from '@/components/ui/SkeletonCard'
import Link from 'next/link'

export default function Research() {
    const [loading, setLoading] = useState(false)
    const [patents, setPatents] = useState<ParsedPage[]>([])
    const [publications, setPublications] = useState<ParsedPage[]>([])
    const [presentations, setPresentations] = useState<ParsedPage[]>([])
    const [projects, setProjects] = useState<ParsedPage[]>([])

    const fetchPages = async (cursor: string | null = null) => {
        setLoading(true)
        try {
            const [featuredRes] = await Promise.all([
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
            ])

            const featuredPages: ParsedPage[] = featuredRes.data.results

            setPatents(prev => [...prev, ...featuredPages.filter(p => p.type === 'Patent')])
            setPublications(prev => [...prev, ...featuredPages.filter(p => p.type === 'Publication')])
            setPresentations(prev => [...prev, ...featuredPages.filter(p => p.type === 'Presentation')])
            setProjects(prev => [...prev, ...featuredPages.filter(p => p.type === 'Project')])
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
                <p className='bg-indigo-50 p-10 mb-10'>
                    My research interests lie at the intersection of <strong>AI</strong> and <strong>Cloud Technologies</strong> with a strong focus on applications in <strong>Biosystems</strong>, <strong>Quantum Computing</strong>, and <strong>Quantum Sensing</strong>. I am particularly passionate about developing <strong>Explainable and Trustworthy AI systems</strong> that not only perform effectively but also provide <strong>transparency</strong> and <strong>reliability</strong>, especially in high-stakes domains. With a specialization in <strong>Computer Vision</strong>, I enjoy translating theoretical advancements into real-world implementations that can impact diverse sectors, from <strong>healthcare</strong> and <strong>agriculture</strong> to <strong>quantum-enhanced sensing</strong>. My work aims to bridge the gap between <strong>cutting-edge research</strong> and <strong>practical solutions</strong> that are <strong>scalable</strong>, <strong>interpretable</strong>, and <strong>impactful</strong>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 pb-8 bg-stone-100 p-4">
                    <p className='text-2xl font-semibold mb-4'>Working on a patent!</p>
                    {loading && <SkeletonCard />}
                    {patents.map((page) => (
                        <Card key={page.id} variant="normal" {...page} />
                    ))}
                    <div className="text-right mt-4">
                        <Link href='/patents' className="text-sm text-blue-700 hover:underline">See more →</Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 ">
                    <div className="flex flex-col gap-4 col-span-2 bg-stone-100 p-4">
                        <p className='text-2xl font-semibold mb-4'>My Publications</p>
                        {loading && <SkeletonCard />}
                        {publications.map((page) => (
                            <div key={page.id} className='border-b border-stone-200'>
                                <Card variant="normal" {...page} />
                            </div>
                        ))}
                        <div className="text-right mt-4">
                            <Link href='/publications' className="text-sm text-blue-700 hover:underline">See more →</Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 bg-stone-100 p-2">
                        <p className='text-2xl font-semibold mb-4 p-2 pb-0'>Presentations</p>
                        {loading && <SkeletonCard />}
                        {presentations.map((page) => (
                            <Card key={page.id} variant="normal" {...page} />
                        ))}
                        <div className="text-right mt-4">
                            <Link href='/presentations' className="text-sm text-blue-700 hover:underline">See more →</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 lg:border-l border-stone-300 lg:pl-6">
                <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center p-6 bg-emerald-50 border border-emerald-200 shadow-sm">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/ResearchGate_icon_SVG.svg"
                            alt="ResearchGate"
                            className="w-12 h-12 mb-4"
                        />
                        <h3 className="text-lg font-semibold text-emerald-800 mb-2">ResearchGate</h3>
                        <Link
                            href="https://www.researchgate.net/profile/Mohtasim-Rafi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
                        >
                            Visit Profile →
                        </Link>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-indigo-50 border border-indigo-200">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Scholar_logo.svg/1200px-Google_Scholar_logo.svg.png"
                            alt="Google Scholar"
                            className="w-12 h-12 mb-4"
                        />
                        <h3 className="text-lg font-semibold text-indigo-800 mb-2">Google Scholar</h3>
                        <Link
                            href="https://scholar.google.com/citations?user=ih7NQy8AAAAJ&hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                        >
                            Visit Profile →
                        </Link>
                    </div>
                </div>

                <div className="bg-stone-100">
                    <p className='text-2xl font-semibold m-4'>Featured Projects</p>
                    {loading && <SkeletonCard />}
                    {projects.map((page) => (
                        <div key={page.id} className='border-b border-stone-200'>
                            <Card variant="normal" {...page} />
                        </div>
                    ))}
                    <div className="text-right m-4">
                            <Link href='/projects' className="text-sm text-blue-700 mb-4 hover:underline">See more →</Link>
                        </div>
                </div>
            </div>
        </main>
    )
}
