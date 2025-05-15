"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";

export default function NavPages() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentPath, setCurrentPath] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      router.push(`/search/${encodeURIComponent(inputValue.trim())}`);
      setSearchOpen(false);
      setInputValue("");
    }
  };

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
  ];

  const currentPage =
    links.find((link) => link.href === currentPath) || { label: "-" };

  return (
    <>
      <div className="sticky top-0 h-5px z-[10000] bg-white py-1 text-xl font-semibold text-gray-700 m-2 mr-5 border-b border-gray-300">
        {currentPage.label}
      </div>
      <nav className="mr-4 ml-4 bg-white border-b border-gray-900 sticky top-[35px] z-[9999]">
        <div className="container mx-auto flex flex-wrap items-center text-xs text-gray-800">
          <div className="flex flex-wrap gap-4 items-center flex-grow">
            {links.map((link, index) => (
              <span key={link.href} className="flex items-center gap-1">
                <a
                  href={link.href}
                  className="block hover:text-gray-600 transition-colors duration-200"
                >
                  {link.label}
                </a>
                {index < links.length - 1 && (
                  <span className="text-gray-400">|</span>
                )}
              </span>
            ))}
          </div>

          <div className="ml-auto flex items-center">
            {!searchOpen && (
              <button
                aria-label="Open search"
                onClick={() => setSearchOpen(true)}
                className="p-1 hover:text-gray-600 transition"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {searchOpen && (
              <div
                className="flex items-center border border-gray-300 rounded overflow-hidden
                transition-all duration-300 ease-in-out
                max-w-[300px] w-full"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search..."
                  className="flex-grow px-3 py-1 text-sm outline-none"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                />
                <button
                  aria-label="Search"
                  onClick={handleSearch}
                  className="p-1 hover:text-gray-600 transition"
                >
                  <Search className="w-5 h-5" />
                </button>
                <button
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                  className="p-1 hover:text-gray-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
