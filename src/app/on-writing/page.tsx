"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  const [blogData, setBlogData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/writing.json")
      .then((res) => res.json())
      .then((data) => setBlogData(data))
      .catch((err) => console.error("Error fetching blog data:", err));
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

  if (!blogData) return <p className="text-center mt-10 text-lg">Loading...</p>;

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
            <a
              href="#On-Writing"
              className={`block px-3 py-2 rounded-md font-bold ${
                activeSection === "On-Writing"
                  ? "bg-[#E87722] text-white"
                  : "hover:bg-gray-300"
              }`}
            >
              Books
            </a>
            <ul className="pl-4 space-y-1">
              {Object.keys(blogData.on_writing).map((subCategory) => (
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

          {/* Blog Section */}
          <li>
            <a
              href="#Blog"
              className={`block px-3 py-2 rounded-md font-bold ${
                activeSection === "Blog"
                  ? "bg-[#E87722] text-white"
                  : "hover:bg-gray-300"
              }`}
            >
              The Typist
            </a>
            <ul className="pl-4 space-y-1">
              {Object.keys(blogData.blog).map((category) => (
                <li key={category}>
                  <a
                    href={`#${category.replace(/\s+/g, "-")}`}
                    className={`block px-3 py-1 rounded-md ${
                      activeSection === category.replace(/\s+/g, "-")
                        ? "bg-[#E87722] text-white"
                        : "hover:bg-gray-300"
                    }`}
                  >
                    {category}
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
          <h1 className="text-4xl font-bold text-[#E87722] mb-6 text-center">
            Books
          </h1>

          {Object.entries(blogData.on_writing).map(
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
                {category === "Originals" ? (
                  books.map((book: any, index: number) => (
                    <OriginalBookCard key={index} book={book} />
                  ))
                ) : (
                  <div className="grid md:grid-cols-3 gap-6">
                    {books.map((book: any, index: number) => (
                      <StandardBookCard key={index} book={book} />
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </section>

        {/* Blog Section */}
        <section id="Blog" className="blog-section">
          <h2 className="text-4xl font-bold text-[#E87722] mb-6 text-center">
            The Typist
          </h2>
          {Object.entries(blogData.blog).map(
            ([category, posts]: [string, any]) => (
              <div
                key={category}
                id={category.replace(/\s+/g, "-")}
                className="blog-section mb-10"
              >
                <h3 className="text-2xl font-bold text-[#0C2340] mb-4">
                  {category}
                </h3>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post: any, index: number) => (
                    <li
                      key={index}
                      className="p-5 border-l-4 border-[#E87722] rounded-lg shadow-lg bg-white transition-transform transform hover:-translate-y-2 hover:shadow-xl"
                    >
                      {/* Post Link */}
                      <Link
                        href={post.notion_link}
                        target="_blank"
                        className="block text-[#0C2340] font-semibold hover:text-[#E87722] transition"
                      >
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                      </Link>

                      {/* Post Date */}
                      <p className="text-sm text-gray-500 mt-2">
                        📅 {post.date || "Unknown Date"}
                      </p>

                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {post.tags.map((tag: string, tagIndex: number) => (
                            <span
                              key={tagIndex}
                              className={`text-xs text-white px-2 py-1 rounded-md ${getTagColor(
                                tag
                              )} shadow-sm`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </section>
      </div>
    </div>
  );
}

function OriginalBookCard({ book }: { book: any }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start mb-6 border-l-4 border-[#E87722] w-full">
      {/* Image and Basic Info */}
      <div className="w-full sm:w-1/3 flex flex-col items-center sm:items-start">
        <Image
          src={book.cover}
          alt={book.title}
          width={180}
          height={260}
          className="rounded-md object-cover w-full max-w-[180px]"
        />
        <p className="text-sm text-gray-500 mt-2">📅 Published: {book.year}</p>
        <p className="text-sm text-gray-500">🏢 Publisher: {book.publisher}</p>
        {book.goodreads && (
          <Link
            href={book.goodreads}
            target="_blank"
            className="mt-2 text-[#0C2340] font-semibold hover:underline"
          >
            📖 View on Goodreads
          </Link>
        )}
      </div>

      {/* Book Title & Synopsis */}
      <div className="w-full sm:w-2/3 text-center sm:text-left">
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p
          className="text-sm text-gray-600 mt-2"
          dangerouslySetInnerHTML={{
            __html: book.synopsis.replace(/\n/g, "<br/>"),
          }}
        ></p>
      </div>
    </div>
  );
}

// Grid Book Card for Translations & Collections
function StandardBookCard({ book }: { book: any }) {
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
