'use client'

import { motion, useScroll, useSpring, useTransform, MotionValue, useMotionValue, animate } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import CurrentTime from '@/components/CurrentTime'
import Navbar from '@/components/Navbar'
import CountUp from '@/components/CountUp'
import Avatar from '@/components/Avatar'
import ContactForm from '@/components/ContactForm'

const processSteps = [
  {
    stage: 'STAGE 1',
    title: 'FIRST STEPS',
    description: 'Started my journey in design through intensive self-learning and practice. Mastered the fundamentals of Adobe Creative Suite and digital design principles.',
    year: '2021'
  },
  {
    stage: 'STAGE 2',
    title: 'GAMING FOCUS',
    description: 'Specialized in gaming content creation, developing a unique style for thumbnails, banners, and stream assets that capture attention and drive engagement.',
    year: '2022'
  },
  {
    stage: 'STAGE 3',
    title: 'BRAND EXPANSION',
    description: 'Evolved into full brand identity development, creating comprehensive visual systems that help gaming and music brands stand out in their markets.',
    year: '2023'
  },
  {
    stage: 'STAGE 4',
    title: 'STUDIO LAUNCH',
    description: 'Established Ghost Force Studio as a dedicated creative space for gaming and music industry design, offering specialized services to content creators.',
    year: '2024'
  },
  {
    stage: 'STAGE 5',
    title: 'INNOVATION',
    description: 'Continuously pushing boundaries in design, incorporating latest trends and technologies while maintaining our signature bold and impactful style.',
    year: '2025'
  }
]

const TESTIMONIALS = [
  {
    text: "Outstanding results and exceptional service",
    company: "@Nauci Dizajn",
    bgColor: "bg-purple-600"
  },
  {
    text: "Efficient, professional, and dedicated",
    company: "@Jelena Knezevic",
    bgColor: "bg-orange-500"
  },
  {
    text: "Consistently outstanding service!!",
    company: "@Duje Lastre",
    bgColor: "bg-yellow-500"
  },
  {
    text: "Exceeds expectations every time",
    company: "@Ramiz Trtovac",
    bgColor: "bg-green-500"
  },
  {
    text: "Exceptional designs, unmatched quality",
    company: "@Danijel Stojanovski",
    bgColor: "bg-amber-600"
  },
  {
    text: "Consistently delivers excellence!",
    company: "@Aleksa Jovanovic",
    bgColor: "bg-orange-600"
  }
]

// Dodaj FAQ podatke
const faqItems = [
  {
    question: "WHY NOT JUST BUY A LOGO?",
    answer: "A logo is just one piece of your brand puzzle. Effective branding creates a cohesive visual identity that builds trust, recognition, and lasting connections with your audience.",
    icon: (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 bg-gradient-to-br from-violet-600/20 to-violet-600/10 rounded-xl flex items-center justify-center relative group"
      >
        <div className="absolute inset-0 bg-violet-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <i className="fas fa-paint-brush text-xl text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />
      </motion.div>
    )
  },
  {
    question: "WHAT IS THE COST?",
    answer: "Each project is unique and priced according to its specific requirements. We offer flexible packages to accommodate different budgets while maintaining quality.",
    icon: (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 bg-gradient-to-br from-violet-600/20 to-violet-600/10 rounded-xl flex items-center justify-center relative group"
      >
        <div className="absolute inset-0 bg-violet-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <i className="fas fa-coins text-xl text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />
      </motion.div>
    )
  },
  {
    question: "HOW LONG DOES THE PROCESS TAKE?",
    answer: "Most thumbnail designs are completed within 24-48 hours. For more complex projects like channel branding, we typically require 3-5 business days to ensure every detail is perfect.",
    icon: (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 bg-gradient-to-br from-violet-600/20 to-violet-600/10 rounded-xl flex items-center justify-center relative group"
      >
        <div className="absolute inset-0 bg-violet-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <i className="fas fa-clock text-xl text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />
      </motion.div>
    )
  },
  {
    question: "DO YOU OFFER REVISIONS?",
    answer: "Yes! We include up to 3 revision rounds with every project to ensure you're completely satisfied with the final result. Additional revisions can be arranged if needed.",
    icon: (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 bg-gradient-to-br from-violet-600/20 to-violet-600/10 rounded-xl flex items-center justify-center relative group"
      >
        <div className="absolute inset-0 bg-violet-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <i className="fas fa-sync-alt text-xl text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />
      </motion.div>
    )
  }
]

