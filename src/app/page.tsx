"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { FC } from "react";
import Link from "next/link";
import FeatureCard from "@/components/FeatureCard";
import { Blogs } from "@/types/indes";

const Home: FC = () => {
  const [featuredBlog, setFeaturedBlog] = useState<Blogs[]>([]);
  const [notes, setNotes] = useState<Blogs[]>([]);

  const [currentProjects, setCurrentProjects] = useState<Blogs[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<Blogs[]>([]);
  const [maxCards, setMaxCards] = useState(4);

  useEffect(() => {
    fetch("data/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        const featuredItem = data.filter((item: Blogs) => item.type === "featured");
        setFeaturedBlog(featuredItem);
        const noteItems = data.filter((item: Blogs) => item.type === "notes");
        setNotes(noteItems);
      })
      .catch((err) => console.error("Error fetching blog data:", err));

    fetch("/data/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        const currentProjectItems = data.filter(
          (item: Blogs) => item.type === "current project"
        );
        setCurrentProjects(currentProjectItems);
        setVisibleProjects(currentProjectItems.slice(0, maxCards));
      })
      .catch((err) => console.error("Error fetching blog data:", err));
  }, [maxCards]);

  return (
    <>
      <div className="p-4 bg-gray-100">
        {featuredBlog.map((project, index) => (
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

      <div className="flex flex-wrap">
        <div className="w-full sm:w-3/4 flex flex-col items-start">
          <div className="p-4 border-b-1 border-gray-400">
            <h3 className="text-xl font-semibold mb-4 text-left">Notes</h3>
            <div className="flex flex-wrap justify-center">
              {notes.slice(0, 3).map((project, index) => (
                <div key={index} className="w-1/3">
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
              <Link href="/blog/notes">
                <button className="text-blue-600 hover:underline">
                  See More →
                </button>
              </Link>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4 text-left">Journals</h3>
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
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4 text-left">Journals</h3>
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

        <div className="w-full sm:w-1/4 p-4 flex flex-col items-start">
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
      </div>
    </>
  );
};

export default Home;
