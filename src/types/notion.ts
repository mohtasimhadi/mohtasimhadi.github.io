export interface ParsedPage {
  id: string
  title: string
  cover: string | null
  affiliation: string
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
}

export interface NotionPage {
  id: string
  properties: {
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
      rich_text: Array<{
        plain_text: string
      }>
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
      select: { name: string }
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
