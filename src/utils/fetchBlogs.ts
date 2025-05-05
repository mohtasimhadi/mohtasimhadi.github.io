// utils/fetchBlogs.ts
export const fetchBlogsData = async (path: string) => {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return [];
    }
  };  