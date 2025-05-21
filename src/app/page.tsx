"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import axios from "axios"
import AboutDesctiption from "@/components/About/Description"
import type { ParsedPage } from "@/types/notion"
import NewsCarousel from "@/components/news-carousel"

export default function HomePage() {
      const [loading, setLoading] = useState(true)

      const [newsItems, setNewsItems] = useState<ParsedPage[]>([])
      const [featuredNews, setFeaturedNews] = useState<ParsedPage | null>(null)

      const fetchPages = async () => {
            setLoading(true)

            try {
                  const [, newsRes] = await Promise.all([
                        // research & blog endpoints removed as unused
                        axios.post("/api/notion", {
                              filters: {
                                    and: [
                                          {
                                                or: [
                                                      { property: "Type", select: { equals: "Patent" } },
                                                      { property: "Type", select: { equals: "Publication" } },
                                                      { property: "Type", select: { equals: "Presentation" } },
                                                      { property: "Type", select: { equals: "Project" } },
                                                ],
                                          },
                                          { property: "Featured", checkbox: { equals: true } },
                                    ],
                              },
                        }),
                        axios.post("/api/notion", {
                              filters: { property: "Type", select: { equals: "News" } },
                        }),
                  ])

                  const newsPages: ParsedPage[] = newsRes.data.results

                  if (newsPages.length > 0 && !featuredNews) {
                        setFeaturedNews(newsPages[0])
                        setNewsItems(newsPages.slice(1))
                  } else {
                        setNewsItems(newsPages)
                  }
            } catch (err) {
                  console.error(err)
            }

            setLoading(false)
      }

      useEffect(() => {
            fetchPages()
      }, [])

      return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
                  <AboutDesctiption />
                  <section className="bg-white py-12">
                        <div className="container mx-auto px-4">
                              <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold">Latest News</h2>
                                    <Link
                                          href="/news"
                                          className="text-slate-600 hover:text-slate-900 flex items-center gap-1 text-sm font-medium"
                                    >
                                          View all news
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                                                <path d="m9 18 6-6-6-6" />
                                          </svg>
                                    </Link>

                              </div>

                              <div className="bg-slate-50 overflow-hidden shadow-sm">
                                    <NewsCarousel items={featuredNews ? [featuredNews, ...newsItems] : newsItems} loading={loading} />
                              </div>
                        </div>
                  </section>
            </div>
      )
}
