import { NextResponse } from 'next/server'
import axios from 'axios'
import { NotionRequestBody, NotionFilter } from '@/types/notion'
import { ParsedBook } from '@/types/books'
import type { AxiosErrorData } from '@/types/axios'
import { BookResponse } from '@/types/books'

const NOTION_API_URL = `https://api.notion.com/v1/databases/${process.env.BOOKS_DATABASE_ID}/query`
const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_VERSION = '2022-06-28'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { cursor = null, filters = null }: { cursor?: string | null; filters?: NotionFilter | null } = body

        const notionRequestBody: NotionRequestBody = {
            page_size: 12,
            sorts: [
                {
                    property: "Date",
                    direction: "descending"
                }
            ]
        }

        if (cursor) {
            notionRequestBody.start_cursor = cursor
        }

        if (filters) {
            notionRequestBody.filter = filters
        }

        const res = await axios.post<BookResponse>(NOTION_API_URL, notionRequestBody, {
            headers: {
                Authorization: `Bearer ${NOTION_API_KEY}`,
                'Notion-Version': NOTION_VERSION,
                'Content-Type': 'application/json',
            },
        })

        const books: ParsedBook[] = res.data.results.map((page) => {
            const props = page.properties ?? {}

            return {
                id: page.id!,
                title: props.Name?.title?.[0]?.text?.content || '',
                cover: page.cover?.external?.url || page.cover?.file?.url || null,
                authors: props.Author?.multi_select?.map((a) => a.name) || [],
                date: props.Date?.date?.start || '',
                goodreads: props.Goodreads?.url || '',
                publisher: props.Publisher?.select?.name || '',
                series: props.Series?.select?.name || '',
                synopsis: props.Synopsis?.rich_text[0]?.plain_text || '',
                tags: props.Tags?.multi_select?.map((t) => t.name) || [],
                type: props.Type?.select?.name || '',
            }
        })

        return NextResponse.json({
            results: books,
            next_cursor: res.data.next_cursor,
            has_more: res.data.has_more,
        })
    } catch (error: unknown) {
        const err = error as AxiosErrorData
        console.error('[Notion API Error]', err?.response?.data || err.message)
        return NextResponse.json({ error: 'Failed to fetch Notion pages' }, { status: 500 })
    }
}
