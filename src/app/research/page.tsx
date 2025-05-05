"use client";

import NewsCard from "@/components/NewsCard";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { FC } from "react";
import Link from "next/link";
import FeatureCard from "@/components/FeatureCard";

interface Projects {
  title: string;
  description: string;
  authors?: string[];
  media: string;
  type: string;
  notion: string;
  links?: { title: string; url: string }[];
}

const Research: FC = () => {
  const [news, setNews] = useState<{ date: string; news: string }[]>([]);
  const [visibleNews, setVisibleNews] = useState(6);
  const [currentProjects, setCurrentProjects] = useState<Projects[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<Projects[]>([]);
  const [maxCards, setMaxCards] = useState(4);

  useEffect(() => {
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => setNews(data.news))
      .catch((err) => console.error("Error fetching news:", err));

    fetch("/data/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        const currentProjectItems = data.filter(
          (item: Projects) => item.type === "current project"
        );
        setCurrentProjects(currentProjectItems);
        setVisibleProjects(currentProjectItems.slice(0, maxCards));
      })
      .catch((err) => console.error("Error fetching blog data:", err));
  }, [maxCards]);

  return (
    <div className="flex flex-wrap">
      {/* Left Column */}
      <div className="w-full sm:w-1/5 p-4 flex flex-col items-start">
        <h3 className="text-xl font-semibold mb-4 text-left">
          Current Projects
        </h3>
        <div className="flex flex-col items-center w-full">
          {visibleProjects.map((project, index) => (
            <Card
              key={index}
              title={project.title}
              description={project.description}
              authors={project.authors}
              media={project.media}
              type={project.type}
              notion={project.notion}
              links={project.links}
            />
          ))}
        </div>

        <div className="flex justify-end w-full mt-4">
          <Link href="/research/projects">
            <button className="text-blue-600 hover:underline">
              See All Projects →
            </button>
          </Link>
        </div>
      </div>

      {/* Center Column */}
      <div className="w-full sm:w-3/5 flex flex-col items-start">
        {/* Patents Section */}
        <div className="p-4 bg-amber-50">
          <div className="flex flex-wrap justify-center">
            {currentProjects.slice(1, 2).map((project, index) => (
              <div key={index} className="w-full p-2">
                <FeatureCard
                  title={project.title}
                  description={project.description}
                  authors={project.authors}
                  media={project.media}
                  type={project.type}
                  notion={project.notion}
                  links={project.links}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-b-1 border-gray-400">
          <h3 className="text-xl font-semibold mb-4 text-left">
            Peer Reviewed Articles
          </h3>
          <div className="flex flex-wrap justify-center">
            {currentProjects.slice(0, 3).map((project, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 p-2">
                <Card
                  title={project.title}
                  description={project.description}
                  authors={project.authors}
                  media={project.media}
                  type={project.type}
                  notion={project.notion}
                  links={project.links}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end w-full mt-4">
            <Link href="/research/publications">
              <button className="text-blue-600 hover:underline">
                See More →
              </button>
            </Link>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold mb-4 text-left">
            Presentations
          </h3>
          <div className="flex flex-wrap justify-center">
            {currentProjects.slice(0, 3).map((project, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 p-2">
                <Card
                  title={project.title}
                  description={project.description}
                  authors={project.authors}
                  media={project.media}
                  type={project.type}
                  notion={project.notion}
                  links={project.links}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end w-full mt-4">
            <Link href="/research/presentations">
              <button className="text-blue-600 hover:underline">
                See More →
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full sm:w-1/5 p-4 flex flex-col items-start">
        <h3 className="text-xl font-semibold mb-4 text-left">Latest News</h3>
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
        <div className="flex justify-end w-full mt-4">
          <Link href="/research/news">
            <button className="text-blue-600 hover:underline">
              See More →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Research;
