"use client";

import NewsCard from "@/components/NewsCard";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { FC } from "react";
import Link from "next/link";
import FeatureCard from "@/components/FeatureCard";
import { Blogs } from "@/types/indes";

const Research: FC = () => {
  const [news, setNews] = useState<{ date: string; news: string }[]>([]);
  const [featuredBlog, setFeaturedBlog] = useState<Blogs[]>([]);
  const [patents, setPatents] = useState<Blogs[]>([]);
  const [publications, setPublications]  = useState<Blogs[]>([]);
  const [presentations, setPresentations]  = useState<Blogs[]>([]);
  const [projects, setProjects] = useState<Blogs[]>([]);

  useEffect(() => {
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => setNews(data.news))
      .catch((err) => console.error("Error fetching news:", err));

    fetch("/data/research.json")
      .then((res) => res.json())
      .then((data) => {
        const featuredBlog = data.filter(
          (item: Blogs) => item.type === "featured"
        );
        setFeaturedBlog(featuredBlog);
        
        const patents = data.filter(
          (item: Blogs) => item.type === "patent"
        );
        setPatents(patents);

        const publications = data.filter(
          (item: Blogs) => item.type === "publication"
        );
        setPublications(publications);

        const presentations = data.filter(
          (item: Blogs) => item.type === "presentation"
        );
        setPresentations(presentations);

        const projects = data.filter(
          (item: Blogs) => item.type === "project"
        );
        setProjects(projects);
        
      })
      .catch((err) => console.error("Error fetching research data:", err));
  });

  return (
    <div className="flex flex-wrap">
      {/* Left Column */}
      <div className="w-full sm:w-1/5 p-4 flex flex-col items-start">
        <h3 className="text-xl font-semibold mb-4 text-left">
          Projects
        </h3>
        <div className="flex flex-col items-center w-full">
          {projects.slice(0, 4).map((project, index) => (
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
            {featuredBlog.slice(0, 3).map((featured, index) => (
              <div key={index} className="w-full p-2">
                <FeatureCard
                  title={featured.title}
                  description={featured.description}
                  authors={featured.authors}
                  media={featured.media}
                  type={featured.type}
                  notion={featured.notion}
                  links={featured.links}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold mb-4 text-left">
            Patents
          </h3>
          <div className="flex flex-wrap justify-center">
            {patents.slice(0, 3).map((patent, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/2 p-2">
                <Card
                  title={patent.title}
                  description={patent.description}
                  authors={patent.authors}
                  media={patent.media}
                  type={patent.type}
                  notion={patent.notion}
                  links={patent.links}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end w-full mt-4">
            <Link href="/research/patents">
              <button className="text-blue-600 hover:underline">
                See More →
              </button>
            </Link>
          </div>
        </div>

        <div className="p-4 bg-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-left">
            Publications
          </h3>
          <div className="flex flex-wrap justify-center">
            {publications.slice(0, 3).map((publication, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 p-2">
                <Card
                  title={publication.title}
                  description={publication.description}
                  authors={publication.authors}
                  media={publication.media}
                  type={publication.type}
                  notion={publication.notion}
                  links={publication.links}
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
            {presentations.slice(0, 3).map((presentation, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 p-2">
                <Card
                  title={presentation.title}
                  description={presentation.description}
                  authors={presentation.authors}
                  media={presentation.media}
                  type={presentation.type}
                  notion={presentation.notion}
                  links={presentation.links}
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
          {news.slice(0, 10).map((item, index) => (
            <NewsCard key={index} date={item.date} news={item.news} />
          ))}
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
