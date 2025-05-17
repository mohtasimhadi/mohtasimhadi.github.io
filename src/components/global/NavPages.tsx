"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

export default function NavPages() {
  const [currentPath, setCurrentPath] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

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
            <a
              href='/search'
              className="block hover:text-gray-600 transition-colors duration-200"
            >
              <Search className="w-5 h-5 pb-2" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
