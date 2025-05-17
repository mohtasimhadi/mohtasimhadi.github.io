"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Search, Menu, X } from "lucide-react"
import Link from "next/link"

export default function NavPages() {
      const [currentPath, setCurrentPath] = useState("")
      const [isMenuOpen, setIsMenuOpen] = useState(false)
      const [isSearchOpen, setIsSearchOpen] = useState(false)
      const pathname = usePathname()

      useEffect(() => {
            setCurrentPath(pathname)
            setIsMenuOpen(false)
      }, [pathname])

      const links = [
            { href: "/news", label: "NEWS" },
            { href: "/articles", label: "ARTICLES" },
            { href: "/journals", label: "JOURNALS" },
            { href: "/typist", label: "THE TYPIST" },
            { href: "/poetries", label: "POETRIES" },
            { href: "/patents", label: "PATENTS" },
            { href: "/publications", label: "PUBLICATIONS" },
            { href: "/presentations", label: "PRESENTATIONS" },
            { href: "/projects", label: "PROJECTS" },
      ]

      const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
      const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

      return (
            <>
                  <div className="sticky top-0 z-[9999] bg-white shadow-sm">

                        <nav className="container mx-auto px-4">
                              {/* Mobile navigation */}
                              <div className="md:hidden flex items-center justify-between py-3">
                                    <button
                                          onClick={toggleMenu}
                                          className="text-gray-800 focus:outline-none"
                                          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                                    >
                                          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                    </button>

                                    <div className="text-sm font-semibold text-gray-800">
                                          {links.find((link) => link.href === currentPath)?.label || "HOME"}
                                    </div>

                                    <button onClick={toggleSearch} className="text-gray-800 focus:outline-none" aria-label="Search">
                                          <Search className="w-5 h-5" />
                                    </button>
                              </div>

                              {/* Mobile menu */}
                              {isMenuOpen && (
                                    <div className="md:hidden py-2 space-y-3 border-t border-gray-200 animate-in slide-in-from-top duration-300">
                                          {links.map((link) => (
                                                <Link
                                                      key={link.href}
                                                      href={link.href}
                                                      className={`block py-2 text-sm ${currentPath === link.href ? "font-semibold text-gray-900" : "text-gray-600"
                                                            } hover:text-gray-900 transition-colors duration-200`}
                                                >
                                                      {link.label}
                                                </Link>
                                          ))}
                                    </div>
                              )}

                              {/* Desktop navigation */}
                              <div className="hidden md:flex items-center py-3 text-sm">
                                    <div className="flex flex-wrap gap-1 items-center">
                                          {links.map((link, index) => (
                                                <span key={link.href} className="flex items-center">
                                                      <Link
                                                            href={link.href}
                                                            className={`px-2 py-1 rounded-md transition-all duration-200 ${currentPath === link.href
                                                                  ? "font-semibold text-gray-900 bg-gray-100"
                                                                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                                                  }`}
                                                      >
                                                            {link.label}
                                                      </Link>
                                                      {index < links.length - 1 && <span className="text-gray-300 mx-1">|</span>}
                                                </span>
                                          ))}
                                    </div>

                                    <div className="ml-auto">
                                          <button
                                                onClick={toggleSearch}
                                                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                                aria-label="Search"
                                          >
                                                <Search className="w-5 h-5 text-gray-700" />
                                          </button>
                                    </div>
                              </div>
                        </nav>

                        {/* Search bar */}
                        {isSearchOpen && (
                              <div className="border-t border-gray-200 py-3 px-4 animate-in slide-in-from-top duration-300">
                                    <div className="relative max-w-2xl mx-auto">
                                          <input
                                                type="text"
                                                placeholder="Search..."
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                                                autoFocus
                                          />
                                          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                          <button onClick={toggleSearch} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                                                <X className="w-5 h-5" />
                                          </button>
                                    </div>
                              </div>
                        )}
                  </div>

                  {/* Spacer for content below the sticky nav */}
                  <div className="h-2"></div>
            </>
      )
}
