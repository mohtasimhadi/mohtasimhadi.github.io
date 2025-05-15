"use client";

export default function NavPages() {
  const links = [
    { href: "/news", label: "NEWS" },
    { href: "/journals", label: "JOURNALS" },
    { href: "/typist", label: "THE TYPIST" },
    { href: "/notes", label: "NOTES" },
    { href: "/poetries", label: "POETRIES" },
    { href: "/patents", label: "PATENTS" },
    { href: "/publications", label: "PUBLICATIONS" },
    { href: "/presentations", label: "PRESENTATIONS" },
    { href: "/projects", label: "PROJECTS" },
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
