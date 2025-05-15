import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { CardProps } from '@/types/props'
import Link from 'next/link'

const typeMap: Record<string, string> = {
  news: 'news',
  article: 'articles',
  journal: 'journals',
  typist: 'typist',
  poetry: 'poetries',
  patent: 'patents',
  publication: 'publications',
  presentation: 'presentations',
  project: 'projects'
}

export default function Card({
  variant,
  id,
  title,
  cover,
  date,
  type,
}: CardProps) {
  const formattedDate = date ? new Date(date).toLocaleDateString() : null
  type = typeMap[type] || type

  const content = (
    <>
      {date && (
        <p className="text-gray-900 text-sm flex items-center gap-1">
          <Calendar size={16} />
          {formattedDate}
        </p>
      )}
      <h2 className="text-xl font-semibold">{title}</h2>
    </>
  )

  if (variant === 'normal') {
    return (
      <Link href={`/${type}/${id}`} className='hover:underline'>
        <div className="p-4 bg-white flex flex-col gap-3">
          {cover && (
            <div className="relative w-full h-48  overflow-hidden">
              <Image src={cover} alt={title} fill style={{ objectFit: 'cover' }} />
            </div>
          )}
          {content}
        </div>
      </Link>
    )
  }

  if (variant === 'long') {
    return (
      <Link href={`/${type}/${id}`} className='hover:underline'>
        <div className="p-4 bg-white flex items-center gap-4">
          <div className="flex-1">{content}</div>
          {cover && (
            <div className="relative w-32 h-32  overflow-hidden flex-shrink-0">
              <Image src={cover} alt={title} fill style={{ objectFit: 'cover' }} />
            </div>
          )}
        </div>
      </Link>
    )
  }

  return null
}