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

  return (
    <div className="container mx-auto px-6 py-12 pt-0 flex">
      {/* Sidebar Navigation */}
      <aside className="w-1/4 sticky top-0 h-screen p-4 bg-gray-100 shadow-md">
        <h2 className="text-2xl font-bold text-[#E87722] mb-4">Sections</h2>
        <ul className="space-y-2">
          {/* On Writing Section */}
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
        {/* On Writing Section */}
        <section id="On-Writing" className="blog-section mb-12">
          <h1 className="text-4xl font-bold text-[#E87722] pt-6 mb-6 text-center">
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
                <ul className="space-y-4">
                  {posts.map((post: any, index: number) => (
                    <li
                      key={index}
                      className="p-4 border rounded-lg shadow-md bg-white"
                    >
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      <Link
                        href={post.notion_link}
                        target="_blank"
                        className="text-[#0C2340] font-semibold hover:underline mt-2 inline-block"
                      >
                        View Post
                      </Link>
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

// Horizontal Book Card for "Originals" (Includes Synopsis)
function OriginalBookCard({ book }: { book: any }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex gap-6 items-center mb-6 border-l-4 border-[#E87722]">
      <div className="w-1/3">
        <Image
          src={book.cover}
          alt={book.title}
          width={180}
          height={260}
          className="rounded-md object-cover"
        />
        <p className="text-sm text-gray-500">📅 Published: {book.year}</p>
        <p className="text-sm text-gray-500">🏢 Publisher: {book.publisher}</p>
        {book.goodreads && (
          <Link
            href={book.goodreads}
            target="_blank"
            className="mt-3 inline-block text-[#0C2340] font-semibold hover:underline"
          >
            📖 View on Goodreads
          </Link>
        )}
      </div>
      <div className="w-2/3">
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p
          className="text-sm text-gray-600 mb-3"
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
