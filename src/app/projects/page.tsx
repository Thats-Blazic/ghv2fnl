'use client'

import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import { useState, useMemo } from 'react'
import ImageModal from '@/components/ImageModal'
import Link from 'next/link'

const testImages = [
  {
    src: "/projects/thumb/ivan-marketing-tajne.jpg",
    alt: "Marketing Secrets Thumbnail",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/thumb-novi.jpg",
    alt: "New Thumbnail",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/st-moto.jpg",
    alt: "Moto Thumbnail",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/projekt-menadzer.jpg",
    alt: "Project Manager Thumbnail",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/krtoni.jpg",
    alt: "Krtoni Thumbnail",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/gastro.jpg",
    alt: "Gastro Thumbnail",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/dentis.jpg",
    alt: "Dentist Thumbnail",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/1.jpg",
    alt: "Thumbnail 1",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/2.jpg",
    alt: "Thumbnail 2",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/a.jpg",
    alt: "Thumbnail A",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/b6626d215597007-676f408e42ec5.jpg",
    alt: "Design Thumbnail",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/aaaaaa.jpg",
    alt: "Special Thumbnail",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/5.jpg",
    alt: "Crypto Trading Masterclass",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/6.jpg",
    alt: "Fitness Transformation Guide",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/7.jpg",
    alt: "Digital Marketing Secrets",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/brutal.jpg",
    alt: "Latest Tech Review",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/kristinaa.jpg",
    alt: "Cooking Masterclass",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/shop.png",
    alt: "Business Strategy Guide",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/pera.jpg",
    alt: "Gaming Stream Highlight",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/mtt.jpg",
    alt: "Photography Tips & Tricks",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/js1.png",
    alt: "Web Development Course",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/th1.jpg",
    alt: "Crypto Investment Guide",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/th2.jpg",
    alt: "Fitness Journey",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/th3.jpg",
    alt: "Pro Gaming Tips",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/portfolio0.jpg",
    alt: "Digital Art Masterclass",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/portfolio7.jpg",
    alt: "Social Media Growth",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/portfolio9.jpg",
    alt: "Music Production",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/portfolio15.png",
    alt: "Video Editing Pro",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/Thumbnail 4.jpg",
    alt: "3D Modeling Course",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/Thumbnail 19.jpg",
    alt: "UI/UX Design Workshop",
    category: "Thumbnails"
  },
  {
    src: "/projects/thumb/stba.jpg",
    alt: "",
    category: "Banners"
  },
  {
    src: "/projects/thumb/motod.jpg",
    alt: "",
    category: "Banners"
  },
  {
    src: "/projects/thumb/lav.jpg",
    alt: "",
    category: "Banners"
  },
  {
    src: "/projects/thumb/perou.jpg",
    alt: "",
    category: "Banners"
  },
  {
    src: "/projects/thumb/ivann.jpg",
    alt: "",
    category: "Banners"
  },
  {
    src: "/projects/thumb/badem.jpg",
    alt: "",
    category: "Banners"
  },
  {
    src: "/projects/thumb/smergut.jpg",
    alt: "Gaming Tournament Banner",
    category: "Banners"
  },
  {
    src: "/projects/thumb/pacho.jpg",
    alt: "Esports Championship",
    category: "Banners"
  },
  {
    src: "/projects/thumb/isho.jpg",
    alt: "Stream Overlay Banner",
    category: "Banners"
  },
  {
    src: "/projects/thumb/kad.jpg",
    alt: "Gaming Event Cover",
    category: "Banners"
  },
  {
    src: "/projects/thumb/st.jpg",
    alt: "Twitch Channel Banner",
    category: "Banners"
  },
  {
    src: "/projects/thumb/face.jpg",
    alt: "YouTube Gaming Banner",
    category: "Banners"
  }
]

