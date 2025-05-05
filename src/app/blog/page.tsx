"use client";

import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  useEffect(() => {
    fetch("/data/blogs.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto pt-10 px-4 md:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white border p-4 rounded shadow hover:shadow-md transition cursor-pointer"
            onClick={() => setSelectedBlog(blog)}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {blog.title}
            </h2>
            <p className="text-sm text-gray-600">{blog.description}</p>
          </div>
        ))}
      </div>

      {/* Modal with Notion Embed */}
      <Transition show={!!selectedBlog} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setSelectedBlog(null)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-100"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <Dialog.Panel className="w-full max-w-4xl bg-white rounded shadow p-4 relative">
                <div className="flex justify-between items-center mb-2">
                  <Dialog.Title className="text-xl font-bold">
                    {selectedBlog?.title}
                  </Dialog.Title>
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="text-gray-500"
                  >
                    ✕
                  </button>
                </div>
                <iframe
                  src={selectedBlog?.notionUrl}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  allowFullScreen
                  className="rounded border"
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

    </div>
  );
}
