export type CardProps = {
  variant: 'large' | 'normal' | 'long'
  title: string
  cover?: string | null
  date?: string
  authors?: string[]
  keywords?: string[]
}