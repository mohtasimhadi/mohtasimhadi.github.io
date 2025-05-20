import Image from "next/image"
import { Calendar, Building, Users, Tag} from "lucide-react"
import type { CardProps } from "@/types/props"
import Link from "next/link"

const typeMap: Record<string, string> = {
  news: "news",
  article: "articles",
  journal: "journals",
  typist: "typist",
  poetry: "poetries",
  patent: "patents",
  publication: "publications",
  presentation: "presentations",
  project: "projects",
  News: "news",
  Article: "articles",
  Journal: "journals",
  Typist: "typist",
  Poetry: "poetries",
  Patent: "patents",
  Publication: "publications",
  Presentation: "presentations",
  Project: "projects",
}

export default function Card({
  variant,
  id,
  title,
  cover,
  date,
  type,
  affiliation,
  authors,
  publisher,
  tags,
}: CardProps) {
  const formattedDate = date ? new Date(date).toLocaleDateString() : null
  type = typeMap[type] || type

  const content = (
    <>
      {date && (
        <p className="text-sm flex items-center gap-1 text-gray-600">
          <Calendar size={16} />
          {formattedDate}
        </p>
      )}
      <h2 className="text-large font-semibold">{title}</h2>

      {authors && authors.length > 0 && (
        <div className="text-sm text-gray-600 flex">
          <span className="flex-shrink-0 mr-1 mt-[2px]">
            <Users size={16} />
          </span>
          <p className="whitespace-normal break-words">{authors.join(", ")}</p>
        </div>
      )}


      {/* Display affiliation if available */}
      {affiliation && affiliation.length > 0 && (
        <p className="text-sm flex items-center gap-1 text-gray-600">
          <Building size={16} />
          {affiliation.join(", ")}
        </p>
      )}

      {publisher && (
        <p className="text-xs flex items-center gap-1 text-gray-600">
          {publisher}
        </p>
      )}

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs bg-gray-600 text-white px-2 py-1 rounded flex items-center gap-1">
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  )

  if (variant === "normal") {
    return (
      <Link href={`/${type}/${id}`} className="hover:underline">
        <div className="p-4 m-4 flex flex-col gap-3">
          {cover && (
            <div className="relative w-full h-48 overflow-hidden">
              <Image src={cover || "/placeholder.svg"} alt={title} fill style={{ objectFit: "cover" }} />
            </div>
          )}
          <div className="flex flex-col gap-2">{content}</div>
        </div>
      </Link>
    )
  }

  if (variant === "long") {
    return (
      <Link href={`/${type}/${id}`} className="hover:underline">
        <div className="p-4 flex items-start gap-4 h-full">
          <div className="flex-1 flex flex-col gap-2">{content}</div>
          {cover && (
            <div className="relative w-32 h-32 overflow-hidden flex-shrink-0">
              <Image src={cover || "/placeholder.svg"} alt={title} fill style={{ objectFit: "cover" }} />
            </div>
          )}
        </div>
      </Link>
    )
  }

  return null
}
