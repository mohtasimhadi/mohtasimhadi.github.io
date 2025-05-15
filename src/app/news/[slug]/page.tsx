'use client'

import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { ParsedPage } from '@/types/notion'
import { useParams } from 'next/navigation'
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Loading from '@/components/Loading'


export default function Page() {
    const [meta, setMeta] = useState<ParsedPage | null>(null)
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const page_id = slug ? slug.replace(/[^a-zA-Z0-9]/g, '') : '';


    const fetchPage = useCallback(async () => {
        setLoading(true)
        try {
            const res = await axios.post('/api/page', { page_id })
            setMeta(res.data.meta)
            setData(res.data.data)
        } catch (err) {
            console.error(err)
        }
        setLoading(false)
    }, [page_id])

    useEffect(() => {
        fetchPage()
    }, [fetchPage])

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">{meta?.title}</h1>
            {loading && <Loading />}
            {meta?.cover && (
                <img
                    src={meta.cover}
                    alt={meta.title}
                    className="mb-4 max-w-full h-auto"
                />
            )}
            <div className='text-justify markdown-content'><Markdown remarkPlugins={[remarkGfm]}>{data}</Markdown></div>
        </div>
    )
}
