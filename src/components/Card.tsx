import { CardProps } from "@/types/props"

export default function Card({
  variant,
  title,
  cover,
  date,
  authors,
  keywords,
}: CardProps) {
  const formattedDate = date ? new Date(date).toLocaleDateString() : null
  if (variant === 'large') {
    return (
      <div className="flex gap-6 p-4 border rounded-2xl shadow bg-white">
        {cover && (
          <img
            src={cover}
            alt={title}
            className="w-48 h-48 object-cover rounded-xl flex-shrink-0"
          />
        )}
        <div className="flex flex-col justify-center gap-2 flex-1">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {date && <p className="text-gray-500 text-sm">📅 {formattedDate}</p>}
          {authors && authors.length > 0 && (
            <p className="text-sm text-gray-600">✍️ {authors.join(', ')}</p>
          )}
          {keywords && keywords.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              🏷️ {keywords.join(', ')}
            </p>
          )}
        </div>
      </div>
    )
  }

  const content = (
    <>
      {date && <p className="text-gray-500 text-sm">{formattedDate}</p>}
      <h2 className="text-xl font-semibold">{title}</h2>
      {authors && authors.length > 0 && (
        <p className="text-sm text-gray-600">✍️ {authors.join(', ')}</p>
      )}
      {keywords && keywords.length > 0 && (
        <p className="text-sm text-gray-500 mt-1">🏷️ {keywords.join(', ')}</p>
      )}
    </>
  )

  if (variant === 'normal') {
    return (
      <div className="border rounded-2xl shadow p-4 bg-white flex flex-col gap-3">
        {cover && (
          <img
            src={cover}
            alt={title}
            className="w-full h-48 object-cover rounded-xl"
          />
        )}
        {content}
      </div>
    )
  }

  if (variant === 'long') {
    return (
      <div className="border rounded-2xl shadow p-4 bg-white flex items-center gap-4">
        <div className="flex-1">{content}</div>
        {cover && (
          <img
            src={cover}
            alt={title}
            className="w-32 h-32 object-cover rounded-xl flex-shrink-0"
          />
        )}
      </div>
    )
  }

  return null
}