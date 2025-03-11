export interface Mentor {
  id: string
  name: string
  role: string
  image: string
  pricing: {
    basic: string
    pro: string
    elite: string
  }
}

export const mentors: Mentor[] = [
  {
    id: "ognjen",
    name: "Ognjen Blažić",
    role: "Graphic Design",
    image: "/projects/ognjen.jpg",
    pricing: {
      basic: "99",
      pro: "249",
      elite: "499"
    }
  },
  {
    id: "nikola",
    name: "Jason Kaiser",
    role: "Graphic & Web Design",
    image: "/projects/radisic.jpg",
    pricing: {
      basic: "149",
      pro: "299",
      elite: "599"
    }
  },
  {
    id: "petar",
    name: "Petar Adamović",
    role: "Video Editing",
    image: "/projects/peki.jpg",
    pricing: {
      basic: "79",
      pro: "199",
      elite: "399"
    }
  }
] 