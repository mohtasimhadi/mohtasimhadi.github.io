// app/blog/page.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchBlogsData } from "@/utils/fetchBlogs"; // Import the fetch function
import BlogCard from "@/components/BlogCard";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [blogPath, setBlogPath] = useState<string>("/data/blogs.json"); // Default path

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBlogsData(blogPath);
      setBlogs(data);
    };
    
    fetchData();
  }, [blogPath]); // Depend on blogPath to reload data when path changes

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {blogs.map((blog) => (
          <BlogCard key={blog.title} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
