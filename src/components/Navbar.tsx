"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname hook
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current path

  return (
    <nav className="bg-[#E87722] shadow-md text-white fixed top-0 left-0 w-full z-50 h-[72px] flex items-center">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold tracking-wide">Mohtasim Hadi Rafi</a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-lg font-semibold">
          <NavItem href="/" label="Home" pathname={pathname} />
          <NavItem href="/about" label="About" pathname={pathname} />
          <NavItem
            href="/publications"
            label="Publications"
            pathname={pathname}
          />
          <NavItem href="/on-writing" label="On Writing" pathname={pathname} />
          <NavItem href="/projects" label="Projects" pathname={pathname} />
          <NavItem href="/people" label="People" pathname={pathname} />
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0C2340] text-white text-lg flex flex-col items-start px-6 space-y-4 py-4 w-full absolute top-full left-0">
          <NavItem href="/" label="Home" pathname={pathname} />
          <NavItem href="/about" label="About" pathname={pathname} />
          <NavItem
            href="/publications"
            label="Publications"
            pathname={pathname}
          />
          <NavItem href="/on-writing" label="On Writing" pathname={pathname} />
          <NavItem href="/projects" label="Projects" pathname={pathname} />
          <NavItem href="/people" label="People" pathname={pathname} />
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
        className={`relative px-4 py-2 transition duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-white before:transition-all before:duration-300 hover:before:w-full ${
          isActive ? "before:w-full" : "hover:before:w-full"
        }`}
      >
        {label}
      </Link>
    </li>
  );
}
