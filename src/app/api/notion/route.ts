import { NextResponse } from 'next/server'
import axios from 'axios'

const NOTION_API_URL = `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`
const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_VERSION = '2022-06-28'

export async function GET() {
  try {
    const res = await axios.post(
      NOTION_API_URL,
      {},
      {
        headers: {
          'Authorization': `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': NOTION_VERSION,
          'Content-Type': 'application/json',
        },
      }
    )

    const pages = res.data.results.map((page: any) => {
      const props = page.properties
      console.log(props)

      return {
        id: page.id,
        title: props?.Title?.title?.[0]?.plain_text || '',
        cover: page.cover?.external?.url || page.cover?.file?.url || null,
        affiliation: props?.Affiliation?.rich_text?.[0]?.plain_text || '',
        authors: props?.Authors?.multi_select?.map((a: any) => a.name) || [],
        date: props?.Date?.date?.start || '',
        link: props?.Link?.url || '',
        publisher: props?.Publisher?.select?.name || '',
        status: props?.Status?.select?.name || '',
        tags: props?.Tags?.multi_select?.map((t: any) => t.name) || [],
        type: props?.Type?.select?.name || '',
      }
    })
    console.log(pages)
    return NextResponse.json(pages)
  } catch (error: any) {
    console.error('[Notion API Error]', error?.response?.data || error.message)
    return NextResponse.json({ error: 'Failed to fetch Notion pages' }, { status: 500 })
  }
}