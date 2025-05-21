import Image from "next/image"
import { Calendar, Building, Users, Tag } from "lucide-react"
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
      <h2 className={`${variant === "featured" ? "text-xl" : "text-large"} font-semibold`}>{title}</h2>

      {authors && authors.length > 0 && (
        <div className="text-sm text-gray-600 flex">
          <span className="flex-shrink-0 mr-1 mt-[2px]">
            <Users size={variant === "featured" ? 18 : 16} />
          </span>
          <p className="whitespace-normal break-words">{authors.join(", ")}</p>
        </div>
      )}

      {/* Display affiliation if available */}
      {affiliation && affiliation.length > 0 && (
        <p className="text-sm flex items-center gap-1 text-gray-600">
          <Building size={variant === "featured" ? 18 : 16} />
          {affiliation.join(", ")}
        </p>
      )}

      {publisher && <p className="text-xs flex items-center gap-1 text-gray-600">{publisher}</p>}
    </>
  )

  if (variant === "featured") {
    return (
      <Link href={`/${type}/${id}`} className="group">
        <div className="transition-all duration-300 border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {cover && (
              <div className="relative w-full md:w-1/2 h-64 overflow-hidden">
                <Image
                  src={cover || "/placeholder.svg"}
                  alt={title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bg-blue-600 text-white top-0 left-0 px-3 py-1 text-sm font-medium">
                  Featured
                </div>
              </div>
            )}

            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                {date && (
                  <p className="text-sm flex items-center gap-1 text-gray-600">
                    <Calendar size={18} />
                    {formattedDate}
                  </p>
                )}
                <div className="flex flex-col gap-3">{content}</div>

                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-600 text-white px-2 py-1 flex items-center gap-1"
                      >
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200 flex items-center">
                  Read more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === "normal") {
    return (
      <Link href={`/${type}/${id}`} className="hover:underline">
        <div className="p-4 m-4 flex flex-col gap-3">
          {cover && (
            <div className="relative w-full h-48 overflow-hidden">
              <Image src={cover || "/placeholder.svg"} alt={title} fill style={{ objectFit: "cover" }} />
            </div>
          )}
          {date && (
            <p className="text-sm flex items-center gap-1 text-gray-600">
              <Calendar size={16} />
              {formattedDate}
            </p>
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
          {date && (
            <p className="text-sm flex items-center gap-1 text-gray-600">
              <Calendar size={16} />
              {formattedDate}
            </p>
          )}
          <div className="flex-1 flex flex-col gap-2">
            {content}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-600 text-white px-2 py-1 flex items-center gap-1"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
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