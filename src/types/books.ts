export interface ParsedBook {
  id: string
  title: string
  cover: string | null
  authors: string[]
  date: string
  goodreads: string
  publisher: string
  series: string
  synopsis: string
  type: string
  tags: string[]
}

export interface BookPage {
  id?: string
  properties?: {
    Name?: {
      title: Array<{
        text: {
          content: string
        }
      }>
    }
    Cover?: {
      external?: { url: string }
      file?: { url: string }
    }
    Author?: {
      multi_select: Array<{ name: string }>
    }
    Date?: {
      date: { start: string }
    }
    Goodreads?: {
      url: string
    }
    Publisher?: {
      select: { name: string }
    }
    Series?: {
      select: { name: string }
    }
    Tags?: {
      multi_select: Array<{ name: string }>
    }
    Type?: {
      select: { name: string }
    }
    Synopsis?: {
      rich_text: [{ plain_text: string }]
    }
  }
  cover?: {
    external?: { url: string }
    file?: { url: string }
  }
}

export interface BookResponse {
  results: BookPage[]
  next_cursor: string | null
  has_more: boolean
}