// Dodaj još 3 thumbnailExamples
const thumbnailExamples = [
  {
    id: 1,
    image: "/projects/thumb/a.jpg",
    title: "Najbolji motor za pocetnike",
    author: "Moto Dnevnik",
    views: "2.1M views",
    time: "3 days ago"
  },
  {
    id: 2,
    image: "/projects/thumb/aaaaaa.jpg",
    title: "New Protein Review",
    author: "Vanja",
    views: "50K views",
    time: "1 week ago"
  },
  {
    id: 3,
    image: "/projects/thumb/dentis.jpg",
    title: "10 Stvari bez kojih ne mogu kao stomatolog",
    author: "Kristina Horvat",
    views: "16K views",
    time: "5 days ago"
  },
  {
    id: 4,
    image: "/projects/thumb/ivan-marketing-tajne.jpg",
    title: "Marketing Tajne",
    author: "Ivan Jerkovic",
    views: "500K views",
    time: "2 days ago"
  },
  {
    id: 5,
    image: "/projects/thumb/projekt-menadzer.jpg",
    title: "Projekt Menadzer: KTM,YAMAHA,PEUGEOT",
    author: "ST Moto",
    views: "25K views",
    time: "1 day ago"
  },
  {
    id: 6,
    image: "/projects/thumb/st-moto.jpg",
    title: "Pobednik Klase?",
    author: "ST Moto",
    views: "60K views",
    time: "4 days ago"
  },
  {
    id: 7,
    image: "/projects/thumb/thumb-novi.jpg",
    title: "Kako ne izgubiti klijenta?",
    author: "Petar Adamovic",
    views: "170K views",
    time: "2 days ago"
  },
]

// Dodaj još 3 primera za Gaming Banners
const projectSections = [
  {
    title: "YouTube Thumbnails",
    description: "Eye-catching thumbnails that drive clicks and engagement",
    items: thumbnailExamples
  },
  {
    title: "Gaming Banners",
    description: "Professional banners for esports and gaming content",
    items: [
      {
        id: 101,
        image: "/projects/banners/gaming1.jpg",
        title: "ESL Pro League",
        author: "ESL Gaming",
        views: "100K views",
        time: "2 days ago"
      },
      {
        id: 102,
        image: "/projects/banners/gaming2.jpg",
        title: "Twitch Overlay Pack",
        author: "Pro Streamer",
        views: "45K views",
        time: "1 week ago"
      },
      {
        id: 103,
        image: "/projects/banners/gaming3.jpg",
        title: "Tournament Assets",
        author: "FACEIT",
        views: "80K views",
        time: "3 days ago"
      },
      {
        id: 104,
        image: "/projects/banners/gaming4.jpg",
        title: "CSGO Tournament Banner",
        author: "FACEIT Pro",
        views: "95K views",
        time: "1 day ago"
      },
      {
        id: 105,
        image: "/projects/banners/gaming5.jpg",
        title: "Valorant Championship",
        author: "Riot Games",
        views: "150K views",
        time: "2 days ago"
      },
      {
        id: 106,
        image: "/projects/banners/gaming6.jpg",
        title: "Fortnite Event",
        author: "Epic Games",
        views: "200K views",
        time: "3 days ago"
      }
    ]
  },
  {
    title: "Music & Events",
    description: "Vibrant banners for festivals and music events",
    items: [
      {
        id: 201,
        image: "/projects/banners/music1.jpg",
        title: "Summer Festival",
        author: "Event Pro",
        views: "60K views",
        time: "5 days ago"
      },
      {
        id: 202,
        image: "/projects/banners/music2.jpg",
        title: "DJ Set Promo",
        author: "Club Events",
        views: "35K views",
        time: "1 day ago"
      },
      {
        id: 203,
        image: "/projects/banners/music3.jpg",
        title: "Concert Banner",
        author: "Live Music",
        views: "90K views",
        time: "4 days ago"
      },
      {
        id: 204,
        image: "/projects/banners/music4.jpg",
        title: "EDM Festival",
        author: "Music Events",
        views: "75K views",
        time: "2 days ago"
      },
      {
        id: 205,
        image: "/projects/banners/music5.jpg",
        title: "Rock Concert Series",
        author: "Live Nation",
        views: "120K views",
        time: "4 days ago"
      },
      {
        id: 206,
        image: "/projects/banners/music6.jpg",
        title: "Jazz Night",
        author: "Blue Note",
        views: "45K views",
        time: "1 week ago"
      }
    ]
  },
  {
    title: "Stream Assets",
    description: "Professional streaming overlays and scenes",
    items: [
      {
        id: 301,
        image: "/projects/stream/overlay1.jpg",
        title: "Stream Package",
        author: "Twitch Partner",
        views: "40K views",
        time: "2 days ago"
      },
      {
        id: 302,
        image: "/projects/stream/overlay2.jpg",
        title: "Starting Soon",
        author: "YouTube Gaming",
        views: "25K views",
        time: "1 week ago"
      },
      {
        id: 303,
        image: "/projects/stream/overlay3.jpg",
        title: "Stream Scenes",
        author: "Pro Streamer",
        views: "70K views",
        time: "3 days ago"
      }
    ]
  }
]

