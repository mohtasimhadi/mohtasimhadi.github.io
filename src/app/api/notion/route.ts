import { NextResponse } from 'next/server'
import axios from 'axios'

const NOTION_API_URL = `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`
const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_VERSION = '2022-06-28'

export async function GET() {
  try {
    const res = await axios.post(
      NOTION_API_URL,
      {}, // You can add filters here
      {
        headers: {
          'Authorization': `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': NOTION_VERSION,
          'Content-Type': 'application/json',
        },
      }
    )

    return NextResponse.json(res.data)
  } catch (error: any) {
    console.error('[Notion API Error]', error?.response?.data || error.message)
    return NextResponse.json({ error: 'Failed to fetch Notion pages' }, { status: 500 })
  }
}
