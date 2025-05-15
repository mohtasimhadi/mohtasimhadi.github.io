'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function HomePage() {
  const [pages, setPages] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/notion')
        setPages(res.data.results || [])
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  console.log(pages)

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Notion Pages</h1>
      <ul className="mt-4">
        {pages.map((page, i) => (
          <li key={page.id || i} className="py-2 border-b border-gray-200">
            Page ID: {page.id}
          </li>
        ))}
      </ul>
    </main>
  )
}