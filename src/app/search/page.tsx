"use client"

import { useState, useCallback, useEffect } from "react"
import axios from "axios"
import Card from "@/components/Card"
import type { ParsedPage } from "@/types/notion"
import { Search, Filter, X, ChevronDown, ChevronUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
      Sheet,
      SheetContent,
      SheetDescription,
      SheetHeader,
      SheetTitle,
      SheetTrigger,
      SheetFooter,
      SheetClose,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import useMediaQuery from "@/hooks/use-mobile"


const TYPES = ["article", "project", "journal", "news", "poetry", "presentation", "publication", "patent"]

export default function SearchPage() {
      const [query, setQuery] = useState("")
      const [selectedTypes, setSelectedTypes] = useState<string[]>([])
      const [selectedTags, setSelectedTags] = useState<string[]>([])
      const [featuredOnly, setFeaturedOnly] = useState(false)
      const [dateFrom, setDateFrom] = useState("")
      const [dateTo, setDateTo] = useState("")
      const [allResults, setAllResults] = useState<ParsedPage[]>([])
      const [results, setResults] = useState<ParsedPage[]>([])
      const [loading, setLoading] = useState(false)
      const [submitted, setSubmitted] = useState(false)
      const [allTags, setAllTags] = useState<string[]>([])
      const [filtersOpen, setFiltersOpen] = useState(false)
      const isMobile = useMediaQuery("(max-width: 768px)")

      const activeFiltersCount =
            selectedTypes.length + selectedTags.length + (featuredOnly ? 1 : 0) + (dateFrom ? 1 : 0) + (dateTo ? 1 : 0)

      const toggleSelection = (value: string, current: string[], setter: (v: string[]) => void) => {
            setter(current.includes(value) ? current.filter((v) => v !== value) : [...current, value])
      }

      const handleSearch = useCallback(async () => {
            if (!query.trim()) return

            setLoading(true)
            setSubmitted(true)

            try {
                  const res = await axios.post("/api/search", { query })

                  const fetchedResults = res.data.results as ParsedPage[]
                  setAllResults(fetchedResults)

                  // Extract and set tags
                  const tagsSet = new Set<string>()
                  fetchedResults.forEach((item) => {
                        item.tags.forEach((tag) => tagsSet.add(tag))
                  })
                  setAllTags(Array.from(tagsSet).sort())
            } catch (err) {
                  console.error("Search failed:", err)
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
                  filtered = filtered.filter((item) => item.tags.some((tag) => selectedTags.includes(tag)))
            }

            if (featuredOnly) {
                  filtered = filtered.filter((item) => item.featured === true)
            }

            if (dateFrom) {
                  filtered = filtered.filter((item) => new Date(item.date) >= new Date(dateFrom))
            }

            if (dateTo) {
                  filtered = filtered.filter((item) => new Date(item.date) <= new Date(dateTo))
            }

            setResults(filtered)
      }, [allResults, selectedTypes, selectedTags, featuredOnly, dateFrom, dateTo, submitted])

      const resetFilters = () => {
            setSelectedTypes([])
            setSelectedTags([])
            setFeaturedOnly(false)
            setDateFrom("")
            setDateTo("")
      }

      return (
            <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
                  {/* Search Bar */}
                  <div className="relative max-w-2xl mx-auto">
                        <div className="flex items-center gap-2 border border-gray-200  shadow-sm focus-within:ring-2 focus-within:ring-black focus-within:border-transparent overflow-hidden">
                              <Search className="ml-4 h-5 w-5 text-gray-400" />
                              <Input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    placeholder="Search by title..."
                                    className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 py-6"
                              />
                              {query && (
                                    <Button variant="ghost" size="icon" onClick={() => setQuery("")} className="h-8 w-8 mr-1">
                                          <X className="h-4 w-4" />
                                          <span className="sr-only">Clear search</span>
                                    </Button>
                              )}
                              <Button onClick={handleSearch} className="rounded-none px-6 py-6 h-full" disabled={!query.trim()}>
                                    Search
                              </Button>
                        </div>
                  </div>

                  {/* Results Section */}
                  {submitted && (
                        <div className="space-y-8">
                              {/* Filters and Results Summary */}
                              <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                          {isMobile ? (
                                                <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                                                      <SheetTrigger asChild>
                                                            <Button variant="outline" className="gap-2">
                                                                  <Filter className="h-4 w-4" />
                                                                  Filters
                                                                  {activeFiltersCount > 0 && (
                                                                        <Badge variant="secondary" className="ml-1">
                                                                              {activeFiltersCount}
                                                                        </Badge>
                                                                  )}
                                                            </Button>
                                                      </SheetTrigger>
                                                      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                                            <SheetHeader>
                                                                  <SheetTitle>Filters</SheetTitle>
                                                                  <SheetDescription>Refine your search results</SheetDescription>
                                                            </SheetHeader>
                                                            <div className="py-4 space-y-6">
                                                                  {/* Mobile Filters */}
                                                                  <div>
                                                                        <h4 className="font-medium mb-3">Type</h4>
                                                                        <div className="grid grid-cols-2 gap-2">
                                                                              {TYPES.map((type) => (
                                                                                    <div key={type} className="flex items-center space-x-2">
                                                                                          <Checkbox
                                                                                                id={`mobile-type-${type}`}
                                                                                                checked={selectedTypes.includes(type)}
                                                                                                onCheckedChange={() => toggleSelection(type, selectedTypes, setSelectedTypes)}
                                                                                          />
                                                                                          <label
                                                                                                htmlFor={`mobile-type-${type}`}
                                                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                                          >
                                                                                                {type}
                                                                                          </label>
                                                                                    </div>
                                                                              ))}
                                                                        </div>
                                                                  </div>

                                                                  <div>
                                                                        <h4 className="font-medium mb-3">Tags</h4>
                                                                        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                                                                              {allTags.map((tag) => (
                                                                                    <Badge
                                                                                          key={tag}
                                                                                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                                                                                          className="cursor-pointer"
                                                                                          onClick={() => toggleSelection(tag, selectedTags, setSelectedTags)}
                                                                                    >
                                                                                          {tag}
                                                                                    </Badge>
                                                                              ))}
                                                                        </div>
                                                                  </div>

                                                                  <div className="space-y-3">
                                                                        <h4 className="font-medium">Date Range</h4>
                                                                        <div className="grid gap-2">
                                                                              <label className="text-sm text-gray-600">
                                                                                    From
                                                                                    <Input
                                                                                          type="date"
                                                                                          value={dateFrom}
                                                                                          onChange={(e) => setDateFrom(e.target.value)}
                                                                                          className="mt-1"
                                                                                    />
                                                                              </label>
                                                                              <label className="text-sm text-gray-600">
                                                                                    To
                                                                                    <Input
                                                                                          type="date"
                                                                                          value={dateTo}
                                                                                          onChange={(e) => setDateTo(e.target.value)}
                                                                                          className="mt-1"
                                                                                    />
                                                                              </label>
                                                                        </div>
                                                                  </div>

                                                                  <div className="flex items-center space-x-2">
                                                                        <Checkbox
                                                                              id="mobile-featured"
                                                                              checked={featuredOnly}
                                                                              onCheckedChange={(checked) => setFeaturedOnly(checked === true)}
                                                                        />
                                                                        <label htmlFor="mobile-featured" className="text-sm font-medium leading-none">
                                                                              Featured only
                                                                        </label>
                                                                  </div>
                                                            </div>
                                                            <SheetFooter className="flex-row justify-between sm:justify-between">
                                                                  <Button variant="outline" onClick={resetFilters} className="w-1/2">
                                                                        Reset
                                                                  </Button>
                                                                  <SheetClose asChild>
                                                                        <Button className="w-1/2">Apply</Button>
                                                                  </SheetClose>
                                                            </SheetFooter>
                                                      </SheetContent>
                                                </Sheet>
                                          ) : (
                                                <>
                                                      <Button variant="outline" className="gap-2" onClick={() => setFiltersOpen(!filtersOpen)}>
                                                            <Filter className="h-4 w-4" />
                                                            Filters
                                                            {activeFiltersCount > 0 && (
                                                                  <Badge variant="secondary" className="ml-1">
                                                                        {activeFiltersCount}
                                                                  </Badge>
                                                            )}
                                                            {filtersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                                      </Button>

                                                      {activeFiltersCount > 0 && (
                                                            <Button
                                                                  variant="ghost"
                                                                  size="sm"
                                                                  onClick={resetFilters}
                                                                  className="h-9 text-sm text-gray-500 hover:text-gray-900"
                                                            >
                                                                  Clear all
                                                            </Button>
                                                      )}
                                                </>
                                          )}

                                          {/* Active Filter Pills */}
                                          {activeFiltersCount > 0 && !isMobile && (
                                                <div className="flex flex-wrap gap-2">
                                                      {selectedTypes.map((type) => (
                                                            <Badge key={`pill-${type}`} variant="secondary" className="pl-2 pr-1 flex items-center gap-1">
                                                                  {type}
                                                                  <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-4 w-4 p-0 hover:bg-transparent"
                                                                        onClick={() => toggleSelection(type, selectedTypes, setSelectedTypes)}
                                                                  >
                                                                        <X className="h-3 w-3" />
                                                                        <span className="sr-only">Remove {type} filter</span>
                                                                  </Button>
                                                            </Badge>
                                                      ))}

                                                      {selectedTags.map((tag) => (
                                                            <Badge key={`pill-${tag}`} variant="secondary" className="pl-2 pr-1 flex items-center gap-1">
                                                                  {tag}
                                                                  <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-4 w-4 p-0 hover:bg-transparent"
                                                                        onClick={() => toggleSelection(tag, selectedTags, setSelectedTags)}
                                                                  >
                                                                        <X className="h-3 w-3" />
                                                                        <span className="sr-only">Remove {tag} filter</span>
                                                                  </Button>
                                                            </Badge>
                                                      ))}

                                                      {featuredOnly && (
                                                            <Badge variant="secondary" className="pl-2 pr-1 flex items-center gap-1">
                                                                  Featured
                                                                  <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-4 w-4 p-0 hover:bg-transparent"
                                                                        onClick={() => setFeaturedOnly(false)}
                                                                  >
                                                                        <X className="h-3 w-3" />
                                                                        <span className="sr-only">Remove featured filter</span>
                                                                  </Button>
                                                            </Badge>
                                                      )}

                                                      {dateFrom && (
                                                            <Badge variant="secondary" className="pl-2 pr-1 flex items-center gap-1">
                                                                  From: {new Date(dateFrom).toLocaleDateString()}
                                                                  <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-4 w-4 p-0 hover:bg-transparent"
                                                                        onClick={() => setDateFrom("")}
                                                                  >
                                                                        <X className="h-3 w-3" />
                                                                        <span className="sr-only">Remove date from filter</span>
                                                                  </Button>
                                                            </Badge>
                                                      )}

                                                      {dateTo && (
                                                            <Badge variant="secondary" className="pl-2 pr-1 flex items-center gap-1">
                                                                  To: {new Date(dateTo).toLocaleDateString()}
                                                                  <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-4 w-4 p-0 hover:bg-transparent"
                                                                        onClick={() => setDateTo("")}
                                                                  >
                                                                        <X className="h-3 w-3" />
                                                                        <span className="sr-only">Remove date to filter</span>
                                                                  </Button>
                                                            </Badge>
                                                      )}
                                                </div>
                                          )}
                                    </div>

                                    {/* Results count */}
                                    {!loading && results.length > 0 && (
                                          <p className="text-sm text-gray-500">
                                                Showing <span className="font-medium">{results.length}</span> of{" "}
                                                <span className="font-medium">{allResults.length}</span> results
                                          </p>
                                    )}
                              </div>

                              {/* Desktop Filters Panel */}
                              {filtersOpen && !isMobile && (
                                    <div className="bg-gray-50 rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                          <Accordion type="multiple" className="w-full" defaultValue={["types", "tags", "dates", "featured"]}>
                                                <AccordionItem value="types">
                                                      <AccordionTrigger className="text-base font-medium">Types</AccordionTrigger>
                                                      <AccordionContent>
                                                            <div className="grid grid-cols-2 gap-2 pt-2">
                                                                  {TYPES.map((type) => (
                                                                        <div key={type} className="flex items-center space-x-2">
                                                                              <Checkbox
                                                                                    id={`type-${type}`}
                                                                                    checked={selectedTypes.includes(type)}
                                                                                    onCheckedChange={() => toggleSelection(type, selectedTypes, setSelectedTypes)}
                                                                              />
                                                                              <label
                                                                                    htmlFor={`type-${type}`}
                                                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                              >
                                                                                    {type}
                                                                              </label>
                                                                        </div>
                                                                  ))}
                                                            </div>
                                                      </AccordionContent>
                                                </AccordionItem>

                                                <AccordionItem value="tags">
                                                      <AccordionTrigger className="text-base font-medium">Tags</AccordionTrigger>
                                                      <AccordionContent>
                                                            <div className="flex flex-wrap gap-2 pt-2 max-h-40 overflow-y-auto">
                                                                  {allTags.map((tag) => (
                                                                        <Badge
                                                                              key={tag}
                                                                              variant={selectedTags.includes(tag) ? "default" : "outline"}
                                                                              className="cursor-pointer"
                                                                              onClick={() => toggleSelection(tag, selectedTags, setSelectedTags)}
                                                                        >
                                                                              {tag}
                                                                        </Badge>
                                                                  ))}
                                                            </div>
                                                      </AccordionContent>
                                                </AccordionItem>

                                                <AccordionItem value="dates">
                                                      <AccordionTrigger className="text-base font-medium">Date Range</AccordionTrigger>
                                                      <AccordionContent>
                                                            <div className="grid gap-3 pt-2">
                                                                  <div className="grid grid-cols-2 gap-3">
                                                                        <div>
                                                                              <label className="text-sm text-gray-600 block mb-1">From</label>
                                                                              <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                                                                        </div>
                                                                        <div>
                                                                              <label className="text-sm text-gray-600 block mb-1">To</label>
                                                                              <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                                                                        </div>
                                                                  </div>

                                                                  {(dateFrom || dateTo) && (
                                                                        <Button
                                                                              variant="ghost"
                                                                              size="sm"
                                                                              onClick={() => {
                                                                                    setDateFrom("")
                                                                                    setDateTo("")
                                                                              }}
                                                                              className="w-fit text-sm text-gray-500"
                                                                        >
                                                                              Clear dates
                                                                        </Button>
                                                                  )}
                                                            </div>
                                                      </AccordionContent>
                                                </AccordionItem>

                                                <AccordionItem value="featured">
                                                      <AccordionTrigger className="text-base font-medium">Featured</AccordionTrigger>
                                                      <AccordionContent>
                                                            <div className="flex items-center space-x-2 pt-2">
                                                                  <Checkbox
                                                                        id="featured"
                                                                        checked={featuredOnly}
                                                                        onCheckedChange={(checked) => setFeaturedOnly(checked === true)}
                                                                  />
                                                                  <label htmlFor="featured" className="text-sm font-medium leading-none flex items-center gap-1">
                                                                        <Star className="h-3.5 w-3.5" /> Featured items only
                                                                  </label>
                                                            </div>
                                                      </AccordionContent>
                                                </AccordionItem>
                                          </Accordion>
                                    </div>
                              )}

                              {/* Loading Indicator */}
                              {loading && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                          {[...Array(6)].map((_, i) => (
                                                <div key={i} className="border rounded-lg overflow-hidden">
                                                      <Skeleton className="h-48 w-full" />
                                                      <div className="p-4 space-y-2">
                                                            <Skeleton className="h-6 w-3/4" />
                                                            <Skeleton className="h-4 w-1/2" />
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              )}

                              {/* No Results Message */}
                              {!loading && submitted && results.length === 0 && (
                                    <div className="text-center py-12 space-y-4">
                                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
                                                <Search className="h-8 w-8 text-gray-400" />
                                          </div>
                                          <div className="space-y-2">
                                                <h3 className="text-xl font-medium">No results found</h3>
                                                <p className="text-gray-500 max-w-md mx-auto">
                                                      We couldn&apos;t find any matches for your search. Try adjusting your search terms or filters.
                                                </p>
                                          </div>
                                          <Button variant="outline" onClick={resetFilters} className="mt-4">
                                                Reset all filters
                                          </Button>
                                    </div>
                              )}

                              {/* Results Grid */}
                              {!loading && results.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                          {results.map((item) => (
                                                <Card
                                                      key={item.id}
                                                      variant="normal"
                                                      {...item}
                                                />
                                          ))}
                                    </div>
                              )}
                        </div>
                  )}
            </main>
      )
}
