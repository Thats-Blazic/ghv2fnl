import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 1,
    title: "Najbolji motor za pocetnike",
    type: "youtube",
    client: "Moto Dnevnik",
    views: "2.1M views",
    image: "https://i.ibb.co/gbSFFbDM/ivan-marketing-tajne.jpg",
    slug: "najbolji-motor-za-pocetnike",
    category: "YouTube",
    description: "Custom thumbnail design for motorcycle review content"
  },
  // ... ostali projekti
];

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug)
} 