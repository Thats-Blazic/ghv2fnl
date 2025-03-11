'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import VideoModal from '@/components/VideoModal'
import Image from 'next/image'

// Definišemo interfejs za video
interface Video {
  id: string;
  title: {
    sr: string;
    en: string;
  };
  description: {
    sr: string;
    en: string;
  };
  author: string;
  duration: string;
  date: string;
  url: string;
  thumbnail: string;
}

// Definišemo interfejs za kategoriju
interface Category {
  id: string;
  title: string;
  videos: Video[];
}

// Mock podaci za kurs
const courseData: Category[] = [
  {
    id: '1',
    title: 'Osnove dizajna',
    videos: [
      {
        id: '1-1',
        title: {
          sr: 'Uvod u dizajn',
          en: 'Introduction to Design'
        },
        description: {
          sr: 'Naučite osnovne principe dizajna i kako ih primeniti u praksi.',
          en: 'Learn the basic principles of design and how to apply them in practice.'
        },
        author: 'Ognjen Blažić',
        duration: '15:30',
        date: '2024-03-20',
        url: 'https://player.vimeo.com/video/1060347769?h=9ce43fac27',
        thumbnail: '/thumbnails/1-1.jpg'
      },
      {
        id: '1-2',
        title: {
          sr: 'Teorija boja',
          en: 'Color Theory'
        },
        description: {
          sr: 'Razumevanje boja, njihovih odnosa i kako ih efektivno koristiti u dizajnu.',
          en: 'Understanding colors, their relationships and how to use them effectively in design.'
        },
        author: 'Ognjen Blažić',
        duration: '22:15',
        date: '2024-03-21',
        url: 'https://player.vimeo.com/video/1060347769?h=9ce43fac27',
        thumbnail: '/thumbnails/1-2.jpg'
      },
      {
        id: '1-3',
        title: {
          sr: 'Tipografija',
          en: 'Typography'
        },
        description: {
          sr: 'Osnove tipografije i kako odabrati prave fontove za vaše projekte.',
          en: 'The basics of typography and how to choose the right fonts for your projects.'
        },
        author: 'Ognjen Blažić',
        duration: '18:45',
        date: '2024-03-22',
        url: 'https://player.vimeo.com/video/1060347769?h=9ce43fac27',
        thumbnail: '/thumbnails/1-3.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Expert Photoshop',
    videos: [
      {
        id: '2-1',
        title: {
          sr: 'Napredne selekcije',
          en: 'Advanced Selections'
        },
        description: {
          sr: 'Savladajte tehnike naprednih selekcija u Photoshopu za profesionalne rezultate.',
          en: 'Master the techniques of advanced selections in Photoshop for professional results.'
        },
        author: 'Ognjen Blažić',
        duration: '25:10',
        date: '2024-03-23',
        url: 'https://player.vimeo.com/video/1060347769?h=9ce43fac27',
        thumbnail: '/thumbnails/2-1.jpg'
      },
      {
        id: '2-2',
        title: {
          sr: 'Rad sa maskama',
          en: 'Working with Masks'
        },
        description: {
          sr: 'Naučite kako da koristite maske za nedestruktivno editovanje.',
          en: 'Learn how to use masks for non-destructive editing.'
        },
        author: 'Ognjen Blažić',
        duration: '28:30',
        date: '2024-03-24',
        url: 'https://player.vimeo.com/video/1060347769?h=9ce43fac27',
        thumbnail: '/thumbnails/2-2.jpg'
      },
      {
        id: '2-3',
        title: {
          sr: 'Blend Modes',
          en: 'Blend Modes'
        },
        description: {
          sr: 'Detaljno objašnjenje blend modova i njihova praktična primena.',
          en: 'Detailed explanation of blend modes and their practical application.'
        },
        author: 'Ognjen Blažić',
        duration: '20:45',
        date: '2024-03-25',
        url: 'https://player.vimeo.com/video/1060347769?h=9ce43fac27',
        thumbnail: '/thumbnails/2-3.jpg'
      }
    ]
  },
  {
    id: '3',
    title: 'Master Photoshop',
    videos: [
      {
        id: '3-1',
        title: {
          sr: 'Kompoziting',
          en: 'Compositing'
        },
        description: {
          sr: 'Kreiranje složenih kompozicija kombinovanjem više fotografija.',
          en: 'Creating complex compositions by combining multiple photographs.'
        },
        author: 'Ognjen Blažić',
        duration: '32:20',
        date: '2024-03-26',
        url: 'https://player.vimeo.com/video/1060347769?h=9ce43fac27',
        thumbnail: '/thumbnails/3-1.jpg'
      },
      {
        id: '3-2',
        title: {
          sr: 'Color Grading',
          en: 'Color Grading'
        },
        description: {
          sr: 'Profesionalne tehnike za korekciju i stilizaciju boja.',
          en: 'Professional techniques for color correction and styling.'
        },
        author: 'Ognjen Blažić',
        duration: '29:15',
        date: '2024-03-27',
        url: 'https://player.vimeo.com/video/1060347769?h=9ce43fac27',
        thumbnail: '/thumbnails/3-2.jpg'
      },
      {
        id: '3-3',
        title: {
          sr: 'Finalni projekat',
          en: 'Final Project'
        },
        description: {
          sr: 'Praktična primena naučenog kroz kompleksan projekat.',
          en: 'Practical application of learned knowledge through a complex project.'
        },
        author: 'Ognjen Blažić',
        duration: '45:00',
        date: '2024-03-28',
        url: 'https://player.vimeo.com/video/1060347769?h=9ce43fac27',
        thumbnail: '/thumbnails/3-3.jpg'
      }
    ]
  }
]

// Funkcija za računanje ukupnog broja videa
const getTotalVideos = (data: Category[]) => {
  return data.reduce((acc, category) => acc + category.videos.length, 0)
}

// Funkcija za računanje procenta završenosti
const calculateProgress = (watched: string[], total: number) => {
  return Math.round((watched.length / total) * 100)
}

// Mapa šifri i imena studenata
const studentMap: { [key: string]: string } = {
  'GF24-KURS-A7X9P': 'Student 1',
  'GF24-KURS-B2M5N': 'Student 2',
  'GF24-KURS-C4K8R': 'Student 3',
  'GF24-KURS-D9W3H': 'Student 4',
  'GF24-KURS-E5Y6T': 'Student 5',
  'GF24-KURS-F8Q2L': 'Student 6',
  'GF24-KURS-G1V4J': 'Student 7',
  'GF24-KURS-H6U9S': 'Student 8',
  'GF24-KURS-I3Z7M': 'Student 9',
  'GF24-KURS-J5X2K': 'Student 10',
  'GF24-KURS-K8N4W': 'Student 11',
  'GF24-KURS-L2P7H': 'Student 12',
  'GF24-KURS-M6R9T': 'Student 13',
  'GF24-KURS-N4S2V': 'Student 14',
  'GF24-KURS-O7Q5B': 'Student 15',
  'GF24-KURS-P1W8M': 'Student 16',
  'GF24-KURS-Q3Y6K': 'Student 17',
  'GF24-KURS-R9T4H': 'Student 18',
  'GF24-KURS-S5V2L': 'Student 19',
  'GF24-KURS-T8X7N': 'Student 20',
  'GF24-KURS-U2Z4P': 'Student 21',
  'GF24-KURS-V6M9W': 'Student 22',
  'GF24-KURS-W4K2S': 'Student 23',
  'GF24-KURS-X7H5R': 'Student 24',
  'GF24-KURS-Y1L8T': 'Student 25',
  'GF24-KURS-Z9B3Q': 'Student 26',
  'GF24-KURS-AA4D6': 'Student 27',
  'GF24-KURS-BB7F2': 'Student 28',
  'GF24-KURS-CC2G5': 'Student 29',
  'GF24-KURS-DD5J8': 'Student 30'
}

// First, define the type for your categories
type Categories = {
  '1': string;
  '2': string;
  '3': string;
}

// Prevodi
const translations = {
  sr: {
    courseTitle: 'Ghost Force Kurs',
    loginTitle: 'Pristup kursu',
    enterPassword: 'Unesite šifru',
    accessCourse: 'Pristupi kursu',
    loginSuccess: 'Uspešna prijava!',
    loginError: 'Pogrešna šifra!',
    tryAgain: 'Molimo proverite vašu šifru i pokušajte ponovo.',
    completed: 'završeno',
    watched: 'Pogledano',
    logout: 'Odjavi se',
    // Pack sekcija
    packTitle: 'Ghost Force GFX Pack',
    packDescription: 'Unapredite svoje dizajnerske veštine sa Ghost Force GFX Pack-om! Ovaj premium paket sadrži:',
    packFeatures: [
      '500+ PNG isečaka visoke rezolucije',
      '20 CC paketa za profesionalnu obradu',
      '50 HD pozadina',
      '150 efekata za kreativno izražavanje',
      '150 tekstura za unapređenje dizajna'
    ],
    downloadPack: 'Preuzmi Pack',
    // Kategorije
    categories: {
      '1': 'Osnove dizajna',
      '2': 'Expert Photoshop',
      '3': 'Master Photoshop'
    }
  },
  en: {
    courseTitle: 'Ghost Force Course',
    loginTitle: 'Course Access',
    enterPassword: 'Enter password',
    accessCourse: 'Access Course',
    loginSuccess: 'Login successful!',
    loginError: 'Wrong password!',
    tryAgain: 'Please check your password and try again.',
    completed: 'completed',
    watched: 'Watched',
    logout: 'Logout',
    // Pack section
    packTitle: 'Ghost Force GFX Pack',
    packDescription: 'Enhance your design skills with Ghost Force GFX Pack! This premium package includes:',
    packFeatures: [
      '500+ High Resolution PNG Elements',
      '20 CC Packs for Professional Editing',
      '50 HD Backgrounds',
      '150 Effects for Creative Expression',
      '150 Textures for Design Enhancement'
    ],
    downloadPack: 'Download Pack',
    // Categories
    categories: {
      '1': 'Design Basics',
      '2': 'Expert Photoshop',
      '3': 'Master Photoshop'
    }
  }
}

export default function CoursePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [watchedVideos, setWatchedVideos] = useState<string[]>([])
  const [currentUser, setCurrentUser] = useState<string>('')
  const [studentName, setStudentName] = useState<string>('')
  const [language, setLanguage] = useState<'sr' | 'en'>('sr')
  const router = useRouter()

  const t = translations[language]

  const validPasswords = [
    'GF24-KURS-A7X9P',
    'GF24-KURS-B2M5N',
    'GF24-KURS-C4K8R',
    'GF24-KURS-D9W3H',
    'GF24-KURS-E5Y6T',
    'GF24-KURS-F8Q2L',
    'GF24-KURS-G1V4J',
    'GF24-KURS-H6U9S',
    'GF24-KURS-I3Z7M',
    'GF24-KURS-J5X2K',
    'GF24-KURS-K8N4W',
    'GF24-KURS-L2P7H',
    'GF24-KURS-M6R9T',
    'GF24-KURS-N4S2V',
    'GF24-KURS-O7Q5B',
    'GF24-KURS-P1W8M',
    'GF24-KURS-Q3Y6K',
    'GF24-KURS-R9T4H',
    'GF24-KURS-S5V2L',
    'GF24-KURS-T8X7N',
    'GF24-KURS-U2Z4P',
    'GF24-KURS-V6M9W',
    'GF24-KURS-W4K2S',
    'GF24-KURS-X7H5R',
    'GF24-KURS-Y1L8T',
    'GF24-KURS-Z9B3Q',
    'GF24-KURS-AA4D6',
    'GF24-KURS-BB7F2',
    'GF24-KURS-CC2G5',
    'GF24-KURS-DD5J8'
  ]

  // Učitaj watchedVideos iz localStorage pri prvom renderovanju
  useEffect(() => {
    if (!currentUser) return
    const saved = localStorage.getItem(`watchedVideos-${currentUser}`)
    if (saved) {
      setWatchedVideos(JSON.parse(saved))
    }
    
    // Učitaj sačuvani jezik
    const savedLanguage = localStorage.getItem('preferred-language')
    if (savedLanguage === 'en' || savedLanguage === 'sr') {
      setLanguage(savedLanguage)
    }
  }, [currentUser])

  // Sačuvaj watchedVideos u localStorage kad se promeni
  useEffect(() => {
    if (!currentUser) return
    localStorage.setItem(`watchedVideos-${currentUser}`, JSON.stringify(watchedVideos))
  }, [watchedVideos, currentUser])

  // Sačuvaj izabrani jezik
  useEffect(() => {
    localStorage.setItem('preferred-language', language)
  }, [language])

  const totalVideos = getTotalVideos(courseData)
  const progress = calculateProgress(watchedVideos, totalVideos)

  const handleVideoComplete = (videoId: string) => {
    if (!watchedVideos.includes(videoId)) {
      setWatchedVideos(prev => [...prev, videoId])
    }
  }

  const handleAuth = () => {
    const upperPassword = password.toUpperCase()
    if (validPasswords.includes(upperPassword)) {
      setIsAuthenticated(true)
      setCurrentUser(upperPassword)
      setStudentName(studentMap[upperPassword])
      toast.success(t.loginSuccess, {
        style: {
          background: '#1A1A1A',
          color: '#fff',
          border: '1px solid rgba(139, 92, 246, 0.2)',
        }
      })
    } else {
      toast.error(
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-lock text-red-400 text-lg"></i>
          <div>
            <p className="font-medium">{t.loginError}</p>
            <p className="text-sm text-white/60">{t.tryAgain}</p>
          </div>
        </div>,
        {
          style: {
            background: '#1A1A1A',
            color: '#fff',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            padding: '16px',
            minWidth: '320px'
          },
          duration: 3000,
          position: 'top-center'
        }
      )
      
      // Vizuelni feedback na input polju
      const input = document.querySelector('input[type="password"]') as HTMLInputElement
      if (input) {
        input.classList.add('animate-shake', 'border-red-500/50')
        setTimeout(() => {
          input.classList.remove('animate-shake', 'border-red-500/50')
        }, 500)
      }
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser('')
    setWatchedVideos([])
    setPassword('')
    setStudentName('')
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(98,0,255,0.15),transparent_50%)]" />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md p-8 rounded-2xl bg-[#0A0A0A] border border-violet-500/20"
          >
            <h1 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-400">
              {t.loginTitle}
            </h1>
            
            <div className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.enterPassword}
                  className="w-full px-4 py-3 rounded-xl bg-[#111] border border-violet-500/20 focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/10"
                  onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                />
              </div>
              
              <button
                onClick={handleAuth}
                className="w-full px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <span>{t.accessCourse}</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(98,0,255,0.15),transparent_50%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col gap-6 mb-12">
          <div className="flex flex-col gap-4 w-full">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-400">
              {t.courseTitle}
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full">
              <div className="flex items-center justify-between w-full bg-white/5 px-4 py-3 rounded-xl border border-violet-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                    <i className="fa-solid fa-user text-violet-400"></i>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{studentName}</span>
                    <span className="text-xs text-white/40 font-mono">{currentUser}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-violet-500/10 transition-all duration-300 flex items-center justify-center group"
                  title={t.logout}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket text-violet-400/60 group-hover:text-violet-400 group-hover:rotate-180 transition-all duration-300"></i>
                </button>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto bg-white/5 px-4 py-3 rounded-xl border border-violet-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                    <i className="fa-solid fa-graduation-cap text-violet-400"></i>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{progress}% {t.completed}</span>
                    <div className="w-32 h-1.5 mt-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-violet-500 to-violet-400 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 ml-auto">
                <button
                  onClick={() => setLanguage('sr')}
                  className={`px-2 py-1 rounded-lg transition-colors ${
                    language === 'sr' 
                      ? 'bg-violet-500/20 text-violet-400' 
                      : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  SR
                </button>
                <div className="w-px h-4 bg-white/10" />
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded-lg transition-colors ${
                    language === 'en' 
                      ? 'bg-violet-500/20 text-violet-400' 
                      : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ghost Force Pack Section */}
        <div className="mb-16 p-6 rounded-2xl bg-white/5 backdrop-blur relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#8B5CF6_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_60%)]"
            style={{ opacity: 0.1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-transparent" />
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3">
              <Image
                src="https://i.ibb.co/bjKXXzwz/pack.png"
                alt="Ghost Force Pack"
                width={500}
                height={500}
                className="rounded-lg w-full relative z-10 hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="w-full md:w-2/3 relative z-10">
              <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-white">
                {t.packTitle}
              </h2>
              <p className="text-white/80 mb-6">
                {t.packDescription}
              </p>
              <ul className="list-disc list-inside text-white/70 mb-6 space-y-2">
                {t.packFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <a 
                href="https://payhip.com/b/ZpCPl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-500 hover:bg-violet-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20"
              >
                <i className="fa-solid fa-download"></i>
                {t.downloadPack}
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {courseData.map((category) => (
            <div key={category.id} className="space-y-6">
              <h2 className="text-2xl font-bold text-white">
                {t.categories[category.id as keyof Categories]}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.videos.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`group relative aspect-video rounded-xl overflow-hidden bg-[#111] border cursor-pointer
                      ${watchedVideos.includes(video.id) 
                        ? 'border-green-500/40 hover:border-green-500/60' 
                        : 'border-violet-500/20 hover:border-violet-500/40'}`}
                    onClick={() => setSelectedVideo(video)}
                  >
                    {watchedVideos.includes(video.id) && (
                      <div className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <i className="fa-solid fa-check text-green-400"></i>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-violet-600/90 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-play text-2xl"></i>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-medium text-lg mb-1">{video.title[language]}</h3>
                      <p className="text-sm text-white/60">{video.duration}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          onComplete={() => handleVideoComplete(selectedVideo.id)}
          isWatched={watchedVideos.includes(selectedVideo.id)}
          language={language}
        />
      )}
    </main>
  )
} 