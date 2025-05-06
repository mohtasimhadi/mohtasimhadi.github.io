"use client";

import PoetryCard from "@/components/SMCard";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { FC } from "react";
import Link from "next/link";
import FeatureCard from "@/components/FeatureCard";
import { Blogs } from "@/types";

const OnWriting: FC = () => {
  const [poetries, setPoetries] = useState<Blogs[]>([]);
  const [featuredBlog, setFeaturedBlog] = useState<Blogs[]>([]);
  const [journals, setJournals] = useState<Blogs[]>([]);
  const [theTypist, settheTypist] = useState<Blogs[]>([]);
  const [notes, setNotes] = useState<Blogs[]>([]);

  useEffect(() => {
    fetch("/data/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        const featuredBlog = data.filter(
          (item: Blogs) => item.type === "featured"
        );
        setFeaturedBlog(featuredBlog);

        const journals = data.filter((item: Blogs) => item.type === "journal");
        setJournals(journals);

        const theTypist = data.filter(
          (item: Blogs) => item.type === "theTypist"
        );
        settheTypist(theTypist);

        const notes = data.filter(
          (item: Blogs) => item.type === "note"
        );
        setNotes(notes);

        const poetries = data.filter((item: Blogs) => item.type === "poetry");
        setPoetries(poetries);
      })
      .catch((err) => console.error("Error fetching blogs data:", err));
  });

  return (
    <div className="flex flex-wrap">
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
      
      
      <div className="w-full sm:w-4/5 flex flex-col items-start">
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-4 text-left">Journals</h3>
          <div className="flex flex-wrap justify-center">
            {journals.slice(0, 3).map((journal, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/2 p-2">
                <Card
                  title={journal.title}
                  description={journal.description}
                  authors={journal.authors}
                  media={journal.media}
                  type={journal.type}
                  notion={journal.notion}
                  links={journal.links}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end w-full mt-4">
            <Link href="/blogs/journals">
              <button className="text-blue-600 hover:underline">
                See More →
              </button>
            </Link>
          </div>
        </div>

        <div className="p-4 bg-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-left">theTypist</h3>
          <div className="flex flex-wrap justify-center">
            {theTypist.slice(0, 3).map((publication, index) => (
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
            <Link href="/blogs/theTypist">
              <button className="text-blue-600 hover:underline">
                See More →
              </button>
            </Link>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold mb-4 text-left">
            Notes
          </h3>
          <div className="flex flex-wrap justify-center">
            {notes.slice(0, 3).map((notes, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 p-2">
                <Card
                  title={notes.title}
                  description={notes.description}
                  authors={notes.authors}
                  media={notes.media}
                  type={notes.type}
                  notion={notes.notion}
                  links={notes.links}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end w-full mt-4">
            <Link href="/blogs/notes">
              <button className="text-blue-600 hover:underline">
                See More →
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full sm:w-1/5 p-4 flex flex-col items-start">
        <h3 className="text-xl font-semibold mb-4 text-left">Poetries</h3>
        <div className="grid grid-cols-1 gap-2">
          {poetries.slice(0, 10).map((item, index) => (
            <PoetryCard
              key={index}
              title={item.title}
              date={item.date}
              notion={item.notion}
            />
          ))}
        </div>
        <div className="flex justify-end w-full mt-4">
          <Link href="/blogs/poetries">
            <button className="text-blue-600 hover:underline">
              See More →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OnWriting;
