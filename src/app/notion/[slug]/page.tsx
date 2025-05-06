"use client";
import { useParams } from 'next/navigation';
import { NotionPage } from '@/components/notionRenderer';
import { notion } from '@/types';

async function getData(rootPageId:string) {
  return await notion.getPage(rootPageId);
}


export default async function Notion() {
  const { slug } = useParams();
  const data = await getData(slug as string);

  return (
    <div>
      <NotionPage recordMap={data} rootPageId={slug as string} />
    </div>
  );
}