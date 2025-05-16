"use client";

import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

interface Book {
  title: string;
  synopsis?: string;
  cover: string;
  year: string;
  goodreads?: string;
  publisher: string;
  tags: string[];
  details?: string;
}

interface WritingData {
  on_writing: {
    Originals: Book[];
    Translations: Book[];
    Collections: Book[];
  };
}

interface SidebarContentProps {
  data: WritingData;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  allTags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  activeSection: string | null;
}

interface BookCardProps {
  book: Book;
}

export default function OnWriting() {
  const [writingData, setWritingData] = useState<WritingData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/data/writing.json")
      .then((res) => res.json())
      .then((data) => setWritingData(data))
      .catch((err) => console.error("Error fetching writing data:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".blog-section");
      let currentSection = "";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = section.id;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getAllTags = () => {
    const tags = new Set<string>();
    Object.values(writingData?.on_writing || {}).forEach((group) => {
      if (Array.isArray(group)) {
        group.forEach((book) => {
          (book.tags || []).forEach((tag) => tags.add(tag));
        });
      }
    });
    return Array.from(tags);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filterBooks = (books: Book[]) => {
    return books.filter((book) => {
      const matchesSearch = book.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        (book.tags || []).some((tag) => selectedTags.includes(tag));
      return matchesSearch && matchesTags;
    });
  };

  if (!writingData)
    return <p className="text-center mt-10 text-lg">Loading...</p>;

  const allTags = getAllTags();

  return (
    <div className="max-w-7xl mx-auto pt-1 px-4 md:px-6">
      {/* Mobile Filter Button */}
      <div className="md:hidden text-right mt-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="px-4 py-2 bg-black text-white font-medium"
        >
          Open Navigation
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:block w-72 bg-white p-5 sticky top-6 h-fit">
          <SidebarContent
            data={writingData}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            allTags={allTags}
            selectedTags={selectedTags}
            toggleTag={toggleTag}
            activeSection={activeSection}
          />
        </aside>

        {/* Sidebar (Mobile Drawer) */}
        <Transition show={isMobileMenuOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 md:hidden"
            onClose={setIsMobileMenuOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>

            <div className="fixed inset-0 flex justify-center items-start p-4">
              <Transition.Child
                as={Fragment}
                enter="transition-transform ease-out duration-300"
                enterFrom="translate-y-10 opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="transition-transform ease-in duration-200"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="translate-y-10 opacity-0"
              >
                <Dialog.Panel className="w-full max-w-sm bg-white p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title className="text-lg font-bold">
                      Jump to Section
                    </Dialog.Title>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-500 text-xl"
                    >
                      ×
                    </button>
                  </div>
                  <SidebarContent
                    data={writingData}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    allTags={allTags}
                    selectedTags={selectedTags}
                    toggleTag={toggleTag}
                    activeSection={activeSection}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {Object.entries(writingData.on_writing).map(
            ([category, books]: [string, Book[]]) => {
              const filtered = filterBooks(books);
              if (filtered.length === 0) return null;

              return (
                <div
                  key={category}
                  id={category.replace(/\s+/g, "-")}
                  className="blog-section mb-12"
                >
                  <h2 className="text-2xl font-bold text-black mb-4">
                    {category}
                  </h2>
                  <div className="grid md:grid-cols-4 gap-6">
                    {filtered.map((book, index) => (
                      <BookCard key={index} book={book} />
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

function SidebarContent({
  data,
  searchTerm,
  setSearchTerm,
  allTags,
  selectedTags,
  toggleTag,
  activeSection,
}: SidebarContentProps) {
  return (
    <>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-6 px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
      />

      <ul className="space-y-2 mb-6">
        {Object.keys(data.on_writing).map((subCategory) => (
          <li key={subCategory}>
            <a
              href={`#${subCategory.replace(/\s+/g, "-")}`}
              className={`block px-3 py-2 text-base font-bold ${
                activeSection === subCategory.replace(/\s+/g, "-")
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {subCategory}
            </a>
          </li>
        ))}
      </ul>

      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">🏷️ Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag, idx) => (
            <label
              key={idx}
              className={`px-3 py-1 text-sm cursor-pointer select-none ${
                selectedTags.includes(tag)
                  ? "bg-orange-200 text-orange-800 font-medium"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
                className="hidden"
              />
              {tag}
            </label>
          ))}
        </div>
      </div>
    </>
  );
}

function BookCard({ book }: BookCardProps) {
  return (
    <div className="bg-gray-50 p-3 flex flex-col items-start text-left space-y-1">
      <Image
        src={book.cover}
        alt={book.title}
        width={160}
        height={220}
        className="object-cover mb-2"
      />
      <h3 className="text-lg font-semibold text-black">{book.title}</h3>
      {book.details && (
        <p className="text-sm text-gray-600">{book.details}</p>
      )}
      <p className="text-xs text-gray-500">
        📅 {book.year} — {book.publisher}
      </p>
      {book.goodreads && (
        <Link
          href={book.goodreads}
          target="_blank"
          className="text-sm text-blue-700 font-medium hover:underline"
          rel="noopener noreferrer"
        >
          View on Goodreads ↗
        </Link>
      )}
    </div>
  );
}
