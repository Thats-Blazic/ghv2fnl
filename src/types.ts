export type ProjectType = 'youtube' | 'brand' | 'stream' | 'other'

export interface Project {
  id: number
  title: string
  type: ProjectType
  image: string
  slug: string
  client: string
  views?: string
  category?: string
  description: string
} 