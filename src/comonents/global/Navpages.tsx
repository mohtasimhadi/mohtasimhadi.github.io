"use client";

export default function NavPages() {
  const links = [
    { href: "/research/news", label: "NEWS" },
    { href: "/blogs/journals", label: "JOURNALS" },
    { href: "/blogs/typist", label: "THE TYPIST" },
    { href: "/blogs/notes", label: "NOTES" },
    { href: "/blogs/poetries", label: "POETRIES" },
    { href: "/research/patents", label: "PATENTS" },
    { href: "/research/publications", label: "PUBLICATIONS" },
    { href: "/research/presentations", label: "PRESENTATIONS" },
    { href: "/research/projects", label: "PROJECTS" },
  ];

  return (
    <nav className="mr-4 ml-4 bg-white border-b-2 border-gray-900 border-t-1 border-gray-300 sticky top-0 z-[9999]">
      <div className="container mx-auto px-6 py-3 flex flex-wrap gap-4 items-center text-sm text-gray-800">
        {links.map((link, index) => (
          <span key={link.href} className="flex items-center gap-1">
            <a
              href={link.href}
              className="block hover:text-gray-600 transition-colors duration-200"
            >
              {link.label}
            </a>
            {index < links.length - 1 && <span className="text-gray-400">|</span>}
          </span>
        ))}
      </div>
    </nav>
  );
}
