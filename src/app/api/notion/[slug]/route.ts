import { notion } from '@/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Extract slug from URL
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const slug = pathParts[pathParts.length - 1];

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing page ID' },
        { status: 400 }
      );
    }

    const data = await notion.getPage(slug);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Notion page' },
      { status: 500 }
    );
  }
}