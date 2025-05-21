"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Facebook, Linkedin, LinkIcon } from "lucide-react"
import { SiX } from "react-icons/si"
import Image from "next/image"
import type { ParsedPage } from "@/types/notion"
import Head from "next/head"

// Custom component to render links and detect YouTube URLs
const CustomLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, children, ...props }) => {
      if (!href) return <>{children}</>

      const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i
      const match = href.match(youtubeRegex)

      if (match && match[1]) {
            const videoId = match[1]
            return (
                  <div className="my-6">
                        <iframe
                              width="100%"
                              height="400"
                              src={`https://www.youtube.com/embed/${videoId}`}
                              title="YouTube video player"
                              frameBorder={0}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg shadow-lg"
                              loading="lazy"
                        ></iframe>
                  </div>
            )
      }

      const isInternal = href.startsWith("/") || href.startsWith("#")

      return (
            <a
                  href={href}
                  target={isInternal ? undefined : "_blank"}
                  rel={isInternal ? undefined : "noopener noreferrer"}
                  className="text-blue-600 hover:underline"
                  {...props}
            >
                  {children}
            </a>
      )
}

// Custom components for heading levels to ensure proper heading hierarchy
const CustomHeadings = {
      h1: ({ children, ...props }: React.ComponentPropsWithoutRef<"h2">) => (
            <h2 className="text-3xl font-semibold mt-6 mb-4" {...props}>
                  {children}
            </h2>
      ),
      h2: ({ children, ...props }: React.ComponentPropsWithoutRef<"h3">) => (
            <h3 className="text-2xl font-semibold mt-5 mb-3" {...props}>
                  {children}
            </h3>
      ),
      h3: ({ children, ...props }: React.ComponentPropsWithoutRef<"h4">) => (
            <h4 className="text-xl font-semibold mt-4 mb-2" {...props}>
                  {children}
            </h4>
      ),
      h4: ({ children, ...props }: React.ComponentPropsWithoutRef<"h5">) => (
            <h5 className="text-lg font-semibold mt-3 mb-2" {...props}>
                  {children}
            </h5>
      ),
      h5: ({ children, ...props }: React.ComponentPropsWithoutRef<"h6">) => (
            <h6 className="text-base font-semibold mt-3 mb-2" {...props}>
                  {children}
            </h6>
      ),
      h6: ({ children, ...props }: React.ComponentPropsWithoutRef<"h6">) => (
            <h6 className="text-sm font-semibold mt-3 mb-2" {...props}>
                  {children}
            </h6>
      ),
}

