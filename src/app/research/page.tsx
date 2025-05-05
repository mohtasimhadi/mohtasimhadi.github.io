'use client';

import NewsCard from "@/components/NewsCard";
import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import { FC } from 'react';
import Link from 'next/link';

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
  const [projects, setProjects] = useState<Projects[]>([]);
  const [currentProjects, setCurrentProjects] = useState<Projects[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<Projects[]>([]);
  const [maxCards, setMaxCards] = useState(3); // Define the maximum number of cards to show

  useEffect(() => {
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => setNews(data.news))
      .catch((err) => console.error("Error fetching news:", err));

    fetch('/data/blogs.json')
      .then((res) => res.json())
      .then((data) => {
        const currentProjectItems = data.filter((item: Projects) => item.type === 'current project');
        setCurrentProjects(currentProjectItems);
        setVisibleProjects(currentProjectItems.slice(0, maxCards)); // Limit visible projects based on maxCards
      })
      .catch((err) => console.error('Error fetching blog data:', err));
  }, [maxCards]); // Re-fetch when maxCards is updated

  return (
    <div className="flex flex-wrap">
      {/* Left Column */}
      <div className="w-full sm:w-1/5 p-4 border-l flex flex-col items-start">
        <h3 className='text-xl font-semibold mb-4 text-left'>Current Projects</h3>
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
        {/* "See More" button redirects to /projects */}
        <Link href="/projects">
          <button className="mt-4 text-blue-600 hover:underline">
            See More
          </button>
        </Link>
      </div>

      {/* Center Column */}
      <div className="w-full sm:w-3/5 p-4 border-l flex flex-col items-start">
        {/* Patents Section */}
        <div className="p-4 bg-gray-100">
          <h3 className='text-xl font-semibold mb-4 text-left'>Patents</h3>
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
          <Link href="/projects">
            <button className="mt-4 text-blue-600 hover:underline">
              See More
            </button>
          </Link>
        </div>

        {/* Publications Section */}
        <div className="mt-8 p-4 bg-gray-200">
          <h3 className='text-xl font-semibold mb-4 text-left'>Publications</h3>
          <div className="flex flex-wrap justify-center">
            {currentProjects.slice(3, 6).map((project, index) => (
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
          <Link href="/projects">
            <button className="mt-4 text-blue-600 hover:underline">
              See More
            </button>
          </Link>
        </div>

        {/* Presentations Section */}
        <div className="mt-8 p-4 bg-gray-300">
          <h3 className='text-xl font-semibold mb-4 text-left'>Presentations</h3>
          <div className="flex flex-wrap justify-center">
            {currentProjects.slice(6, 9).map((project, index) => (
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
          <Link href="/projects">
            <button className="mt-4 text-blue-600 hover:underline">
              See More
            </button>
          </Link>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full sm:w-1/5 p-4 border-l flex flex-col items-start">
        <h3 className='text-xl font-semibold mb-4 text-left'>Latest News</h3>
        <div className="grid grid-cols-1 gap-2">
          {news.length > 0 ? (
            news.slice(0, visibleNews).map((item, index) => (
              <NewsCard key={index} date={item.date} news={item.news} />
            ))
          ) : (
            <p>No news found.</p>
          )}
        </div>
        <Link href="/projects">
          <button className="mt-4 text-blue-600 hover:underline">
            See More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Research;
