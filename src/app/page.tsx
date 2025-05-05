"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ResearchProfiles from "@/components/ResearchProfileCard";
import NewsCard from "@/components/NewsCard";

import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Facebook,
  Instagram,
  Search,
} from "lucide-react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [news, setNews] = useState<{ date: string; news: string }[]>([]);
  const [visibleNews, setVisibleNews] = useState(6); // Start with 6 news
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch profile and contact data
  useEffect(() => {
    fetch("/data/home.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching home data:", err));
  }, []);

  // Fetch news data separately
  useEffect(() => {
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => setNews(data.news))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  if (!data) return <p className="text-center mt-10 text-lg">Loading...</p>;

  // Filter news based on search query
  const filteredNews = news.filter(
    (item) =>
      item.news.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.date.includes(searchQuery)
  );

  return (
    <>
      {/* News Section */}
      <div className="m-42 mt-5 mb-0">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest News</h2>

        {/* Search Bar */}
        <div className="relative mb-6 w-full">
          <input
            type="text"
            placeholder="Search news..."
            className="w-full p-3 pl-10 border rounded focus:ring-2 focus:ring-gray-900 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {filteredNews.length > 0 ? (
            filteredNews
              .slice(0, visibleNews)
              .map((item, index) => (
                <NewsCard key={index} date={item.date} news={item.news} />
              ))
          ) : (
            <p>No news found.</p>
          )}
        </div>

        {/* View More Button After Every 6 News Items */}
        {visibleNews < filteredNews.length && (
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
    </>
  );
}