const Article: React.FC<{ page: ParsedPage; data: string }> = ({ page, data }) => {
      const { title, cover, affiliation, authors, date, publisher, status, tags, featured } = page

      console.log(page)

      const [url, setUrl] = useState("")
      useEffect(() => {
            if (typeof window !== "undefined") {
                  setUrl(window.location.href)
            }
      }, [])

      const formattedDate = date ? new Date(date).toLocaleDateString() : null

      const shareText = encodeURIComponent(title || "Untitled")
      const encodedUrl = encodeURIComponent(url)

      const [copied, setCopied] = useState(false)

      const handleCopyLink = () => {
            if (url) {
                  void navigator.clipboard.writeText(url)
                  setCopied(true)
            }
      }

      useEffect(() => {
            if (copied) {
                  const timeout = setTimeout(() => setCopied(false), 2000)
                  return () => clearTimeout(timeout)
            }
      }, [copied])

      // SEO metadata generation
      const generateSeoMetadata = () => {
            const publishedTime = date ? new Date(date).toISOString() : undefined

            return {
                  title: title || "Untitled Article",
                  description: "",
                  openGraph: {
                        title: title || "Untitled Article",
                        description: "",
                        url: url,
                        type: "article",
                        article: {
                              publishedTime,
                              modifiedTime: publishedTime,
                              authors: authors?.map((author) => author) || [],
                              tags: tags || [],
                        },
                        images: cover
                              ? [
                                    {
                                          url: cover,
                                          width: 1200,
                                          height: 630,
                                          alt: `Cover image for ${title || "article"}`,
                                    },
                              ]
                              : [],
                  },
                  twitter: {
                        card: "summary_large_image",
                        title: title || "Untitled Article",
                        description: "",
                        images: cover ? [cover] : [],
                  },
            }
      }

      // Add this inside the component before the return statement
      const seoMetadata = generateSeoMetadata()

      return (
            <article className="relative max-w-6xl mx-auto border-gray-400">

                  <title>{seoMetadata.title}</title>
                  <meta name="description" content={seoMetadata.description} />
                  <meta property="og:title" content={seoMetadata.title} />
                  <meta property="og:description" content={seoMetadata.description} />
                  <meta property="og:type" content="article" />
                  <meta property="og:url" content={url} />
                  <meta property="og:image" content={cover || "/placeholder.svg"} />
                  <meta property="og:site_name" content="the Moho Blog" />
                  <meta property="og:locale" content="en_US" />
                  <meta property="og:article:section" content={tags?.join(", ") || "General"} />
                  <meta property="og:article:author" content={authors?.join(", ") || "Unknown"} />
                  <meta property="og:article:tag" content={tags?.join(", ") || "General"} />

                  {/* Cover Image */}
                  <div className="relative">
                        {cover && (
                              <div className="relative w-full h-72">
                                    <Image
                                          src={cover || "/placeholder.svg"}
                                          alt={`Cover image for ${title || "article"}`}
                                          fill
                                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                          priority
                                          className="object-cover"
                                    />
                              </div>
                        )}

                        {featured && <div className="absolute top-0 left-0 bg-blue-600 text-white text-lg px-4 py-1">Featured</div>}
                  </div>

                  <div className="p-6 ">
                        <div className="flex items-center justify-between mb-2">
                              <div className="text-sm text-gray-500">
                                    {formattedDate && date && <time dateTime={new Date(date).toISOString()}>{formattedDate}</time>}
                              </div>
                              <div className="flex flex-col items-end gap-1 text-blue-700">
                                    <div className="flex gap-3">
                                          <a
                                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Share on Facebook"
                                                className="hover:text-blue-800"
                                                aria-label="Share on Facebook"
                                          >
                                                <Facebook size={18} />
                                          </a>
                                          <a
                                                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${shareText}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Share on LinkedIn"
                                                className="hover:text-blue-800"
                                                aria-label="Share on LinkedIn"
                                          >
                                                <Linkedin size={18} />
                                          </a>
                                          <a
                                                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Share on X"
                                                className="hover:text-blue-800"
                                                aria-label="Share on X"
                                          >
                                                <SiX size={18} />
                                          </a>
                                          <button
                                                onClick={handleCopyLink}
                                                title="Copy Link"
                                                className="hover:text-blue-800"
                                                aria-label="Copy article link"
                                                type="button"
                                          >
                                                <LinkIcon size={18} />
                                          </button>
                                    </div>
                                    {copied && <span className="text-xs text-gray-600">Link copied!</span>}
                              </div>
                        </div>

                        {affiliation && affiliation.length > 0 && (
                              <p className="text-sm text-gray-600 mb-2">{affiliation.join(", ")}</p>
                        )}

                        <h1 className="text-3xl font-semibold text-gray-800 mb-4">{title || "Untitled"}</h1>

                        {authors && authors.length > 0 && (
                              <address className="text-lg text-gray-800 mb-2 not-italic">By {authors.join(", ")}</address>
                        )}

                        {publisher && <p className="text-sm text-gray-800 mb-2">{publisher}</p>}

                        <div className="flex items-center gap-4 mb-4">
                              {status && (
                                    <p
                                          className={`text-sm ${status === "Done" || status === "Published" ? "text-green-600" : "text-yellow-600"
                                                }`}
                                    >
                                          {status}
                                    </p>
                              )}

                              {tags && tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                          {tags.map((tag: string, i: number) => (
                                                <span key={i} className="bg-gray-300 text-gray-800 text-xs font-medium py-1 px-3">
                                                      {tag}
                                                </span>
                                          ))}
                                    </div>
                              )}
                        </div>

                        <div className="border-t-1 border-gray-400 text-justify leading-relaxed text-gray-900 mt-6 markdown-content">
                              <div className="pt-5">
                                    <Markdown
                                          remarkPlugins={[remarkGfm]}
                                          components={{
                                                a: CustomLink,
                                                ...CustomHeadings,
                                          }}
                                    >
                                          {data}
                                    </Markdown>
                              </div>
                        </div>
                  </div>
            </article>
      )
}

export default Article
