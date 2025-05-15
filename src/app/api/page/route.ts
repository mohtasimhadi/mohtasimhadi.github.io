
import { NotionToMarkdown } from "notion-to-md";
import axios from "axios";
import { AxiosError } from "axios";
import { Client } from "@notionhq/client";
import { NextResponse } from 'next/server'
import { NotionPage } from "@/types/notion";

const NOTION_BASE_URL = 'https://api.notion.com/v1/';
const NOTION_API_KEY = process.env.NOTION_API_KEY

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});
const n2m = new NotionToMarkdown({ notionClient: notion });

const notionClient = axios.create({
    baseURL: NOTION_BASE_URL,
    headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2021-05-13',
        'Content-Type': 'application/json',
    },
});


export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Fetch page data from Notion API
    const res = await notionClient.get<NotionPage>(`pages/${body.page_id}`);

    // Extract properties safely from res.properties (Notion API structure)
    const props = res.data.properties ?? {}

    const meta = {
      title: Array.isArray(props.Name?.title) ? props.Name.title[0]?.text?.content || '' : '',
      cover: res.data.cover?.external?.url || res.data.cover?.file?.url || null,
      affiliation: Array.isArray(props.Affiliation?.rich_text) ? props.Affiliation.rich_text[0]?.plain_text || '' : '',
      authors: Array.isArray(props.Authors?.multi_select) ? props.Authors.multi_select.map(a => a.name) : [],
      date: props.Date?.date?.start || '',
      link: props.Link?.url || '',
      publisher: props.Publisher?.select?.name || '',
      status: props.Status?.select?.name || '',
      tags: Array.isArray(props.Tags?.multi_select) ? props.Tags.multi_select.map(t => t.name) : [],
      type: props.Type?.select?.name || '',
      featured: Boolean(props.Featured?.checkbox),
    };

    // Get markdown content of the page
    const mdblocks = await n2m.pageToMarkdown(body.page_id);
    const fullData = n2m.toMarkdownString(mdblocks);
    const data = fullData.parent

    return NextResponse.json({ meta, data });
  } catch (error: unknown) {
    const err = error as AxiosError;
    console.error('[Notion API Error]', err?.response?.data || err.message);
    return NextResponse.json({ error: 'Failed to fetch Notion page' }, { status: 500 });
  }
}