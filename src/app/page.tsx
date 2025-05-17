"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Card from "@/components/Card"
import type { ParsedPage } from "@/types/notion"
import SkeletonCard from "@/components/ui/SkeletonCard"


export default function HomePage() {
      const [cursor, setCursor] = useState<string | null>(null)
      const [hasMore, setHasMore] = useState(true)
      const [loading, setLoading] = useState(true)
      const [loadingMore, setLoadingMore] = useState(false)

      const [patents, setPatents] = useState<ParsedPage[]>([])
      const [publications, setPublications] = useState<ParsedPage[]>([])
      const [presentations, setPresentations] = useState<ParsedPage[]>([])
      const [projects, setProjects] = useState<ParsedPage[]>([])
      const [newsItems, setNewsItems] = useState<ParsedPage[]>([])

      const [articles, setArticles] = useState<ParsedPage[]>([])
      const [journals, setJournals] = useState<ParsedPage[]>([])
      const [typists, setTypists] = useState<ParsedPage[]>([])
      const [poetries, setPoetries] = useState<ParsedPage[]>([])

      const fetchPages = async (cursor: string | null = null, isLoadingMore = false) => {
            if (isLoadingMore) {
                  setLoadingMore(true)
            } else {
                  setLoading(true)
            }

            try {
                  const [researchRes, newsRes, blogRes] = await Promise.all([
                        axios.post("/api/notion", {
                              cursor,
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
                              cursor,
                              filters: { property: "Type", select: { equals: "News" } },
                        }),
                        axios.post("/api/notion", {
                              cursor,
                              filters: {
                                    and: [
                                          {
                                                or: [
                                                      { property: "Type", select: { equals: "Article" } },
                                                      { property: "Type", select: { equals: "Journal" } },
                                                      { property: "Type", select: { equals: "Typist" } },
                                                      { property: "Type", select: { equals: "Poetry" } },
                                                ],
                                          },
                                          { property: "Featured", checkbox: { equals: true } },
                                    ],
                              },
                        }),
                  ])

                  const researchPages: ParsedPage[] = researchRes.data.results
                  const newsPages: ParsedPage[] = newsRes.data.results
                  const blogPages: ParsedPage[] = blogRes.data.results

                  setPatents((prev) => [...prev, ...researchPages.filter((p) => p.type === "Patent")])
                  setPublications((prev) => [...prev, ...researchPages.filter((p) => p.type === "Publication")])
                  setPresentations((prev) => [...prev, ...researchPages.filter((p) => p.type === "Presentation")])
                  setProjects((prev) => [...prev, ...researchPages.filter((p) => p.type === "Project")])
                  setNewsItems((prev) => [...prev, ...newsPages.filter((p) => p.type === "News")])

                  setArticles((prev) => [...prev, ...blogPages.filter((p) => p.type === "Article")])
                  setJournals((prev) => [...prev, ...blogPages.filter((p) => p.type === "Journal")])
                  setTypists((prev) => [...prev, ...blogPages.filter((p) => p.type === "Typist")])
                  setPoetries((prev) => [...prev, ...blogPages.filter((p) => p.type === "Poetry")])

                  setCursor(researchRes.data.next_cursor || newsRes.data.next_cursor || blogRes.data.next_cursor)
                  setHasMore(researchRes.data.has_more || newsRes.data.has_more || blogRes.data.has_more)
            } catch (err) {
                  console.error(err)
            }

            if (isLoadingMore) {
                  setLoadingMore(false)
            } else {
                  setLoading(false)
            }
      }

      useEffect(() => {
            fetchPages()
      }, [])

      return (
            <>
                  <main className="container px-6 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
                        <div className="lg:col-span-2">
                              {/* Research: Patents */}
                              <section className="pb-8 border-b border-gray-300">
                                    <h2 className="text-xl font-semibold mb-4">Patents</h2>
                                    <div className="grid grid-cols-1 gap-4">
                                          {loading ? (
                                                [...Array(2)].map((_, index) => <SkeletonCard key={`patent-skeleton-${index}`} />)
                                          ) : patents.length > 0 ? (
                                                patents.map((page) => <Card key={page.id} variant="normal" {...page} />)
                                          ) : (
                                                <p className="text-gray-500">No patents to display</p>
                                          )}
                                    </div>
                              </section>

                              {/* Research: Projects + Publications */}
                              <section className="py-8 border-b border-gray-300 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex flex-col gap-4 col-span-2">
                                          <h2 className="text-xl font-semibold">Projects</h2>
                                          {loading ? (
                                                [...Array(2)].map((_, index) => <SkeletonCard key={`project-skeleton-${index}`} />)
                                          ) : projects.length > 0 ? (
                                                projects.map((page) => <Card key={page.id} variant="normal" {...page} />)
                                          ) : (
                                                <p className="text-gray-500">No projects to display</p>
                                          )}
                                    </div>
                                    <div className="flex flex-col gap-4 border-l border-gray-300 pl-4">
                                          <h2 className="text-xl font-semibold">Publications</h2>
                                          {loading ? (
                                                [...Array(2)].map((_, index) => <SkeletonCard key={`publication-skeleton-${index}`} />)
                                          ) : publications.length > 0 ? (
                                                publications.map((page) => <Card key={page.id} variant="normal" {...page} />)
                                          ) : (
                                                <p className="text-gray-500">No publications to display</p>
                                          )}
                                    </div>
                              </section>


                              <section className="pt-8 border-b border-gray-300">
                                    <h2 className="text-xl font-semibold mb-4">Presentations</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          {loading ? (
                                                [...Array(2)].map((_, index) => <SkeletonCard key={`presentation-skeleton-${index}`} />)
                                          ) : presentations.length > 0 ? (
                                                presentations.map((page) => <Card key={page.id} variant="normal" {...page} />)
                                          ) : (
                                                <p className="text-gray-500">No presentations to display</p>
                                          )}
                                    </div>
                              </section>

                              {/* Blog: Articles */}
                              <section className="pt-8 border-b border-gray-300">
                                    <h2 className="text-xl font-semibold mb-4">Articles</h2>
                                    <div className="grid grid-cols-1 gap-4">
                                          {loading ? (
                                                [...Array(2)].map((_, index) => <SkeletonCard key={`article-skeleton-${index}`} />)
                                          ) : articles.length > 0 ? (
                                                articles.map((page) => <Card key={page.id} variant="normal" {...page} />)
                                          ) : (
                                                <p className="text-gray-500">No articles to display</p>
                                          )}
                                    </div>
                              </section>

                              {/* Blog: Journals + Poetries */}
                              <section className="py-8 border-b border-gray-300 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex flex-col gap-4 col-span-2">
                                          <h2 className="text-xl font-semibold">Journals</h2>
                                          {loading ? (
                                                [...Array(2)].map((_, index) => <SkeletonCard key={`journal-skeleton-${index}`} />)
                                          ) : journals.length > 0 ? (
                                                journals.map((page) => <Card key={page.id} variant="normal" {...page} />)
                                          ) : (
                                                <p className="text-gray-500">No journals to display</p>
                                          )}
                                    </div>
                                    <div className="flex flex-col gap-4 border-l border-gray-300 pl-4">
                                          <h2 className="text-xl font-semibold">Poetries</h2>
                                          {loading ? (
                                                [...Array(2)].map((_, index) => <SkeletonCard key={`poetry-skeleton-${index}`} />)
                                          ) : poetries.length > 0 ? (
                                                poetries.map((page) => <Card key={page.id} variant="normal" {...page} />)
                                          ) : (
                                                <p className="text-gray-500">No poetries to display</p>
                                          )}
                                    </div>
                              </section>
                        </div>


                        <div className="flex flex-col gap-4 lg:border-l border-gray-300 border-opacity-50 lg:pl-6">
                              <section>
                                    <h2 className="text-xl font-semibold mb-4">News</h2>
                                    {loading ? (
                                          [...Array(3)].map((_, index) => <SkeletonCard key={`news-skeleton-${index}`} />)
                                    ) : newsItems.length > 0 ? (
                                          newsItems.slice(0, 5).map((page) => <Card key={page.id} variant="normal" {...page} />)
                                    ) : (
                                          <p className="text-gray-500">No news to display</p>
                                    )}
                              </section>

                              <section className="mt-8">
                                    <h2 className="text-xl font-semibold mb-4">Typists</h2>
                                    {loading ? (
                                          [...Array(2)].map((_, index) => <SkeletonCard key={`typist-skeleton-${index}`} />)
                                    ) : typists.length > 0 ? (
                                          typists.map((page) => <Card key={page.id} variant="normal" {...page} />)
                                    ) : (
                                          <p className="text-gray-500">No typists to display</p>
                                    )}
                              </section>
                        </div>

                        {hasMore && (
                              <div className="lg:col-span-3 mt-6 text-center">
                                    <button
                                          onClick={() => fetchPages(cursor, true)}
                                          className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition disabled:opacity-50 shadow-md"
                                          disabled={loadingMore}
                                    >
                                          {loadingMore ? (
                                                <span className="flex items-center justify-center gap-2">
                                                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                      Loading more...
                                                </span>
                                          ) : (
                                                "Load More"
                                          )}
                                    </button>
                              </div>
                        )}
                  </main>
            </>
      )
}
