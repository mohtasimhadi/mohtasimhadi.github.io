'use client'

import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { ParsedPage } from '@/types/notion'
import { useParams } from 'next/navigation'
import Loading from '@/components/Loading'
import Article from '@/components/Article'


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
            {meta && (<Article page={meta} data={data} />)}
            {loading && <Loading />}
        </div>
    )
}
