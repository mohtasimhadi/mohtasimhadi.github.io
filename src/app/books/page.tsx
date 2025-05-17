'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Loading from '@/components/Loading'

interface ParsedBook {
  id: string
  title: string
  cover: string | null
  authors: string[]
  date: string
  goodreads: string
  publisher: string
  series: string
  synopsis: string
  tags: string[]
  type: string
}

type Filters = {
  tag: string | null
  author: string | null
  publisher: string | null
}

export default function BooksPage() {
  const [books, setBooks] = useState<ParsedBook[]>([])
  const [loading, setLoading] = useState(true)
  const [cursor, setCursor] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    tag: null,
    author: null,
    publisher: null,
  })

  const fetchBooks = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        body: JSON.stringify({ cursor }),
      })
      const data = await res.json()
      setBooks(prev => [...prev, ...data.results])
      setCursor(data.next_cursor)
      setHasMore(data.has_more)
    } catch (err) {
      console.error('Failed to load books:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const filterOptions = useMemo(() => {
    const tags = Array.from(new Set(books.flatMap(b => b.tags))).sort()
    const authors = Array.from(new Set(books.flatMap(b => b.authors))).sort()
    const publishers = Array.from(new Set(books.map(b => b.publisher).filter(Boolean))).sort()

    return { tags, authors, publishers }
  }, [books])

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const tagMatch = !filters.tag || book.tags.includes(filters.tag)
      const authorMatch = !filters.author || book.authors.includes(filters.author)
      const publisherMatch = !filters.publisher || book.publisher === filters.publisher
      return tagMatch && authorMatch && publisherMatch
    })
  }, [books, filters])

  const groupedBooks = useMemo(() => {
    return {
      Original: filteredBooks.filter(book => book.type === 'Original'),
      Translation: filteredBooks.filter(book => book.type === 'Translation'),
      Anthology: filteredBooks.filter(book => book.type === 'Anthology'),
    }
  }, [filteredBooks])

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-8 gap-8">

        <div className="sm:col-span-1 lg:col-span-2">
          <div className="space-y-6 mb-10">
            <div className='bg-indigo-50 border border-indigo-100 p-4'>
            <TagFilterGroup
              label="Publisher"
              options={filterOptions.publishers}
              selected={filters.publisher}
              onChange={(value) => setFilters((prev) => ({ ...prev, publisher: value }))}
            />
            </div>
            <div className='bg-indigo-50 border border-indigo-100 p-4'>
            <TagFilterGroup
              label="Author"
              options={filterOptions.authors}
              selected={filters.author}
              onChange={(value) => setFilters((prev) => ({ ...prev, author: value }))}
            />
            </div>
            <div className='bg-indigo-50 border border-indigo-100 p-4'>
            <TagFilterGroup
              label="Tag"
              options={filterOptions.tags}
              selected={filters.tag}
              onChange={(value) => setFilters((prev) => ({ ...prev, tag: value }))}
            />
            </div>
          </div>
        </div>

        <div className="sm:col-span-3 lg:col-span-4">
          {loading && (<Loading />)}
          {Object.entries(groupedBooks).map(([type, books]) =>
            books.length > 0 ? (
              <section
                key={type}
                className={`mb-12 px-4 py-2 -mx-4 border-gray-200 border`}
              >
                <h2 className="text-2xl font-medium mb-6">{type}</h2>
                <div className="flex flex-col space-y-6">
                  {books.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </section>
            ) : null
          )}

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={fetchBooks}
                className="px-6 py-2 border border-gray-800 text-gray-800 hover:bg-gray-100 transition"
                disabled={loading}
              >
                {loading ? <Loading /> : 'Load More'}
              </button>
            </div>
          )}
        </div>
        <div className="sm:col-span-1 lg:col-span-2 p-4 pt-0">
          <section className="w-full flex flex-col items-center justify-center gap-4 p-6 bg-red-100">
            <blockquote className="text-center max-w-2xl text-gray-700 italic text-lg">
              “You write so beautifully. The inside of your mind must be a terrible place.”
              <br />
              <span className="block mt-2 text-sm text-gray-600">― Unknown</span>
            </blockquote>
          </section>
          <div className="w-full max-w-xl mx-auto flex flex-col gap-6 mt-4">
            <div className="flex flex-col items-center text-center p-6 bg-stone-50">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Goodreads_%27g%27_logo.svg"
                alt="Goodreads"
                className="w-18 h-18 mb-4"
              />
              <h3 className="text-lg font-semibold text-stone-800 mb-2">Goodreads</h3>
              <Link
                href="https://www.goodreads.com/author/show/17736617.Mohtasim_Hadi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-2 bg-stone-600 text-white rounded hover:bg-stone-700 transition"
              >
                Visit Profile →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function TagFilterGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string
  options: string[]
  selected: string | null
  onChange: (value: string | null) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-gray-700 font-medium">{label}</span>
      <div className="flex flex-wrap gap-2">
        <TagButton
          key="all"
          label="All"
          active={selected === null}
          onClick={() => onChange(null)}
        />
        {options.map((opt) => (
          <TagButton
            key={opt}
            label={opt}
            active={selected === opt}
            onClick={() => onChange(selected === opt ? null : opt)}
          />
        ))}
      </div>
    </div>
  )
}

function TagButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm border transition ${active
        ? 'bg-gray-800 text-white border-gray-800'
        : 'bg-indigo-50 text-gray-700 border-gray-300 hover:bg-gray-100'
        }`}
    >
      {label}
    </button>
  )
}



function BookCard({ book }: { book: ParsedBook }) {
  return (
    <div className="bg-teal-50 border border-teal-200 p-4 flex flex-col sm:flex-row gap-6 text-sm text-gray-800 h-[300px] sm:h-[300px]">
      {book.cover ? (
        <div className="w-full sm:w-40 aspect-[2/3] relative flex-shrink-0">
          <Image
            src={book.cover}
            alt={book.title}
            width={400}
            height={500}
            className="object-cover"
          />
        </div>
      ) : (
        <div className="bg-gray-100 w-full sm:w-40 h-full flex items-center justify-center text-sm flex-shrink-0">
          No Cover
        </div>
      )}

      <div className="flex flex-col justify-between overflow-hidden">
        <div className="space-y-1 overflow-hidden">
          <p className='text-gray-500'>{book.date}</p>
          <h3 className="text-lg font-semibold leading-snug">{book.title}</h3>
          <p className="text-gray-600">{book.authors.join(', ')}</p>
          <p className="text-xs text-gray-500 italic"><strong>Publisher: </strong>{book.publisher}</p>

          {book.series && (
            <p>
              <span className="font-medium text-gray-700">Series:</span>{' '}
              {book.series}
            </p>
          )}

          {book.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 text-xs text-gray-600 mt-1">
              {book.tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 border border-gray-400">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {book.synopsis && (
            <p className="text-gray-700 mt-2 line-clamp-4">
              {book.synopsis}
            </p>
          )}
        </div>

        <div className="flex justify-end items-center text-xs text-gray-500 pt-2">
          {book.goodreads && (
            <Link
              href={book.goodreads}
              target="_blank"
              className="text-teal-600 hover:underline"
            >
              Goodreads →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
