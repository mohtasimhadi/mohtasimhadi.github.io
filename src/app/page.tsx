"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
    <div className="container mx-auto px-6 py-12">
      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        {/* Left: Profile & Contact inside a card (1/3 width) */}
        <div className="bg-white shadow-lg rounded-lg p-8 md:col-span-1 border-l-4 border-[#E87722]">
          <div className="flex flex-col items-center text-center">
            <div className="w-48 h-48 relative rounded-full overflow-hidden shadow-lg">
              <Image
                src={data.profile.profile_image}
                alt={data.profile.name}
                width={192}
                height={192}
                className="object-cover"
                priority
              />
            </div>

            <h1 className="text-3xl font-bold mt-4">{data.profile.name}</h1>
            <h2 className="text-lg text-[#0C2340] font-semibold">
              {data.profile.title}
            </h2>

            {/* Contact Information */}
            <div className="flex flex-col items-center mt-6 space-y-2">
              <ContactItem Icon={Mail} text={data.contact.email1} />
              <ContactItem Icon={Mail} text={data.contact.email2} />
              <ContactItem Icon={Phone} text={data.contact.phone} />
              <ContactItem Icon={MapPin} text={data.contact.address} />
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4 mt-6">
              <SocialIcon href={data.contact.linkedin} Icon={Linkedin} />
              <SocialIcon href={data.contact.github} Icon={Github} />
              <SocialIcon href={data.contact.facebook} Icon={Facebook} />
              <SocialIcon href={data.contact.instagram} Icon={Instagram} />
            </div>
          </div>
        </div>

        {/* Right: About Section (2/3 width) */}
        <div className="md:col-span-2">
          <div className="md: row-span-2 mb-9 p-5">
            <ResearchProfiles />
          </div>
          <p className="text-lg mt-1 leading-relaxed whitespace-pre-line">
            {data.profile.bio}
          </p>
        </div>
      </div>

      {/* News Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-[#E87722] mb-6">Latest News</h2>

        {/* Search Bar */}
        <div className="relative mb-6 w-full">
          <input
            type="text"
            placeholder="Search news..."
            className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-[#E87722] focus:outline-none"
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
              className="bg-[#E87722] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d76c1a] transition"
            >
              View More News
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Contact Information Component
function ContactItem({ Icon, text }: { Icon: any; text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="w-5 h-5 text-[#E87722]" />
      <p>{text}</p>
    </div>
  );
}

// Social Media Icon Component
function SocialIcon({ href, Icon }: { href: string; Icon: any }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Icon className="w-8 h-8 text-[#0C2340] hover:text-[#E87722] transition" />
    </Link>
  );
}
