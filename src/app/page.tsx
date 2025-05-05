"use client";

import { useState, useEffect } from "react";
import NewsCard from "@/components/NewsCard";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  const [news, setNews] = useState<{ date: string; news: string }[]>([]);
  const [visibleNews, setVisibleNews] = useState(6);
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => setNews(data.news))
      .catch((err) => console.error("Error fetching news:", err));

    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data.slice(0, 3)))
      .catch((err) => console.error("Error fetching projects:", err));

    fetch("/data/blogs.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data.slice(0, 10)))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <div className="m-20 mt-5 mb-0">
      <div className="grid grid-cols-4 gap-6">
        {/* Left Column */}
        <div className="col-span-1 border-r-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Selected Projects
          </h3>
          <div className="space-y-4 pr-4">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
          <a href="/projects" className="font-semibold">View More</a>
        </div>

        {/* Center Column – Blogs */}
        <div className="col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Blogs</h3>
          <div className="p-4 bg-white rounded-lg shadow space-y-4">
            {blogs.map((blog, index) => (
              <div key={index} className="border-b pb-2">
                <h4 className="text-md font-bold">{blog.title}</h4>
                <p className="text-sm text-gray-600">{blog.description}</p>
              </div>
            ))}
            <a href="/blog" className="block text-blue-600 font-medium mt-2 hover:underline">
              View More Blogs →
            </a>
          </div>
        </div>

        {/* Right Column – News */}
        <div className="col-span-1 border-l-1">
          <h2 className="p-2 text-lg font-bold text-gray-900 mb-2">
            Latest News
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {news.length > 0 ? (
              news.slice(0, visibleNews).map((item, index) => (
                <NewsCard key={index} date={item.date} news={item.news} />
              ))
            ) : (
              <p>No news found.</p>
            )}
          </div>
          {visibleNews < news.length && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setVisibleNews(visibleNews + 6)}
                className="bg-gray-900 text-white px-6 py-3 rounded font-semibold hover:bg-gray-500 transition"
              >
                View More News
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
