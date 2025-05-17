import { NextResponse } from 'next/server'
import axios from 'axios'
import { NotionResponse, ParsedPage } from '@/types/notion'

const NOTION_API_URL = `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`
const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_VERSION = '2022-06-28'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { query, filters } = body

    const filterConditions = []

    // Text query filter (title contains)
    if (query) {
      filterConditions.push({
        property: 'Name',
        title: {
          contains: query,
        },
      })
    }

    // Dynamic filters
    if (filters?.type) {
      filterConditions.push({
        property: 'Type',
        select: {
          equals: filters.type,
        },
      })
    }

    if (filters?.status) {
      filterConditions.push({
        property: 'Status',
        select: {
          equals: filters.status,
        },
      })
    }

    if (filters?.tag) {
      filterConditions.push({
        property: 'Tags',
        multi_select: {
          contains: filters.tag,
        },
      })
    }

    if (filters?.publisher) {
      filterConditions.push({
        property: 'Publisher',
        select: {
          equals: filters.publisher,
        },
      })
    }

    if (filters?.featured) {
      filterConditions.push({
        property: 'Featured',
        checkbox: {
          equals: true,
        },
      })
    }

    const notionRequestBody = {
      page_size: 100,
      filter: {
        and: filterConditions,
      },
    }

    const res = await axios.post<NotionResponse>(NOTION_API_URL, notionRequestBody, {
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
    })

    const pages: ParsedPage[] = res.data.results.map((page) => {
      const props = page.properties ?? {}

      return {
        id: page.id!,
        title: props.Name?.title?.[0]?.text?.content || '',
        cover: page.cover?.external?.url || page.cover?.file?.url || null,
        affiliation: props.Affiliation?.multi_select?.map((a) => a.name) || [],
        authors: props.Authors?.multi_select?.map((a) => a.name) || [],
        date: props.Date?.date?.start || '',
        link: props.Link?.url || '',
        publisher: props.Publisher?.rich_text?.[0]?.plain_text || '',
        status: props.Status?.select?.name || '',
        tags: props.Tags?.multi_select?.map((t) => t.name) || [],
        type: props.Type?.select?.name || '',
        featured: props.Featured?.checkbox || false,
      }
    })

    return NextResponse.json({
      results: pages,
    })
  } catch (error) {
    console.error('[Search API Error]', error)
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 })
  }
}