// New websites data
const websites = [
  {
    title: "Ghost Force Studio",
    description: "Dark-themed creative studio website with striking visuals and portfolio showcase",
    image: "/ghostweb.jpg",
    tags: ["React", "Next.js", "Tailwind CSS"],
    link: "https://ghostforcestudio.com",
    client: "Ghost Force Studio",
    year: "2025",
    services: ["Web Design", "Frontend Development", "UI/UX Design"],
    challenge: "Create a visually striking website that showcases the studio's creative work while maintaining excellent performance and accessibility.",
    solution: "Developed a Next.js-based website with optimized image loading, smooth animations, and a dark theme that highlights the studio's portfolio pieces."
  },
  {
    title: "Kickstarter Community",
    description: "Vibrant crowdfunding community platform with project showcases and backer engagement features",
    image: "/kickweb.jpg",
    tags: ["Vue.js", "GSAP", "Firebase"],
    link: "https://kickstarter-community.com",
    client: "Kickstarter Community",
    year: "2024",
    services: ["Web Development", "Animation Design", "Backend Integration"],
    challenge: "Build a high-performance community platform that connects creators with backers and provides an engaging user experience for project discovery.",
    solution: "Implemented Vue.js with GSAP animations and Firebase backend to create a responsive, interactive experience with smooth transitions and dynamic project showcases."
  },
  {
    title: "Hotel Merit Budva",
    description: "Elegant coastal hotel website with panoramic Adriatic views and premium booking experience",
    image: "/hotelweb.jpg",
    tags: ["React", "Node.js", "MongoDB"],
    link: "https://www.meritstarlithotel.com/",
    client: "Hotel Merit Budva",
    year: "2024",
    services: ["Full-stack Development", "Booking System", "Payment Integration"],
    challenge: "Develop a sophisticated booking platform that showcases the hotel's beachfront location and luxury accommodations while providing a seamless reservation experience for guests.",
    solution: "Created a React frontend with a Node.js backend and MongoDB database, featuring high-quality imagery of the Montenegrin coastline, intuitive booking flow, and secure payment processing for an elevated user experience."
  },
  {
    title: "Hotel Grand Kopaonik",
    description: "Mountain resort website with scenic imagery and comprehensive accommodation showcase",
    image: "/grandweb.jpg",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    link: "https://www.grandkopaonik.com/",
    client: "Hotel Grand Kopaonik",
    year: "2021",
    services: ["Web Development", "Database Design", "Content Management"],
    challenge: "Build a platform that highlights the mountain resort's amenities and natural surroundings while providing an intuitive booking system for visitors to Serbia's popular Kopaonik mountain region.",
    solution: "Developed a Next.js application with Prisma ORM and PostgreSQL database, featuring stunning mountain imagery, virtual tours of accommodations, and a user-friendly reservation system that showcases seasonal activities and special offers."
  },
  {
    title: "Heaven Roleplay",
    description: "Immersive FiveM gaming server website with dynamic player statistics and community features",
    image: "/zen.jpg",
    tags: ["React", "Socket.io", "Express.js"],
    link: "https://heaven-ogc.com/",
    client: "Zen Gaming Community",
    year: "2024",
    services: ["Web Development", "Real-time Features", "Community Platform"],
    challenge: "Create an engaging website for a FiveM roleplay server that provides real-time server statistics, player information, and community engagement tools while maintaining the server's unique atmosphere.",
    solution: "Built a React-based platform with real-time Socket.io integration for live server stats, player counts, and community events. Implemented a custom dashboard for player profiles, faction management, and server rules with a sleek, gaming-inspired design."
  },
  {
    title: "Ghetto OGC",
    description: "Modern landing page for a comprehensive JavaScript learning platform",
    image: "/js1.jpg",
    tags: ["Next.js", "Framer Motion", "Stripe"],
    link: "#",
    client: "JS Mastery",
    year: "2024",
    services: ["Web Design", "Animation Development", "Payment Integration"],
    challenge: "Design an engaging and interactive landing page that effectively communicates the value proposition of the JavaScript learning platform while providing a smooth enrollment experience.",
    solution: "Developed a Next.js website with fluid Framer Motion animations, interactive code examples, and seamless Stripe payment integration. Created an intuitive course preview system and student testimonial showcase to drive conversions."
  }
]

