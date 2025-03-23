"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [news, setNews] = useState<{ date: string; news: string }[]>([]);
  const [visibleNews, setVisibleNews] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch news from JSON file
  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  // Filter news based on search query
  const filteredNews = news.filter(
    (item) =>
      item.news.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.date.includes(searchQuery)
  );

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Profile & Contact */}
        <div className="flex flex-col items-center text-center md:text-left">
          <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-[#E87722] shadow-lg">
            <Image
              src="/dp.jpg"
              alt="Mohtasim Hadi Rafi"
              width={192}
              height={192}
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-3xl font-bold mt-4">Mohtasim Hadi Rafi</h1>
          <h2 className="text-lg text-[#0C2340] font-semibold">
            Graduate Research Assistant
          </h2>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start mt-6 space-y-2">
            <ContactItem Icon={Mail} text="mzr0167@auburn.edu" />
            <ContactItem Icon={Mail} text="mohtasimhadi@gmail.com" />
            <ContactItem Icon={Phone} text="+1 (334) 559-9369" />
            <ContactItem Icon={MapPin} text="Auburn University, AL, USA" />
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-6">
            <SocialIcon
              href="https://www.linkedin.com/in/mohtasimhadi/"
              Icon={Linkedin}
            />
            <SocialIcon href="https://github.com/mohtasimhadi" Icon={Github} />
            <SocialIcon
              href="https://www.facebook.com/mohtasimhadi"
              Icon={Facebook}
            />
            <SocialIcon
              href="https://instagram.com/moho__________"
              Icon={Instagram}
            />
          </div>
        </div>

        {/* Right: About Section */}
        <div className="max-w-xl">
          <p className="text-lg mt-4 leading-relaxed">
            I’m a researcher and engineer currently pursuing my Master’s in
            Biosystems Engineering at Auburn University. My work focuses on the
            intersection of AI, machine learning, and computer vision, with an
            emphasis on applying these technologies to biosystems. My current
            research involves developing smart systems for plant inventory
            management using drones and rovers, aiming to automate tasks like
            plant detection, counting, and quality assessment.
            <br />
            Previously, I worked as an Analytics Engineer at Intelligent
            Machines Ltd., where I contributed to AI-based retail products and
            data pipelines for the banking industry. I have hands-on experience
            with deep learning, computer vision, and data science tools, and I
            thrive in interdisciplinary environments where innovation and
            technology come together to solve real-world problems.
            <br />
            Feel free to connect if you’d like to discuss collaborative
            opportunities or share insights on AI applications in agriculture
            and beyond.
          </p>
        </div>
      </div>

      {/* News Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-[#E87722] mb-6">Latest News</h2>

        {/* Search Bar */}
        <div className="relative mb-6 w-full max-w-md">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* View More Button */}
        {visibleNews < filteredNews.length && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setVisibleNews(visibleNews + 9)}
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

// News Card Component
function NewsCard({ date, news }: { date: string; news: string }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-[#E87722]">
      <p className="text-sm text-gray-500">{date}</p>
      <p className="text-lg font-semibold mt-2">{news}</p>
    </div>
  );
}
