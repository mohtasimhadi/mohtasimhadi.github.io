'use client'

import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { ParsedPage } from '@/types/notion'
import { useParams } from 'next/navigation'
import Article from '@/components/Article'
import Section from '@/components/Section'
import SkeletonCard from '@/components/ui/SkeletonCard'


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
            <div className="flex container mx-auto px-6 flex-col md:flex-row">
                  <div className="md:w-3/4 overflow-scroll">
                        {meta && (<Article page={meta} data={data} />)}
                        {loading && <SkeletonCard />}
                  </div>
                  <div className="md:w-1/4 mt-4 md:mt-0 md:ml-4 border-gray-200 md:border-l">
                        <h2 className='font-semibold text-xl p-4 pt-0'>Explore Similar</h2>
                        <Section vertical={true} type="Presentation" />
                  </div>
            </div>
      )
}
