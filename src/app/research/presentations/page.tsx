'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import { FC } from 'react';
import { Blogs } from '@/types/indes';

const Presentation: FC = () => {
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blogs[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set());
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    fetch('/data/research.json')
      .then((res) => res.json())
      .then((data) => {
        const presentationItems = data.filter((item: Blogs) => item.type === 'presentation');
        setBlogs(presentationItems);

        // Extract unique keywords from blogs
        const allKeywords = new Set<string>();
        presentationItems.forEach((item: Blogs) => {
          item.keywords.forEach((keyword: string) => allKeywords.add(keyword));
        });
        setKeywords(Array.from(allKeywords));
        setFilteredBlogs(presentationItems);
      })
      .catch((err) => console.error('Error fetching blog data:', err));
  }, []);

  const handleSearch = () => {
    let filtered = blogs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected keywords
    if (selectedKeywords.size > 0) {
      filtered = filtered.filter((blog) =>
        blog.keywords.some((keyword: string) => selectedKeywords.has(keyword))
      );
    }

    setFilteredBlogs(filtered);
  };

  const handleKeywordToggle = (keyword: string) => {
    const newSelectedKeywords = new Set(selectedKeywords);
    if (newSelectedKeywords.has(keyword)) {
      newSelectedKeywords.delete(keyword);
    } else {
      newSelectedKeywords.add(keyword);
    }
    setSelectedKeywords(newSelectedKeywords);
  };

  return (
    <div className="container mx-auto p-2 flex">
      {/* Sidebar */}
      <div className="w-1/4 p-4 bg-gray-100">
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={handleSearch}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Filter by Keywords</h3>
          <div className="space-y-2">
            {keywords.map((keyword) => (
              <label key={keyword} className="block cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedKeywords.has(keyword)}
                  onChange={() => handleKeywordToggle(keyword)}
                  className="mr-2"
                />
                {keyword}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4">
        <p className="text-sm p-4 pt-0 pb-2">
          <a href="/research" className="hover:underline">
            Research
          </a>
          &nbsp;&gt;&gt;&nbsp;
          <a href="/research/presentations" className="hover:underline">
            Presentations
          </a>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, index) => (
            <Card
              key={index}
              title={blog.title}
              description={blog.description}
              authors={blog.authors}
              media={blog.media}
              type={blog.type}
              notion={blog.notion}
              links={blog.links}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Presentation;
