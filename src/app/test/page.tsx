import { getDatabase } from '@/lib/notion';
import { NotionPageWithCustomProperties } from '@/types/notion';

export default async function Home() {
  const posts = await getDatabase();
  
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Notion CMS Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const title = post.properties.Name.title[0]?.plain_text || 'Untitled';
          const description = post.properties.Description?.rich_text[0]?.plain_text || '';
          
          return (
            <div key={post.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              <p className="text-gray-600 mb-4">{description}</p>
              <a href={`/${post.id}`} className="text-blue-500 hover:underline">
                Read more
              </a>
            </div>
          );
        })}
      </div>
    </main>
  );
}