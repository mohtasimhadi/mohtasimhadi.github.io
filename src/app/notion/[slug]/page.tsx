"use client";
import { useParams } from 'next/navigation';
import { NotionPage } from '@/components/notionRenderer';
import { useEffect, useState } from 'react';

export default function NotionPageWrapper() {
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('Missing page ID');
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/notion/${slug}`, { 
          signal,
          cache: 'force-cache' // or 'no-store' for always fresh
        });
        
        if (!response.ok) {
          throw new Error(`Failed to load: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [slug]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!data) return <div className="p-4">Page not found</div>;

  return (
    <div className="notion-container">
      <NotionPage recordMap={data} rootPageId={slug as string} />
    </div>
  );
}