export type ProjectType = 'youtube'
export type ProjectCategory = 'Musicians' | 'Gaming' | 'Type Design' | 'Music Productions' | 'Graphic Design'

export interface Project {
  id: number
  title: string
  type: ProjectType
  client: string
  views: string
  image: string
  slug: string
  category: string
  description: string
} 