// New branding projects data
const brandingProjects = [
  {
    title: "Sim Lab Tech Brand Identity",
    description: "Comprehensive brand identity and presentation design for a cutting-edge tech startup",
    image: "/projects/brand/brand1.jpg",
    tags: ["Brand Identity", "Presentation Design", "Visual Strategy"],
    client: "Nimbel Technologies",
    year: "2025",
    services: ["Brand Strategy", "Visual Identity", "Presentation Design", "Marketing Materials"],
    challenge: "Create a sophisticated and forward-thinking brand identity for a tech startup entering the competitive AI and machine learning market, with a focus on presentation materials that would appeal to investors and enterprise clients.",
    solution: "Developed a clean, modern visual identity with a tech-focused color palette and geometric elements. Created a comprehensive presentation deck with data visualizations, product mockups, and strategic messaging that effectively communicates the company's value proposition."
  },
  {
    title: "Blend Coffee Branding",
    description: "Blend coffee brand identity with packaging design for a specialty roastery",
    image: "/projects/brand/brand2.jpg",
    tags: ["Brand Identity", "Packaging", "Logo Design"],
    client: "Roasify Coffee Co.",
    year: "2024",
    services: ["Brand Identity", "Packaging Design", "Logo Design", "Typography Selection"],
    challenge: "Develop a distinctive brand identity for a specialty coffee roastery that conveys artisanal quality and sustainability while standing out in the premium coffee market.",
    solution: "Created a warm, inviting brand identity with earthy tones and textured elements. Designed minimalist packaging with a focus on origin stories and roasting profiles, featuring a custom hand-drawn logo that emphasizes the artisanal nature of the product."
  },
  {
    title: "TWG Investment Group",
    description: "Sophisticated brand identity and presentation materials for a financial investment firm",
    image: "/projects/brand/brand4.jpg",
    tags: ["Corporate Identity", "Financial Services", "Presentation Design"],
    client: "TWG Investment Group",
    year: "2023",
    services: ["Brand Identity", "Corporate Stationery", "Presentation Templates", "Digital Assets"],
    challenge: "Create a trustworthy and premium brand identity for a financial investment firm that communicates stability, expertise, and sophistication to high-net-worth clients.",
    solution: "Developed an elegant visual identity with a refined color palette of deep blues and gold accents. Created comprehensive presentation materials with clean data visualizations, custom iconography, and professional photography that conveys confidence and financial expertise."
  },
  {
    title: "Accelerator DAO Branding",
    description: "Dynamic brand identity and presentation design for a blockchain accelerator platform",
    image: "/projects/brand/brand3.jpg",
    tags: ["Brand Identity", "Web3", "Presentation Design"],
    client: "Accelerator DAO",
    year: "2024",
    services: ["Brand Strategy", "Visual Identity", "Presentation Design", "Digital Assets"],
    challenge: "Design a forward-thinking brand identity for a blockchain accelerator that appeals to both crypto-native audiences and traditional investors entering the Web3 space.",
    solution: "Created a bold, technology-focused visual identity with vibrant gradients and abstract digital elements. Developed a comprehensive pitch deck with clear explanations of complex blockchain concepts, ecosystem visualizations, and a cohesive design system that works across digital and presentation formats."
  }
]

