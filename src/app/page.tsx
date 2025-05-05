"use client";

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

const Home: FC = () => {
  const [currentProjects, setCurrentProjects] = useState<Projects[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<Projects[]>([]);
  const [notes, setNotes] = useState<Projects[]>([]);
  const [maxCards, setMaxCards] = useState(4);

  useEffect(() => {
    fetch("/data/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        const currentProjectItems = data.filter(
          (item: Projects) => item.type === "current project"
        );
        const noteItems = data.filter((item: Projects) => item.type === 'blog');
        setNotes(noteItems);
        setCurrentProjects(currentProjectItems);
        setVisibleProjects(currentProjectItems.slice(0, maxCards));
      })
      .catch((err) => console.error("Error fetching blog data:", err));
  }, [maxCards]);

  return (
    <>
    
    <div className="p-4 bg-gray-100">
          {currentProjects.slice(0, 1).map((project, index) => (
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
          <h3 className="text-xl font-semibold mb-4 text-left">
            Notes
          </h3>
          <div className="flex flex-wrap justify-center">
            {notes.slice(0, 3).map((project, index) => (
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
            Journals
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
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-4 text-left">
            Journals
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
