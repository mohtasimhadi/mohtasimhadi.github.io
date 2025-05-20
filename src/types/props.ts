export type CardProps = {
  variant: 'large' | 'normal' | 'long'
  id: string
  title: string
  cover?: string | null
  date?: string
  type: string
  affiliation: string[]
  authors: string[]
  publisher: string
  tags: string[]
}