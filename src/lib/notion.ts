import { Client } from '@notionhq/client';
import {
  NotionPage,
  NotionPageWithCustomProperties,
  NotionBlock,
} from '@/types/notion';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function getDatabase(): Promise<NotionPageWithCustomProperties[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  });

  // Filter out non-page results and cast to our custom type
  return response.results.filter((page): page is NotionPage => 
    'properties' in page
  ) as NotionPageWithCustomProperties[];
}

export async function getPage(
  pageId: string
): Promise<NotionPageWithCustomProperties | null> {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response as NotionPageWithCustomProperties;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getBlocks(blockId: string): Promise<NotionBlock[]> {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results as NotionBlock[];
}