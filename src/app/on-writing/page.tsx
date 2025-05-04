"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function OnWriting() {
  const [writingData, setWritingData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

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

  if (!writingData) return <p className="text-center mt-10 text-lg">Loading...</p>;

  const getTagColor = (tag: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    const hash = tag
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length]; // Assigns consistent colors to the same tag
  };

  return (
    <div className="container mx-auto px-6 py-12 flex">
      {/* Sidebar Navigation */}
      <aside className="hidden sm:block sm:w-1/4 sticky top-20 h-screen p-4 bg-gray-100 rounded-lg shadow-md">
        <ul className="space-y-2">
          {/* Books Section */}
          <li>
            <ul className="pl-4 space-y-1">
              {Object.keys(writingData.on_writing).map((subCategory) => (
                <li key={subCategory}>
                  <a
                    href={`#${subCategory.replace(/\s+/g, "-")}`}
                    className={`block px-3 py-1 rounded-md ${
                      activeSection === subCategory.replace(/\s+/g, "-")
                        ? "bg-[#E87722] text-white"
                        : "hover:bg-gray-300"
                    }`}
                  >
                    {subCategory}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="w-3/4 px-6">
        {/* Books Section */}
        <section id="On-Writing" className="blog-section mb-12">

          {Object.entries(writingData.on_writing).map(
            ([category, books]: [string, any]) => (
              <div
                key={category}
                id={category.replace(/\s+/g, "-")}
                className="blog-section mb-8"
              >
                <h2 className="text-2xl font-bold text-[#0C2340] mb-4">
                  {category}
                </h2>

                {/* Originals: Horizontal Layout */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {books.map((book: any, index: number) => (
                      <BookCard key={index} book={book} />
                    ))}
                  </div>
              </div>
            )
          )}
        </section>
      </div>
    </div>
  );
}

// Grid Book Card
function BookCard({ book }: { book: any }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center border-l-4 border-[#E87722]">
      <Image
        src={book.cover}
        alt={book.title}
        width={150}
        height={200}
        className="rounded-md object-cover mb-4"
      />
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-600">{book.details}</p>
      <p className="text-sm text-gray-500">📅 Published: {book.year}</p>
      <p className="text-sm text-gray-500">🏢 Publisher: {book.publisher}</p>
      {book.goodreads && (
        <Link
          href={book.goodreads}
          target="_blank"
          className="mt-3 text-[#0C2340] font-semibold hover:underline"
        >
          📖 View on Goodreads
        </Link>
      )}
    </div>
  );
}
