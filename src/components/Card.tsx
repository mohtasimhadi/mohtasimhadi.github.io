import Image from 'next/image'
import { Calendar, User, Tag } from 'lucide-react'
import { CardProps } from '@/types/props'
import Link from 'next/link'

export default function Card({
  variant,
  id,
  title,
  cover,
  date,
  authors,
  keywords,
  type,
}: CardProps) {
  const formattedDate = date ? new Date(date).toLocaleDateString() : null
  console.log("ID", id)
  if (variant === 'large') {
    return (
      <div className="flex gap-6 p-4 bg-white">
        {cover && (
          <div className="flex-shrink-0 relative w-48 h-48  overflow-hidden">
            <Image src={cover} alt={title} fill style={{ objectFit: 'cover' }} />
          </div>
        )}
        <div className="flex flex-col justify-center gap-2 flex-1">
          <Link href={`/${type}/${id}`}><h2 className="text-2xl font-semibold">{title}</h2></Link>
          {date && (
            <p className="text-gray-900 text-sm flex items-center gap-1">
              <Calendar size={16} />
              {formattedDate}
            </p>
          )}
          {authors && authors.length > 0 && (
            <p className="text-sm text-gray-700 flex items-center gap-1">
              <User size={16} />
              {authors.join(', ')}
            </p>
          )}
          {keywords && keywords.length > 0 && (
            <p className="text-sm text-gray-700 mt-2 flex items-center gap-1">
              <Tag size={16} />
              {keywords.join(', ')}
            </p>
          )}
        </div>
      </div>
    )
  }

  const content = (
    <>
      {date && (
        <p className="text-gray-900 text-sm flex items-center gap-1">
          <Calendar size={16} />
          {formattedDate}
        </p>
      )}
      <Link href={`/${type}/${id}`}><h2 className="text-xl font-semibold">{title}</h2></Link>
      {authors && authors.length > 0 && (
        <p className="text-sm text-gray-700 flex items-center gap-1">
          <User size={16} />
          {authors.join(', ')}
        </p>
      )}
      {keywords && keywords.length > 0 && (
        <p className="text-sm text-gray-700 mt-1 flex items-center gap-1">
          <Tag size={16} />
          {keywords.join(', ')}
        </p>
      )}
    </>
  )

  if (variant === 'normal') {
    return (
      <div className="p-4 bg-white flex flex-col gap-3">
        {cover && (
          <div className="relative w-full h-48  overflow-hidden">
            <Image src={cover} alt={title} fill style={{ objectFit: 'cover' }} />
          </div>
        )}
        {content}
      </div>
    )
  }

  if (variant === 'long') {
    return (
      <div className="p-4 bg-white flex items-center gap-4">
        <div className="flex-1">{content}</div>
        {cover && (
          <div className="relative w-32 h-32  overflow-hidden flex-shrink-0">
            <Image src={cover} alt={title} fill style={{ objectFit: 'cover' }} />
          </div>
        )}
      </div>
    )
  }

  return null
}