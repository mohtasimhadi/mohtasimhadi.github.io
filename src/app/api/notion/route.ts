import { NextResponse } from 'next/server'
import axios from 'axios'

const NOTION_API_URL = `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`
const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_VERSION = '2022-06-28'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { cursor = null, filters = null } = body

    const notionRequestBody: any = {
      page_size: 10,
    }

    if (cursor) {
      notionRequestBody.start_cursor = cursor
    }

    if (filters) {
      notionRequestBody.filter = filters
    }

    const res = await axios.post(NOTION_API_URL, notionRequestBody, {
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
    })

    const pages = res.data.results.map((page: any) => {
      const props = page.properties

      return {
        id: page.id,
        title: props.Name?.title[0]?.text?.content || '',
        cover: page.cover?.external?.url || page.cover?.file?.url || null,
        affiliation: props?.Affiliation?.rich_text?.[0]?.plain_text || '',
        authors: props?.Authors?.multi_select?.map((a: any) => a.name) || [],
        date: props?.Date?.date?.start || '',
        link: props?.Link?.url || '',
        publisher: props?.Publisher?.select?.name || '',
        status: props?.Status?.select?.name || '',
        tags: props?.Tags?.multi_select?.map((t: any) => t.name) || [],
        type: props?.Type?.select?.name || '',
        featured: props.Featured?.checkbox || false,
      }
    })

    return NextResponse.json({
      results: pages,
      next_cursor: res.data.next_cursor,
      has_more: res.data.has_more,
    })
  } catch (error: any) {
    console.error('[Notion API Error]', error?.response?.data || error.message)
    return NextResponse.json({ error: 'Failed to fetch Notion pages' }, { status: 500 })
  }
}
