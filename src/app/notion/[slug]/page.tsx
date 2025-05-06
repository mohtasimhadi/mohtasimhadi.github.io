"use client";
import { useEffect, useState } from 'react';

export default function NotionPage() {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const res = await fetch('/api/notion/your-slug');
        const html = await res.text(); // Get the HTML response as a string
        setHtmlContent(html);
      } catch (err: unknown) {
        if (err instanceof Error) {
          // Check if the error is an instance of Error
          if (err.name !== 'AbortError') {
            setError(err.message); // Set error message if it's an instance of Error
          }
        } else {
          // Handle the case where the error is not an instance of Error
          setError('An unknown error occurred');
        }
      }
    };

    fetchHtml();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {htmlContent ? (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
