"use client"; // Needed if using Next.js App Router
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Home, Info, BookOpen, Award, FileText, PenTool, Mail } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Toggle Theme (Dark/Light Mode)
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-black"></div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/20 dark:bg-black/30 border-b border-gray-200 dark:border-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold flex items-center gap-2 text-gray-800 dark:text-white">
            <BookOpen className="w-6 h-6 text-yellow-400" />
            Moho Blog
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-lg">
            <NavItem href="/" icon={<Home />} text="Home" />
            <NavItem href="/about" icon={<Info />} text="About" />
            <NavItem href="/research" icon={<BookOpen />} text="Research" />
            <NavItem href="/achievements" icon={<Award />} text="Achievements" />
            <NavItem href="/writing" icon={<PenTool />} text="On Writing" />
            <NavItem href="/blog" icon={<FileText />} text="Blog" />
            <NavItem href="/contact" icon={<Mail />} text="Contact" />
          </div>

          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="hidden md:block p-2 rounded-full bg-gray-100 dark:bg-gray-800">
            {theme === "light" ? <Moon className="w-6 h-6 text-gray-800" /> : <Sun className="w-6 h-6 text-yellow-400" />}
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-800 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div> 

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/80 dark:bg-black/90 backdrop-blur-lg flex flex-col text-lg space-y-4 px-6 py-4">
            <NavItem href="/" text="Home" icon={<Home />} onClick={() => setIsOpen(false)} />
            <NavItem href="/about" text="About" icon={<Info />} onClick={() => setIsOpen(false)} />
            <NavItem href="/research" text="Research" icon={<BookOpen />} onClick={() => setIsOpen(false)} />
            <NavItem href="/achievements" text="Achievements" icon={<Award />} onClick={() => setIsOpen(false)} />
            <NavItem href="/writing" text="On Writing" icon={<PenTool />} onClick={() => setIsOpen(false)} />
            <NavItem href="/blog" text="Blog" icon={<FileText />} onClick={() => setIsOpen(false)} />
            <NavItem href="/contact" text="Contact" icon={<Mail />} onClick={() => setIsOpen(false)} />
            <button onClick={toggleTheme} className="flex items-center justify-center gap-2 text-lg">
              {theme === "light" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

// Reusable Navigation Item
const NavItem = ({ href, text, icon, onClick }: { href: string; text: string; icon: JSX.Element; onClick?: () => void }) => {
  return (
    <Link href={href} onClick={onClick} className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-yellow-400 transition duration-300">
      {icon} {text}
    </Link>
  );
};

export default Navbar;
