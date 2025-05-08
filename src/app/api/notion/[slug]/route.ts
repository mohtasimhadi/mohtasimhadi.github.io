import { NextResponse } from 'next/server';
import { notionapi } from '@/lib/notion';

// Notion page IDs are 32 characters long hexadecimal strings
const isValidNotionPageId = (id: string) => {
  return /^[0-9a-f]{32}$/.test(id);
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const slug = pathParts[pathParts.length - 1];

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing page ID' },
        { status: 400 }
      );
    }

    // Validate the ID format
    if (!isValidNotionPageId(slug)) {
      return NextResponse.json(
        { error: 'Invalid Notion page ID format' },
        { status: 400 }
      );
    }

    const data = await notionapi.getPage(slug);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Notion page. Please check the page ID and try again.' },
      { status: 500 }
    );
  }
}