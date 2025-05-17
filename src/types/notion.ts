export interface ParsedPage {
  id: string
  title: string
  cover: string | null
  affiliation: string[]
  authors: string[]
  date: string
  link: string
  publisher: string
  status: string
  tags: string[]
  type: string
  featured: boolean
}

export interface NotionSelectFilter {
  property: string
  select?: {
    equals?: string
  }
}

export interface NotionFilter {
  and: NotionSelectFilter[]
}

export interface NotionRequestBody {
  page_size: number
  start_cursor?: string
  filter?: NotionFilter
  sorts: Array<{
    property: string,
    direction: string
  }>
}

export interface NotionPage {
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
    Affiliation?: {
      multi_select: Array<{ name: string }>
    }
    Authors?: {
      multi_select: Array<{ name: string }>
    }
    Date?: {
      date: { start: string }
    }
    Link?: {
      url: string
    }
    Publisher?: {
      rich_text: [{ plain_text: string }]
    }
    Status?: {
      select: { name: string }
    }
    Tags?: {
      multi_select: Array<{ name: string }>
    }
    Type?: {
      select: { name: string }
    }
    Featured?: {
      checkbox: boolean
    }
  }
  cover?: {
    external?: { url: string }
    file?: { url: string }
  }
}

export interface NotionResponse {
  results: NotionPage[]
  next_cursor: string | null
  has_more: boolean
}


// Define comprehensive types for Notion data

export interface Author {
  name: string
  url?: string
}



export interface ArticleMetadata {
  title: string
  description: string
  openGraph: {
    title: string
    description: string
    url: string
    type: string
    article: {
      publishedTime?: string
      modifiedTime?: string
      authors: string[]
      tags: string[]
    }
    images: {
      url: string
      width: number
      height: number
      alt: string
    }[]
  }
  twitter: {
    card: string
    title: string
    description: string
    images: string[]
  }
}
