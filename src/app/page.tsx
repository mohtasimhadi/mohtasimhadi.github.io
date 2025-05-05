"use client";

import { useState, useEffect } from "react";
import NewsCard from "@/components/NewsCard";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  const [news, setNews] = useState<{ date: string; news: string }[]>([]);
  const [visibleNews, setVisibleNews] = useState(6);
  const [projects, setProjects] = useState<any[]>([]); // For highlights

  useEffect(() => {
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => setNews(data.news))
      .catch((err) => console.error("Error fetching news:", err));

    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data.slice(0, 4))) // Only first 4
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <div className="m-20 mt-5 mb-0">
      <div className="grid grid-cols-4 gap-6">
        {/* Left Column */}
        <div className="col-span-1 border-r-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Current Projects
          </h3>
          <div className="space-y-4 pr-4">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>

        {/* Center Column */}
        <div className="col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Blogs</h3>
          <div className="p-4 rounded-lg">
            <p>Blog 1</p>
            <p>Blog 2</p>
            <p>Blog 3</p>
          </div>
        </div>

        {/* Right Column */}
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