const stats = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    value: "5+",
    label: "Years Experience"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    value: "500+",
    label: "Happy Clients"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    value: "1500+",
    label: "Projects Done"
  }
]

const products = [
  {
    title: "Moras Biti Bogat",
    link: "#",
    thumbnail: "/projects/thumb/peki.jpg"
  },
  {
    title: "Oranje Smrznute Ilovace",
    link: "#",
    thumbnail: "/projects/thumb/b6626d215597007-676f408e42ec5.jpg"
  },
  {
    title: "Unlocking telegram Growth",
    link: "#",
    thumbnail: "/projects/thumb/2.jpg"
  },
  {
    title: "Nasi Fakulteti",
    link: "#",
    thumbnail: "/projects/thumb/1.jpg"
  },
  {
    title: "Popij ili Odgovori",
    link: "#",
    thumbnail: "/projects/thumb/st-moto.jpg"
  },
  {
    title: "Najbolji motor za pocetnike",
    link: "#",
    thumbnail: "/projects/thumb/a.jpg"
  },
  {
    title: "New Protein Review",
    link: "#",
    thumbnail: "/projects/thumb/aaaaaa.jpg"
  },
  {
    title: "10 stvari bez kojih ne mogu kao",
    link: "#",
    thumbnail: "/projects/thumb/dentis.jpg"
  },
  {
    title: "NAJBOLJI BALKANSKI YASUO",
    link: "#",
    thumbnail: "/projects/thumb/krtoni.jpg"
  },
  {
    title: "KURVA",
    link: "#",
    thumbnail: "/projects/thumb/dentis.jpg"
  },
]

