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
      const location = window.location
      const firstSegment = location.pathname.split('/')[1]; // Get 'news' from '/news/123'

      // Capitalize first letter
      const label = firstSegment ? firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1) : '';


      return (
            <>
                  <div className="sticky top-0 z-[9999] bg-white shadow-sm">

                        {label.length ? <div className="container mx-auto px-6">
                              <p className="flex items-center gap-2 text-xl  uppercase tracking-wide">
                                    {label}
                              </p>
                        </div> : ''}

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
                                                      className={`block py-2 text-xs text-gray-600 hover:text-gray-900 transition-colors duration-200`}
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
                                                            className={`px-2 py-1 rounded-md transition-all duration-200 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50`}
                                                      >
                                                            {link.label}
                                                      </Link>
                                                      {index < links.length - 1 && <span className="text-gray-300 mx-1">|</span>}
                                                </span>
                                          ))}
                                    </div>

                                    <div className="ml-auto flex items-center">
                                          <Link
                                                href='/search'
                                                className=""
                                                aria-label="Search"
                                          >
                                                <Search className="w-5 h-5 text-gray-700" />
                                          </Link>
                                    </div>
                              </div>
                        </nav>


                  </div>

                  {/* Spacer for content below the sticky nav */}
                  <div className="h-2"></div>
            </>
      )
}
