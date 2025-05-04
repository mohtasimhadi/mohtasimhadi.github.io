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
      <div className="relative w-full bg-[#F2F0EF] overflow-hidden">
        {/* Background Image - Desktop only */}
        <div className="hidden md:flex absolute inset-0 z-0 justify-center items-center pointer-events-none">
          <img
            src={data.profile.profile_image}
            alt={data.profile.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Visible Image - Mobile only */}
        <div className="block md:hidden w-full flex justify-center pt-8">
          <img
            src={data.profile.profile_image}
            alt={data.profile.name}
            className="w-[80%] object-contain"
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-36 items-start">
          {/* Left Column */}
          <div className="space-y-6 md:mr-10 order-2 md:order-none">
            <div className="flex flex-col space-y-2">
              <h1 className="text-5xl md:text-8xl font-bold">
                {data.profile.name}
              </h1>
              <h2 className="text-xl md:text-3xl text-[#0C2340] font-semibold">
                {data.profile.title}
              </h2>
            </div>
            <div className="flex flex-col space-y-2">
              <ContactItem Icon={Mail} text={data.contact.email1} />
              <ContactItem Icon={Mail} text={data.contact.email2} />
              <ContactItem Icon={Phone} text={data.contact.phone} />
              <ContactItem Icon={MapPin} text={data.contact.address} />
            </div>
            <div className="flex space-x-4">
              <SocialIcon href={data.contact.linkedin} Icon={Linkedin} />
              <SocialIcon href={data.contact.github} Icon={Github} />
              <SocialIcon href={data.contact.facebook} Icon={Facebook} />
              <SocialIcon href={data.contact.instagram} Icon={Instagram} />
            </div>
          </div>

          {/* Right Column */}
          <div className="order-3 md:order-none">
            <p className="text-base md:text-xl leading-relaxed whitespace-pre-line md:pl-16 md:pt-10">
              {data.profile.bio}
            </p>
            <ResearchProfiles/>
          </div>
        </div>
      </div>

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

// Contact Information Component
function ContactItem({ Icon, text }: { Icon: any; text: string }) {
  return (
    <div className="flex items-center space-x-2 text-xl">
      <Icon className="w-5 h-5 text-gray-900" />
      <p>{text}</p>
    </div>
  );
}

// Social Media Icon Component
function SocialIcon({ href, Icon }: { href: string; Icon: any }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Icon className="w-8 h-8 text-gray-900 hover:text-gray-700 transition" />
    </Link>
  );
}