const AnimatedCounter = ({ value }: { value: string }) => {
  const numericValue = parseInt(value.replace(/\D/g, ''));
  
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-3xl sm:text-4xl md:text-5xl font-bold"
    >
      <CountUp end={numericValue} duration={2} />
      {value.includes('+') && '+'}
    </motion.span>
  );
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState<number | null>(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [hasScrolled, setHasScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  })
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 500,
    damping: 50,
    restDelta: 0.001,
    mass: 0.1
  })

  const ref = useRef(null);
  const { scrollYProgress: scrollYProgressRef } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgressRef, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgressRef, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgressRef, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgressRef, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgressRef, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgressRef, [0, 0.2], [-700, 500]),
    springConfig
  );

  // Kreiramo motionValue za animaciju kada nema skrola
  const noScrollProgress = useMotionValue(0);

  // Podeli proizvode u redove
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const jumpToStep = (index: number) => {
    const step = timelineRef.current?.querySelector(`[data-step="${index}"]`)
    if (step) {
      step.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setActiveStep(index)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = Number(entry.target.getAttribute('data-step'))
            setActiveStep(stepIndex)
          }
        })
      },
      {
        root: null,
        rootMargin: '-20% 0px',
        threshold: 0.5
      }
    )

    const steps = timelineRef.current?.querySelectorAll('.timeline-step')
    steps?.forEach((step) => observer.observe(step))

    return () => observer.disconnect()
  }, [])

  // Dodajemo ref za praćenje animacije
  const animationRef = useRef<any>(null);

  // Pokrećemo animaciju odmah nakon mountovanja
  useEffect(() => {
    // Inicijalno pokretanje animacije
    const startAnimation = () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
      
      animationRef.current = animate(noScrollProgress, 1, {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
        onComplete: () => {
          noScrollProgress.set(0);
          startAnimation();
        }
      });
    };

    // Odmah pokrećemo animaciju
    startAnimation();

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, []); // Prazan dependency array znači da se pokreće samo jednom pri mountovanju

  // Postojeći scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
        if (animationRef.current) {
          animationRef.current.stop();
        }
      } else {
        setHasScrolled(false);
        // Ponovo pokrećemo animaciju kad se vratimo na vrh
        if (!animationRef.current?.isRunning) {
          const startAnimation = () => {
            animationRef.current = animate(noScrollProgress, 1, {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
              onComplete: () => {
                noScrollProgress.set(0);
                startAnimation();
              }
            });
          };
          startAnimation();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Parallax Section */}
      <div
        ref={ref}
        className="hidden md:flex h-[300vh] py-20 overflow-hidden antialiased relative flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
      >
        <div className="max-w-7xl relative mx-auto py-10 md:py-20 px-4 w-full">
          <div className="relative z-10 max-w-5xl mx-auto text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 md:space-y-8"
            >
              <h2 className="text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-[1] tracking-tight">
                Our Latest <br className="hidden sm:block" /> 
                <span className="text-violet-400">Projects</span>
              </h2>
              
              <p className="max-w-2xl mx-auto md:mx-0 text-lg sm:text-xl md:text-2xl text-white/60 leading-relaxed">
                Check out some of our recent work that showcases our expertise in creating
                engaging visual content for gaming and music industry.
              </p>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 max-w-3xl mx-auto md:mx-0">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex flex-col items-center text-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="mb-2 p-2 bg-violet-500/10 rounded-lg"
                    >
                      {stat.icon}
                    </motion.div>
                    <div className="text-violet-400">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-white/60 font-medium mt-1">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="hidden md:flex items-center gap-2 text-white/40 mt-8"
              >
                <div className="w-8 h-[1px] bg-white/20" />
                <span className="text-sm font-medium">SCROLL TO EXPLORE</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Parallax Content */}
        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
          }}
        >
          <motion.div 
            className="flex flex-row-reverse gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8"
            animate={!hasScrolled ? {
              x: [0, -1000],
            } : undefined}
            transition={!hasScrolled ? {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            } : undefined}
          >
            {firstRow.map((product) => (
              <ProductCard
                product={product}
                translate={hasScrolled ? translateX : translateX}
                key={product.title}
              />
            ))}
          </motion.div>

          <motion.div 
            className="flex flex-row gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8"
            animate={!hasScrolled ? {
              x: [0, 1000],
            } : undefined}
            transition={!hasScrolled ? {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            } : undefined}
          >
            {secondRow.map((product) => (
              <ProductCard
                product={product}
                translate={hasScrolled ? translateXReverse : translateXReverse}
                key={product.title}
              />
            ))}
          </motion.div>

          <motion.div 
            className="flex flex-row-reverse gap-4 sm:gap-6 md:gap-8"
            animate={!hasScrolled ? {
              x: [0, -1000],
            } : undefined}
            transition={!hasScrolled ? {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            } : undefined}
          >
            {thirdRow.map((product) => (
              <ProductCard
                product={product}
                translate={hasScrolled ? translateX : translateX}
                key={product.title}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Hero Section */}
      <div className="md:hidden py-20 px-4 w-full">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-[1] tracking-tight">
              Our Latest <br />
              <span className="text-violet-400">Projects</span>
            </h2>
            
            <p className="max-w-2xl mx-auto text-lg text-white/60 leading-relaxed">
              Check out some of our recent work that showcases our expertise in creating
              engaging visual content for gaming and music industry.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="mb-2 p-2 bg-violet-500/10 rounded-lg"
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-violet-400">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <p className="text-xs text-white/60 font-medium mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Process Timeline */}
      <section className="py-32 relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(98,0,255,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          {/* Animated gradient orbs */}
          <div className="absolute top-20 -left-4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
          <div className="absolute top-20 -right-4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.span 
              className="inline-block px-4 py-1.5 bg-violet-600/10 rounded-full text-violet-400 text-sm font-medium mb-6 border border-violet-500/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <i className="fas fa-history mr-2" />
              OUR JOURNEY
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-400 to-white"
            >
              The Evolution of Our Studio
            </motion.h2>
          </div>

          <div className="relative" ref={timelineRef}>
            {/* Background Line with Gradient */}
            <div className="absolute left-[28px] lg:left-1/2 h-full w-[3px] bg-gradient-to-b from-violet-600/0 via-violet-600/50 to-violet-600/0 -translate-x-1/2 blur-sm hidden md:block" />
            <div className="absolute left-[28px] lg:left-1/2 h-full w-[1px] bg-violet-600/20 -translate-x-1/2" />

            {/* Animated Progress Line */}
            <motion.div
              className="absolute left-[28px] lg:left-1/2 w-[2px] bg-gradient-to-b from-violet-400 to-violet-600 origin-top -translate-x-1/2"
              style={{
                height: '100%',
                scaleY: scaleY
              }}
            />

            {/* Timeline Steps */}
            {processSteps.map((step, index) => (
              <motion.div
                key={step.stage}
                data-step={index}
                className="timeline-step relative mb-16 md:mb-24 last:mb-0 group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.3,
                    delay: Math.min(0.05, index * 0.02) // Reduced delay for mobile devices
                  }
                }}
                viewport={{ once: true, margin: "30px" }}
              >
                {/* Enhanced Circle on Timeline - simplified for mobile */}
                <div
                  className={`absolute left-[28px] lg:left-1/2 -translate-x-1/2 w-[14px] h-[14px] md:w-[20px] md:h-[20px] rounded-full transition-all duration-200
                    ${activeStep === index 
                      ? 'scale-110 md:scale-125 shadow-md md:shadow-lg shadow-violet-600/30 md:shadow-violet-600/50'
                      : 'group-hover:scale-105 md:group-hover:scale-110'
                    }`}
                  style={{ 
                    zIndex: 2,
                    background: activeStep === index 
                      ? 'linear-gradient(45deg, #7c3aed, #a855f7)'
                      : 'linear-gradient(45deg, rgba(124, 58, 237, 0.3), rgba(168, 85, 247, 0.3))',
                    border: '2px solid rgba(124, 58, 237, 0.5)'
                  }}
                >
                  <div className={`absolute inset-0 rounded-full bg-violet-600/50 blur-md transition-opacity duration-300 hidden md:block
                    ${activeStep === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
                </div>

                <div className={`grid lg:grid-cols-2 gap-4 md:gap-8 ${
                  index % 2 === 0 ? 'lg:pr-24' : 'lg:pl-24'
                }`}>
                  <div className={index % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-2'}>
                    <div
                      className="ml-16 lg:ml-0 p-4 md:p-8 rounded-2xl transition-all duration-300"
                      style={{
                        background: activeStep === index 
                          ? 'rgba(124, 58, 237, 0.1)'
                          : 'rgba(124, 58, 237, 0.05)',
                        border: `1px solid ${activeStep === index 
                          ? 'rgba(124, 58, 237, 0.2)'
                          : 'rgba(124, 58, 237, 0.1)'}`
                      }}
                    >
                      <span 
                        className={`inline-block px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-2 md:mb-4
                          ${activeStep === index 
                            ? 'bg-violet-600/20 text-violet-400' 
                            : 'bg-violet-600/10 text-violet-400/70'}`}
                      >
                        {step.stage}
                      </span>
                      
                      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                        <h3 className={`text-lg md:text-3xl font-bold transition-colors duration-300
                          ${activeStep === index ? 'text-white' : 'text-white/50'}`}
                        >
                          {step.title}
                        </h3>
                      </div>
                      
                      <p className={`text-sm md:text-base transition-colors duration-300
                        ${activeStep === index ? 'text-white/80' : 'text-white/40'}`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Examples Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(98,0,255,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          {/* Animated gradient orbs */}
          <div className="absolute top-20 -left-4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
          <div className="absolute top-20 -right-4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />
        </div>

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <motion.span 
              className="inline-block px-4 py-1.5 bg-violet-600/10 rounded-full text-violet-400 text-sm font-medium mb-6 border border-violet-500/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <i className="fas fa-play-circle mr-2" />
              FEATURED WORK
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-400 to-white"
            >
              YouTube Thumbnails That Convert
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-white/60 max-w-2xl"
            >
              We create eye-catching thumbnails that drive clicks and boost your channel's growth.
            </motion.p>
          </div>

          {/* Enhanced Thumbnails Slider */}
          <div className="relative w-full overflow-hidden py-8">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
            
            <motion.div 
              className="flex gap-6 px-4"
              animate={{ 
                x: [0, -1750]
              }}
              transition={{
                x: {
                  duration: 50,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              {thumbnailExamples.map((example, index) => (
                <motion.div
                  key={`first-${example.id}`}
                  className="flex-none w-[350px] group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Enhanced Thumbnail Container */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-[#111] border border-violet-500/10 group-hover:border-violet-500/20 transition-all duration-500">
                    <Image
                      src={example.image}
                      alt={example.title}
                      fill
                      className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                      unoptimized={true}
                      loader={({ src }) => src}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-3 right-3 px-2.5 py-1.5 bg-violet-600/90 backdrop-blur-sm rounded-lg text-xs font-medium flex items-center gap-1.5">
                      <i className="fas fa-play text-[10px]" />
                      THUMBNAIL
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium text-white/90 text-lg line-clamp-2 leading-tight mb-2 group-hover:text-white transition-colors duration-300">
                      {example.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-violet-400 font-medium">
                      {example.author}
                    </p>
                      <div className="h-1 w-1 rounded-full bg-white/20" />
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <span>{example.views}</span>
                      <span>•</span>
                      <span>{example.time}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Duplicated set for seamless loop */}
              {thumbnailExamples.map((example, index) => (
                <motion.div
                  key={`second-${example.id}`}
                  className="flex-none w-[350px] group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index + thumbnailExamples.length) * 0.1 }}
                >
                  {/* Enhanced Thumbnail Container */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-[#111] border border-violet-500/10 group-hover:border-violet-500/20 transition-all duration-500">
                    <Image
                      src={example.image}
                      alt={example.title}
                      fill
                      className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                      unoptimized={true}
                      loader={({ src }) => src}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-3 right-3 px-2.5 py-1.5 bg-violet-600/90 backdrop-blur-sm rounded-lg text-xs font-medium flex items-center gap-1.5">
                      <i className="fas fa-play text-[10px]" />
                      THUMBNAIL
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium text-white/90 text-lg line-clamp-2 leading-tight mb-2 group-hover:text-white transition-colors duration-300">
                      {example.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-violet-400 font-medium">
                      {example.author}
                    </p>
                      <div className="h-1 w-1 rounded-full bg-white/20" />
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <span>{example.views}</span>
                      <span>•</span>
                      <span>{example.time}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Button */}
      <div className="relative z-10 flex justify-center pb-20 -mt-4">
        <Link
          href="https://www.behance.net/ghostforcestudio"
          className="group inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105"
        >
          View All Projects
          <motion.span
            className="inline-block"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </Link>
      </div>

      {/* Client Experience Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(98,0,255,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          
          {/* Floating orbs */}
          <div className="absolute top-20 -left-4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
          <div className="absolute top-20 -right-4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />
          
          {/* Animated lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent w-full"
                style={{ top: `${20 * i}%` }}
                animate={{
                  x: ["-100%", "100%"],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-violet-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [0, -20]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Glowing circles */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 bg-violet-500/10 rounded-full"
                style={{
                  left: `${25 + i * 25}%`,
                  top: `${30 + (i % 2) * 40}%`
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.span 
              className="inline-block px-4 py-1.5 bg-violet-600/10 rounded-full text-violet-400 text-sm font-medium mb-6 border border-violet-500/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <i className="fas fa-star mr-2" />
              CLIENT TESTIMONIALS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-400 to-white"
            >
              What Our Clients Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-white/60 max-w-2xl mx-auto"
            >
              Join hundreds of satisfied clients who trust us with their creative needs
            </motion.p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative p-8 rounded-2xl bg-gradient-to-b from-violet-600/5 to-violet-600/[0.02] border border-violet-500/10 backdrop-blur-sm"
              >
                {/* Hover Effects */}
                <div className="absolute inset-0 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-b from-violet-600/20 to-violet-600/0 rounded-2xl" />
                  <div className="absolute inset-0 bg-violet-600/20 blur-2xl scale-150 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="relative space-y-6">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 rounded-xl bg-violet-600/10 flex items-center justify-center mb-6">
                    <i className="fas fa-quote-right text-violet-400 text-xl" />
                  </div>

                  {/* Testimonial Text */}
                  <motion.p 
                    className="text-lg text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300"
                  >
                    {testimonial.text}
                  </motion.p>

                  {/* Client Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-violet-500/10">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative w-12 h-12 ${testimonial.bgColor} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                    >
                      <div className="absolute inset-0 rounded-xl bg-white/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative z-10">{testimonial.company.charAt(1).toUpperCase()}</span>
                    </motion.div>

                    <div>
                      <p className="text-violet-400 font-medium group-hover:text-violet-300 transition-colors duration-300">
                        {testimonial.company}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-white/40 text-sm">Verified Client</span>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <i key={star} className="fas fa-star text-yellow-500 text-xs" />
                          ))}
                    </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-16"
          >
            <Link
              href="/start-project"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105"
            >
              Start Your Project
            <motion.span 
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          {/* Main radial gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(98,0,255,0.2),transparent_70%)]" />
          
          {/* Dark overlay with texture */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/95 to-black/90" />
          
          {/* Grid pattern with mask */}
          <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent)]" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-0 -left-4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000" />
          
          {/* Animated lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent w-full"
                style={{ top: `${20 + i * 30}%` }}
                animate={{
                  x: ["-100%", "100%"],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          {/* Glowing dots */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-violet-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [0, -20]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Glowing circles */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-64 h-64 bg-violet-500/5 rounded-full"
                style={{
                  left: `${25 + i * 25}%`,
                  top: `${30 + (i % 2) * 40}%`
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-violet-600/10 border border-violet-500/20 backdrop-blur-sm mb-4 text-violet-400"
            >
              <i className="fas fa-question-circle mr-2" /> FREQUENTLY ASKED
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-400 to-white"
            >
              Common Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-white/60 max-w-2xl mx-auto"
            >
              Everything you need to know about our design process and services
            </motion.p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {/* Glass effect background */}
                <div className="absolute inset-0 bg-violet-600/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 bg-black/40 border border-violet-500/10 hover:border-violet-500/20 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:bg-violet-600/10 relative"
                >
                    <div className="flex items-center gap-4">
                        {item.icon}
                    <span className="text-lg font-medium text-white/90 group-hover:text-violet-300 transition-colors duration-300">{item.question}</span>
                      </div>
                  <motion.div 
                    className={`w-10 h-10 rounded-xl border border-violet-500/20 flex items-center justify-center shrink-0 transition-all duration-500 ${openFaq === index ? 'bg-violet-600/20 rotate-180' : ''}`}
                  >
                    <i className={`fas fa-chevron-down text-violet-400 transition-transform duration-500`} />
                  </motion.div>
                </button>
                  <motion.div
                    initial={false}
                    animate={{ 
                    height: openFaq === index ? "auto" : 0,
                      opacity: openFaq === index ? 1 : 0,
                    scale: openFaq === index ? 1 : 0.98,
                  }}
                  transition={{
                    height: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] },
                    opacity: { duration: 0.5, ease: "easeInOut" },
                    scale: { duration: 0.5, ease: "easeOut" }
                  }}
                  className="overflow-hidden origin-top"
                >
                  <div className="p-6 bg-black/40 border-x border-b border-violet-500/10 rounded-b-2xl backdrop-blur-sm">
                    <motion.p 
                      initial={false}
                      animate={{
                        opacity: openFaq === index ? 1 : 0,
                        y: openFaq === index ? 0 : 10
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="text-white/70 leading-relaxed"
                    >
                      {item.answer}
                    </motion.p>
                  </div>
                  </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

// Dodaj ProductCard komponentu:
const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-[150px] sm:h-[250px] md:h-[400px] w-[200px] sm:w-[350px] md:w-[600px] relative flex-shrink-0 max-w-[90vw]"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        <Image
          src={product.thumbnail}
          height="800"
          width="1200"
          className="object-cover absolute h-full w-full inset-0 rounded-lg sm:rounded-xl"
          alt={product.title}
          priority
          unoptimized={true}
          loader={({ src }) => src}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-lg sm:rounded-xl" />
      <h2 className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 opacity-0 group-hover/product:opacity-100 text-white text-sm sm:text-lg md:text-2xl font-bold">
        {product.title}
      </h2>
    </motion.div>
  );
}; 