export default function ProjectsPage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const [activeCategory, setActiveCategory] = useState('Branding')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [hoveredWebsite, setHoveredWebsite] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)

  const filteredImages = useMemo(() => {
    if (activeCategory === 'Websites' || activeCategory === 'Branding') return [];
    return testImages.filter(image => image.category === activeCategory)
  }, [activeCategory])

  // Project Details Modal Component
  const ProjectDetails = () => {
    if (!selectedProject) return null;
    
    return (
      <AnimatePresence>
        {isProjectModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsProjectModalOpen(false);
              setSelectedProject(null);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 overflow-y-auto backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-gradient-to-br from-[#0a0a0a] to-[#03040a] border border-violet-500/90 rounded-2xl overflow-hidden cursor-default shadow-[0_0_50px_rgba(139,92,246,0.15)]"
            >
              {/* Close button - top right */}
              <button 
                onClick={() => {
                  setIsProjectModalOpen(false);
                  setSelectedProject(null);
                }}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors border border-white/10 hover:border-violet-500/30 group"
                aria-label="Close modal"
              >
                <i className="fa-solid fa-xmark text-lg group-hover:rotate-90 transition-transform duration-300"></i>
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image section */}
                <div className="relative aspect-video md:aspect-auto md:h-full">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title || ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    unoptimized={true}
                    loader={({ src }) => src}
                  />
                  
                  {/* Floating tags */}
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2 max-w-[80%]">
                    {selectedProject.tags && selectedProject.tags.map((tag: string, index: number) => (
                      <motion.span 
                        key={tag}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + (index * 0.05) }}
                        className="px-3 py-1 rounded-full bg-violet-600/80 backdrop-blur-sm text-xs font-medium text-white shadow-lg border border-violet-500/30"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  
                  {/* Year badge */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-6 right-6 px-4 py-1 rounded-full bg-black/50 backdrop-blur-sm text-sm font-medium text-white/90 border border-white/10 shadow-lg"
                  >
                    {selectedProject.year}
                  </motion.div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0a0a]" />
                  
                  {/* Client badge - mobile only */}
                  <div className="absolute bottom-6 left-6 md:hidden flex items-center gap-3 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-sm border border-violet-500/20">
                    <div className="w-8 h-8 rounded-full bg-violet-600/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-violet-300">
                        {selectedProject.client ? selectedProject.client.substring(0, 2) : ''}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-violet-300">Client</p>
                      <p className="text-sm font-medium text-white">{selectedProject.client}</p>
                    </div>
                  </div>
                </div>
                
                {/* Content section */}
                <div className="p-6 md:p-8 md:max-h-[80vh] md:overflow-y-auto custom-scrollbar">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-200">{selectedProject.title}</h2>
                    
                    {/* Client info - desktop only */}
                    <div className="hidden md:flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-violet-600/30 flex items-center justify-center">
                        <span className="text-xs font-bold text-violet-300">
                          {selectedProject.client ? selectedProject.client.substring(0, 2) : ''}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-violet-300">Client</p>
                        <p className="text-sm font-medium text-white">{selectedProject.client}</p>
                      </div>
                    </div>
                    
                    {/* Divider */}
                    <div className="h-px w-full bg-gradient-to-r from-violet-500/20 via-violet-500/10 to-transparent my-6"></div>
                    
                    {/* Main description */}
                    <p className="text-white/70 mb-8 text-lg leading-relaxed">{selectedProject.description}</p>
                    
                    {/* Services */}
                    {selectedProject.services && selectedProject.services.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                      >
                        <h4 className="text-sm text-violet-400 mb-3 uppercase tracking-wider font-medium">Services</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedProject.services.map((service: string, index: number) => (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + (index * 0.05) }}
                              className="flex items-center gap-2"
                            >
                              <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                              <span className="text-white/80">{service}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Challenge & Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {selectedProject.challenge && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="bg-violet-900/10 border border-violet-500/20 rounded-xl p-5"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                              <i className="fa-solid fa-mountain text-violet-400 text-sm"></i>
                            </div>
                            <h4 className="text-violet-400 font-medium">Challenge</h4>
                          </div>
                          <p className="text-white/80 text-sm leading-relaxed">{selectedProject.challenge}</p>
                        </motion.div>
                      )}
                      
                      {selectedProject.solution && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="bg-violet-900/10 border border-violet-500/20 rounded-xl p-5"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                              <i className="fa-solid fa-lightbulb text-violet-400 text-sm"></i>
                            </div>
                            <h4 className="text-violet-400 font-medium">Solution</h4>
                          </div>
                          <p className="text-white/80 text-sm leading-relaxed">{selectedProject.solution}</p>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Visit link */}
                    {selectedProject.link && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8"
                      >
                        <Link 
                          href={selectedProject.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-700 text-white font-medium group hover:from-violet-500 hover:to-violet-600 transition-all duration-300 shadow-lg shadow-violet-900/20"
                        >
                          <span>Visit Project</span>
                          <i className="fa-solid fa-arrow-up-right-from-square group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
                        </Link>
                      </motion.div>
                    )}
                    
                    {/* Mobile close button - visible only on small screens */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      onClick={() => {
                        setIsProjectModalOpen(false);
                        setSelectedProject(null);
                      }}
                      className="md:hidden w-full mt-8 py-4 rounded-xl bg-black/50 border border-violet-500/30 text-white font-medium flex items-center justify-center gap-2"
                      aria-label="Close modal"
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                      <span>Back to Projects</span>
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950/10 via-black to-black" />
          
          {/* Animated particles */}
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-violet-400 rounded-full"
                style={{
                  top: `${(i * 5) % 100}%`,
                  left: `${(i * 7) % 100}%`,
                }}
                animate={{
                  y: [0, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 5 + (i % 10),
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
          
          {/* Light effect */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] opacity-30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-violet-400 font-medium tracking-wide uppercase mb-4"
            >
              Our Creative Portfolio
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-300 to-white"
            >
              Showcasing Our Work
            </motion.h1>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-px max-w-md mx-auto bg-gradient-to-r from-transparent via-violet-500 to-transparent mb-8"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg text-white/60 max-w-2xl mx-auto mb-12"
            >
              Explore our diverse portfolio of creative projects, from eye-catching thumbnails and banners to fully responsive websites and comprehensive brand identities.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {[
              { name: 'Branding', icon: 'fa-palette' },
              { name: 'Websites', icon: 'fa-globe' },
              { name: 'Thumbnails', icon: 'fa-image' },
              { name: 'Banners', icon: 'fa-panorama' }
            ].map((category) => (
              <motion.button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`group relative flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.name
                    ? 'text-white bg-gradient-to-r from-violet-600/20 via-violet-500/20 to-violet-600/20 border border-violet-500/50 shadow-[inset_0_0_20px_rgba(139,92,246,0.1)]'
                    : 'text-white/70 hover:text-white border border-transparent hover:border-violet-500/20 hover:bg-violet-500/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className={`fa-solid ${category.icon} ${
                  activeCategory === category.name 
                    ? 'text-violet-400' 
                    : 'text-white/50 group-hover:text-violet-400'
                } transition-colors`} />
                <span>{category.name}</span>
                {activeCategory === category.name && (
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-600/10 via-violet-500/10 to-violet-600/10 rounded-xl opacity-50 blur-sm" />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Branding Projects Grid */}
          {activeCategory === 'Branding' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {brandingProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                  onClick={() => {
                    setSelectedProject(project);
                    setIsProjectModalOpen(true);
                  }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-900/20 to-black border border-violet-500/20 transition-all duration-300 hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] cursor-pointer group">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title || ''}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized={true}
                        priority={index === 0}
                        loader={({ src }) => src}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                      
                      {/* Hover overlay with animation */}
                      <motion.div 
                        className="absolute inset-0 bg-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      
                      {/* Floating tag */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-violet-600/80 backdrop-blur-sm rounded-full text-xs font-medium text-white shadow-lg">
                        {project.tags && project.tags.length > 0 ? project.tags[0] : ''}
                      </div>
                      
                      {/* Client badge */}
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-violet-500/30">
                        <span className="text-xs font-bold text-violet-300">{project.client ? project.client.substring(0, 2) : ''}</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold group-hover:text-violet-400 transition-colors">{project.title}</h3>
                        <span className="text-sm text-violet-400 font-medium">{project.year}</span>
                      </div>
                      
                      <p className="text-white/60 mb-4 line-clamp-2">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags && project.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-3 py-1 text-xs rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-violet-400 font-medium">
                          <span>View Details</span>
                          <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                        </div>
                        
                        <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center backdrop-blur-sm border border-violet-500/20">
                          <i className="fa-solid fa-eye text-violet-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Websites Grid */}
          {activeCategory === 'Websites' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {websites.map((website, index) => (
                <motion.div
                  key={website.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                  onMouseEnter={() => setHoveredWebsite(index)}
                  onMouseLeave={() => setHoveredWebsite(null)}
                  onClick={() => {
                    setSelectedProject(website);
                    setIsProjectModalOpen(true);
                  }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-900/20 to-black border border-violet-500/20 transition-all duration-300 hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] cursor-pointer group">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={website.image}
                        alt={website.title || ''}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized={true}
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                      
                      {/* Hover overlay with animation */}
                      <motion.div 
                        className="absolute inset-0 bg-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                        animate={hoveredWebsite === index ? { opacity: 0.2 } : { opacity: 0 }}
                      />
                      
                      {/* Tech badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-violet-600/80 backdrop-blur-sm rounded-full text-xs font-medium text-white shadow-lg">
                        {website.tags && website.tags.length > 0 ? website.tags[0] : ''}
                      </div>
                      
                      {/* Year badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium text-white/80 border border-violet-500/30">
                        {website.year}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-violet-400 transition-colors">{website.title}</h3>
                      <p className="text-white/60 mb-4 line-clamp-2">{website.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {website.tags && website.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 text-xs rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-violet-400 font-medium">
                          <span>View Details</span>
                          <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                        </div>
                        
                        {website.link && (
                          <Link href={website.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center backdrop-blur-sm border border-violet-500/20 hover:bg-violet-500/30 transition-colors">
                            <i className="fa-solid fa-external-link text-violet-300"></i>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Regular Projects Grid */}
          {activeCategory !== 'Websites' && activeCategory !== 'Branding' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-[#111] border border-white/10 hover:border-violet-500/30 transition-all duration-300 cursor-pointer group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                    <Image
                      src={image.src}
                      alt={image.alt || ''}
                      fill
                      priority={index < 4}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized={true}
                    />
                    
                    {/* Category badge - only one badge that appears on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white">{image.category}</span>
                          <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center backdrop-blur-sm border border-violet-500/30">
                            <i className="fa-solid fa-magnifying-glass text-violet-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-x-10 -inset-y-10 bg-gradient-to-r from-violet-600/0 via-violet-600/5 to-violet-600/0 rounded-full blur-xl opacity-50" />
              <Link href="/start-project">
                <button className="relative px-8 py-4 rounded-xl overflow-hidden bg-gradient-to-r from-violet-600 to-violet-700 text-white font-medium group">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Project
                    <i className="fa-solid fa-rocket group-hover:translate-x-1 transition-transform"></i>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-violet-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        src={selectedImage || ''}
        alt=""
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />

      {/* Project Details Modal */}
      <ProjectDetails />
    </main>
  )
} 