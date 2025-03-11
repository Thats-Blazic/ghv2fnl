import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 1,
    title: "Marketing Tajne",
    type: 'youtube',
    slug: "marketing-tajne",
    category: "Thumbnails",
    client: "Ivan Jerkovic",
    image: "https://i.ibb.co/gbSFFbDM/ivan-marketing-tajne.jpg",
    views: "500K views",
    description: "Custom thumbnail design for marketing content"
  },
  {
    id: 2,
    title: "Najbolji motor za pocetnike",
    type: 'youtube',
    client: "Moto Dnevnik",
    views: "2.1M views",
    image: "https://i.ibb.co/gbSFFbDM/ivan-marketing-tajne.jpg",
    slug: "najbolji-motor-za-pocetnike",
    category: "YouTube",
    description: "Custom thumbnail design for motorcycle review content"
  },
  {
    id: 3,
    title: "Sad je stvarno dosta njake",
    type: 'youtube',
    client: "Vanja",
    views: "50K views",
    image: "https://i.ibb.co/gbSFFbDM/ivan-marketing-tajne.jpg",
    slug: "sad-je-stvarno-dosta",
    category: "YouTube",
    description: "Eye-catching thumbnail for lifestyle content"
  },
  {
    id: 4,
    title: "Odgovori na Pitanja",
    type: 'youtube',
    slug: "odgovori-na-pitanja",
    category: "Thumbnails",
    client: "Vanja",
    image: "/projects/thumb/odgovori-na-pitanja.jpg",
    views: "50K views",
    description: "Interactive Q&A thumbnail design"
  },
  {
    id: 5,
    title: "Kupujem Novi Motor",
    type: 'youtube',
    slug: "kupujem-novi-motor",
    category: "Thumbnails",
    client: "Moto Dnevnik",
    image: "/projects/thumb/kupujem-novi-motor.jpg",
    views: "100K views",
    description: "Motorcycle purchase review thumbnail"
  },
  {
    id: 6,
    title: "Nasi Fakulteti su Bezveze",
    type: 'youtube',
    slug: "nasi-fakulteti",
    category: "Thumbnails",
    client: "Petar",
    image: "/projects/thumb/fakulteti.jpg",
    views: "75K views",
    description: "Education system review thumbnail"
  },
  {
    id: 7,
    title: "Popij ili Odgovori",
    type: 'youtube',
    slug: "popij-ili-odgovori",
    category: "Thumbnails",
    client: "Dragon Garage",
    image: "/projects/thumb/popij-ili-odgovori.jpg",
    views: "200K views",
    description: "Entertainment game show thumbnail"
  },
  {
    id: 8,
    title: "10 Stvari bez kojih ne mogu kao stomatolog",
    type: 'youtube',
    client: "Kristina Horvat",
    views: "16K views",
    image: "https://i.ibb.co/gbSFFbDM/ivan-marketing-tajne.jpg",
    slug: "10-stvari-stomatolog",
    category: "YouTube",
    description: "Professional thumbnail for medical content"
  },
  {
    id: 9,
    title: "Projekt Menadzer: KTM,YAMAHA,PEUGEOT",
    type: 'youtube',
    client: "ST Moto",
    views: "25K views",
    image: "https://i.ibb.co/gbSFFbDM/ivan-marketing-tajne.jpg",
    slug: "projekt-menadzer",
    category: "YouTube",
    description: "Automotive comparison thumbnail"
  },
  {
    id: 10,
    title: "Pobednik Klase?",
    type: 'youtube',
    client: "ST Moto",
    views: "60K views",
    image: "https://i.ibb.co/gbSFFbDM/ivan-marketing-tajne.jpg",
    slug: "pobednik-klase",
    category: "YouTube",
    description: "Motorcycle review thumbnail"
  },
  {
    id: 11,
    title: "Kako ne izgubiti klijenta?",
    type: 'youtube',
    client: "Petar Adamovic",
    views: "170K views",
    image: "https://i.ibb.co/gbSFFbDM/ivan-marketing-tajne.jpg",
    slug: "kako-ne-izgubiti-klijenta",
    category: "YouTube",
    description: "Business advice content thumbnail"
  },
  {
    id: 12,
    title: "Da li je ovo najbolji motor?",
    type: 'youtube',
    client: "ST Moto",
    views: "120K views",
    image: "https://i.ibb.co/gbSFFbDM/ivan-marketing-tajne.jpg",
    slug: "najbolji-motor",
    category: "YouTube",
    description: "Motorcycle comparison thumbnail"
  },
  {
    id: 13,
    title: "Kako postati uspešan preduzetnik?",
    type: 'youtube',
    client: "Business Academy",
    views: "85K views",
    image: "https://i.ibb.co/gbSFFbDM/ivan-marketing-tajne.jpg",
    slug: "uspesni-preduzetnik",
    category: "YouTube",
    description: "Business advice thumbnail"
  },
  {
    id: 14,
    title: "Top 5 Grešaka u Marketingu",
    type: 'youtube',
    client: "Marketing Pro",
    views: "200K views",
    image: "https://i.ibb.co/gbSFFbDM/ivan-marketing-tajne.jpg",
    slug: "marketing-greske",
    category: "YouTube",
    description: "Marketing tips thumbnail"
  },
  {
    id: 15,
    title: "Gaming Tournament Banner",
    type: 'youtube',
    client: "ESL Gaming",
    views: "50K impressions",
    image: "https://i.ibb.co/XrnLM6Nv/banner-2.jpg",
    slug: "gaming-tournament",
    category: "Banners",
    description: "Custom banner for esports tournament"
  },
  {
    id: 16,
    title: "Music Festival Banner",
    type: 'youtube',
    client: "Festival Hub",
    views: "75K impressions",
    image: "https://i.ibb.co/PtPRG7c/laivda.jpg",
    slug: "music-festival",
    category: "Banners",
    description: "Festival promotional banner"
  },
  {
    id: 17,
    title: "Stream Starting Soon",
    type: 'youtube',
    client: "Pro Gamer",
    views: "30K impressions",
    image: "https://i.ibb.co/bg7LcZgr/banner.jpg",
    slug: "stream-banner",
    category: "Banners",
    description: "Twitch stream banner design"
  }
]

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug)
} 