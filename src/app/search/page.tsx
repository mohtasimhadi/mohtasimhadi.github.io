'use client'

import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import Card from '@/components/Card'
import { ParsedPage } from '@/types/notion'
import Loading from '@/components/Loading'
import clsx from 'clsx'

const TYPES = [
  'article',
  'project',
  'journal',
  'news',
  'poetry',
  'presentation',
  'publication',
  'patent',
]

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [allResults, setAllResults] = useState<ParsedPage[]>([])
  const [results, setResults] = useState<ParsedPage[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [allTags, setAllTags] = useState<string[]>([])

  const toggleSelection = (value: string, current: string[], setter: (v: string[]) => void) => {
    setter(current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    )
  }

  const handleSearch = useCallback(async () => {
    setLoading(true)
    setSubmitted(true)

    try {
      const res = await axios.post('/api/search', { query })

      const fetchedResults = res.data.results as ParsedPage[]
      setAllResults(fetchedResults)

      // Extract and set tags
      const tagsSet = new Set<string>()
      fetchedResults.forEach((item) => {
        item.tags.forEach((tag) => tagsSet.add(tag))
      })
      setAllTags(Array.from(tagsSet).sort())
    } catch (err) {
      console.error('Search failed:', err)
    } finally {
      setLoading(false)
    }
  }, [query])

  // Apply client-side filters when any filter changes
  useEffect(() => {
    if (!submitted) return

    let filtered = [...allResults]

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((item) => selectedTypes.includes(item.type))
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((item) =>
        item.tags.some((tag) => selectedTags.includes(tag))
      )
    }

    if (featuredOnly) {
      filtered = filtered.filter((item) => item.featured === true)
    }

    if (dateFrom) {
      filtered = filtered.filter((item) =>
        new Date(item.date) >= new Date(dateFrom)
      )
    }

    if (dateTo) {
      filtered = filtered.filter((item) =>
        new Date(item.date) <= new Date(dateTo)
      )
    }

    setResults(filtered)
  }, [allResults, selectedTypes, selectedTags, featuredOnly, dateFrom, dateTo, submitted])

  const resetFilters = () => {
    setSelectedTypes([])
    setSelectedTags([])
    setFeaturedOnly(false)
    setDateFrom('')
    setDateTo('')
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search by title..."
          className="w-full border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition"
        >
          Search
        </button>
      </div>

      {/* Filters - only visible after search */}
      {submitted && allResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
          {/* Type Filter */}
          <div>
            <h4 className="font-medium mb-2">Type</h4>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleSelection(type, selectedTypes, setSelectedTypes)}
                  className={clsx(
                    'px-3 py-1 border text-sm',
                    selectedTypes.includes(type)
                      ? 'bg-black text-white border-black'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Filter */}
          <div>
            <h4 className="font-medium mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleSelection(tag, selectedTags, setSelectedTags)}
                  className={clsx(
                    'px-3 py-1 border text-sm',
                    selectedTags.includes(tag)
                      ? 'bg-black text-white border-black'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="flex flex-col gap-2">
            <label>
              <span className="block text-gray-600 mb-1">From</span>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </label>
            <label>
              <span className="block text-gray-600 mb-1">To</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </label>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-2 mt-6 md:mt-0">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(e) => setFeaturedOnly(e.target.checked)}
              id="featured"
              className="h-4 w-4"
            />
            <label htmlFor="featured" className="text-gray-700">
              Featured only
            </label>
          </div>

          {/* Reset Filters Button */}
          <button
            onClick={resetFilters}
            className="text-sm underline text-gray-500 hover:text-gray-700 col-span-full"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && <Loading />}

      {/* No Results Message */}
      {!loading && submitted && results.length === 0 && (
        <p className="text-center text-gray-500">No results found.</p>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((item) => (
          <Card
            key={item.id}
            variant="normal"
            id={item.id}
            title={item.title}
            cover={item.cover}
            date={item.date}
            type={item.type}
          />
        ))}
      </div>
    </main>
  )
}
