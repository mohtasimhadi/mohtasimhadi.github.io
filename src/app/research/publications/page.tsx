'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import { FC } from 'react';

interface Blog {
  title: string;
  description: string;
  authors?: string[];
  media: string;
  type: string;
  notion: string;
  links?: { title: string; url: string }[];
}

const Presentation: FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    // Fetch data from public/data/data.json
    fetch('/data/blogs.json')
      .then((res) => res.json())
      .then((data) => {
        // Filter the data for blogs only
        const blogItems = data.filter((item: Blog) => item.type === 'blog');
        setBlogs(blogItems);
      })
      .catch((err) => console.error('Error fetching blog data:', err));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {blogs.map((blog, index) => (
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
  );
};

export default Presentation;