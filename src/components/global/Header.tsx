"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
      const [menuOpen, setMenuOpen] = useState(false);
      const pathname = usePathname();

      return (
            <nav className="relative bg-white text-gray-900 w-full flex items-center z-[1000]">
                  <div className="container mx-auto flex justify-between items-center px-6 py-3">
                        <Link
                              href="/"
                              className="flex items-center gap-2 text-2xl font-bold tracking-wide"
                        >
                              <span
                                    className="text-3xl p-1 border-r-2 text-right leading-tight"
                                    style={{ fontFamily: "'Special Elite', cursive" }}
                              >
                                    The<br />Moho Blog
                              </span>
                              <span className="text-sm">
                                    Mohtasim
                                    <br />Hadi Rafi
                              </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <ul className="hidden md:flex space-x-6 text-base">
                              <NavItem href="/" label="HOME" pathname={pathname} />
                              <NavItem href="/blogs" label="BLOGS" pathname={pathname} />
                              <NavItem href="/research" label="RESEARCH" pathname={pathname} />
                              <NavItem href="/books" label="BOOKS" pathname={pathname} />
                              <NavItem href="/about" label="ABOUT" pathname={pathname} />
                        </ul>

                        {/* Mobile Menu Button */}
                        <button
                              className="md:hidden p-2 transition"
                              onClick={() => setMenuOpen(!menuOpen)}
                              aria-label="Toggle Menu"
                        >
                              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                  </div>

                  {/* Mobile Menu */}
                  {menuOpen && (
                        <div className="flex md:hidden bg-white-100 text-black text-lg flex flex-col items-start px-6 space-y-4 py-4 w-full">
                              <NavItem href="/" label="HOME" pathname={pathname} />
                              <NavItem href="/blogs" label="BLOGS" pathname={pathname} />
                              <NavItem href="/research" label="RESEARCH" pathname={pathname} />
                              <NavItem href="/books" label="BOOKS" pathname={pathname} />
                              <NavItem href="/about" label="ABOUT" pathname={pathname} />
                        </div>
                  )}
            </nav>
      );
}

function NavItem({
      href,
      label,
      pathname,
}: {
      href: string;
      label: string;
      pathname: string;
}) {
      const isActive = pathname === href;

      return (
            <li>
                  <Link
                        href={href}
                        className={`relative block px-4 py-2 transition duration-300 ${isActive ? "text-stone-500 font-semibold" : "text-gray-700"
                              } hover:text-gray-900`}
                  >
                        {label}
                  </Link>
            </li>
      );
}
