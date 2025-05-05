"use client";

import { useState, useEffect } from "react";
import NewsCard from "@/components/NewsCard";

export default function Home() {
  const [news, setNews] = useState<{ date: string; news: string }[]>([]);
  const [visibleNews, setVisibleNews] = useState(6); // Start with 6 news

  // Fetch news data separately
  useEffect(() => {
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => setNews(data.news))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  return (
    <>
      {/* Main Layout */}
      <div className="m-42 mt-5 mb-0">

        <div className="grid grid-cols-4 gap-6">
          {/* Left Column (1/4 of width) */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Highlights</h3>
            <div className="p-4 rounded-lg">
              {/* Add content for Highlights */}
              <p>Highlight 1</p>
              <p>Highlight 2</p>
              <p>Highlight 3</p>
            </div>
          </div>

          {/* Center Column (2/4 of width) */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Blogs</h3>
            <div className="p-4 rounded-lg">
              {/* Add content for Blogs */}
              <p>Blog 1</p>
              <p>Blog 2</p>
              <p>Blog 3</p>
            </div>
          </div>

          {/* Right Column (1/4 of width) */}
          <div className="col-span-1 border-l-1">
            <h2 className="p-2 text-lg font-bold text-gray-900 mb-2">Latest News</h2>

            {/* News Grid */}
            <div className="grid grid-cols-1 gap-2">
              {news.length > 0 ? (
                news
                  .slice(0, visibleNews)
                  .map((item, index) => (
                    <NewsCard key={index} date={item.date} news={item.news} />
                  ))
              ) : (
                <p>No news found.</p>
              )}
            </div>

            {/* View More Button After Every 6 News Items */}
            {visibleNews < news.length && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setVisibleNews(visibleNews + 6)} // Load 6 more each time
                  className="bg-gray-900 text-white px-6 py-3 rounded font-semibold hover:bg-gray-500 transition"
                >
                  View More News
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
