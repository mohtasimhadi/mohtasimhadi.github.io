import Link from "next/link";

type BlogCardProps = {
  blog: {
    title: string;
    image: string;
    description: string;
    notionUrl: string;
  };
};

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <div className="p-4">
      <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-bold">{blog.title}</h3>
      <p className="text-gray-600 mb-4">{blog.description}</p>
      <Link
        href={`/blog/${encodeURIComponent(blog.title)}`}
        className="text-blue-500 hover:underline"
      >
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;
