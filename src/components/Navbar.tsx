"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#E87722] shadow-md text-white">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">Mohtasim Hadi Rafi</h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-lg font-semibold">
          <NavItem href="/" label="Home" />
          <NavItem href="/about" label="About" />
          <NavItem href="/on-writing" label="On Writing" />
          <NavItem href="/research" label="Research" />
          <NavItem href="/writing" label="On Writing" />
          <NavItem href="/people" label="People" />
          <NavItem href="/contact" label="Contact" />
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
        <div className="md:hidden bg-[#0C2340] text-white text-lg flex flex-col items-center space-y-4 py-4">
          <NavItem href="/" label="Home" />
          <NavItem href="/about" label="About" />
          <NavItem href="/research" label="Research" />
          <NavItem href="/achievements" label="Achievements" />
          <NavItem href="/writing" label="On Writing" />
          <NavItem href="/blog" label="Blog" />
          <NavItem href="/contact" label="Contact" />
        </div>
      )}
    </nav>
  );
}


function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="relative px-4 py-2 hover:text-gray-200 transition duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-white before:transition-all before:duration-300 hover:before:w-full"
      >
        {label}
      </Link>
    </li>
  );
}
