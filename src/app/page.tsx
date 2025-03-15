'use client'

import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import { useState } from 'react'
import ImageModal from '@/components/ImageModal'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import emailjs from '@emailjs/browser'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ContactForm from '@/components/ContactForm'
import CountUp from '@/components/CountUp'
import { HeroHighlight, Highlight } from "@/components/HeroHighlight"
import Link from 'next/link'

const stats = [
  {
    value: "5+",
    label: "Years Experience"
  },
  {
    value: "500+",
    label: "Happy Clients"
  },
  {
    value: "1500+",
    label: "Projects Done"
  }
]

const partners = [
  { name: 'Merkur', logo: '/partner/merkur.svg' },
  { name: 'Testorize', logo: '/partner/testorize-logo.svg' },
  { name: 'Venom', logo: '/partner/venom.svg' },
  { name: 'File7', logo: '/partner/file7.svg' },
  { name: 'Partner3', logo: '/partner/partner3.svg' },
  { name: 'Partner2', logo: '/partner/parner2.svg' },
]

const skills = [
  {
    name: "Adobe Photoshop",
    icon: "fa-wand-magic-sparkles",
    description: "Professional photo manipulation and graphic design",
    color: "from-blue-400 to-blue-600"
  },
  {
    name: "Figma",
    icon: "fa-pen-ruler",
    description: "Modern UI/UX design and prototyping",
    color: "from-purple-400 to-purple-600"
  },
  {
    name: "Adobe Illustrator",
    icon: "fa-bezier-curve",
    description: "Vector graphics and brand identity design",
    color: "from-orange-400 to-orange-600"
  },
  {
    name: "Web Development",
    icon: "fa-code",
    description: "Frontend development with modern technologies",
    color: "from-green-400 to-green-600"
  },
  {
    name: "UI/UX Design",
    icon: "fa-layer-group",
    description: "User-centered design and experience",
    color: "from-pink-400 to-pink-600"
  },
  {
    name: "Video Editing",
    icon: "fa-film",
    description: "Professional video editing and motion graphics",
    color: "from-red-400 to-red-600"
  }
]

export default function ProjectsPage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(98,0,255,0.15),transparent_50%)]" />
          
          {/* Animated Lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-[1px] w-[100%] left-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent"
                style={{ top: `${30 + i * 20}%` }}
                animate={{
                  x: ["-10%", "10%"],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            ))}
          </div>

          {/* Floating Orbs */}
          <motion.div
            animate={{
              y: [-20, 20],
              opacity: [0.3, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="absolute top-1/4 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-violet-600/20 rounded-full blur-[120px]"
          />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Text Content */}
          <div className="space-y-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block w-full"
            >
              <span className="relative inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-violet-500/0 border border-violet-500/20">
                <span className="text-sm font-medium text-violet-400 tracking-wider uppercase">
                  Welcome to Ghost Force Studio
                </span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative w-full"
            >
              <motion.div
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -inset-x-4 sm:-inset-x-8 -inset-y-4 bg-gradient-to-r from-violet-600/20 to-transparent blur-2xl"
              />
              <h1 className="relative text-4xl sm:text-6xl md:text-7xl font-bold leading-tight px-2">
                Let's Make{' '}
                <motion.div
                  className="relative inline-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <motion.div
                    className="absolute -inset-2 bg-violet-600/20 rounded-lg blur-2xl"
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.span
                    className="relative z-10 block"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundImage: "linear-gradient(90deg, #a78bfa, #8b5cf6, #7c3aed, #8b5cf6, #a78bfa)"
                    }}
                  >
                    Your Brand Remarkable
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent"
                    animate={{
                      x: ['-200%', '200%']
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto px-2"
            >
              We create stunning visuals that capture attention and drive engagement.
              From thumbnails to brand identity, we've got you covered.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex justify-center px-2"
            >
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-6 sm:px-8 py-4 rounded-xl overflow-hidden bg-violet-600 text-white font-medium"
                >
                  <div className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-violet-600 via-violet-500 to-violet-600 bg-[length:200%_100%] group-hover:bg-[position:100%_0] animate-shimmer" />
                  <div className="relative flex items-center justify-center gap-2">
                    View Our Work
                    <span className="group-hover:translate-x-1 transition-transform">
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </div>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners/Brands Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-violet-400 font-medium tracking-wide uppercase mb-3">
              TRUSTED BY INDUSTRY LEADERS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Partnering with Amazing Brands
            </h2>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {[
              { name: 'Merkur', logo: '/partner/merkur.svg' },
              { name: 'Testorize', logo: '/partner/testorize-logo.svg' },
              { name: 'Venom', logo: '/partner/venom.svg' },
              { name: 'File7', logo: '/partner/file7.svg' },
              { name: 'Partner3', logo: '/partner/partner3.svg' },
              { name: 'Partner2', logo: '/partner/parner2.svg' }
            ].map((brand, index) => (
              <div
                key={brand.name}
                className="group relative bg-[#0A0A0A] rounded-lg p-6 border border-white/5 hover:border-violet-500/20 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="relative aspect-[3/1]">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain [filter:brightness(0)_invert(1)] mix-blend-normal opacity-100 group-hover:opacity-70 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Impact Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/logotip.jpg"
                  alt="Creative Process"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-transparent mix-blend-multiply" />
              </div>
              
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -right-8 -bottom-8 bg-black/90 backdrop-blur-xl border border-violet-500/20 rounded-xl p-6 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center">
                    <i className="fa-solid fa-star text-2xl text-violet-400"></i>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">6+ Years</div>
                    <div className="text-white/60 text-sm">Professional Experience</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-violet-400 font-medium tracking-wide uppercase">
                  Our Expertise
                </span>
                <h2 className="text-4xl md:text-5xl font-bold">
                  Mastering Digital{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-600">
                    Creativity
                  </span>
                </h2>
                <p className="text-lg text-white/60 max-w-xl">
                  From concept to execution, we bring your vision to life with cutting-edge tools and technologies.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {skills.slice(0, 4).map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-colors"
                  >
                    <div className="relative z-10">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${skill.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <i className={`fa-solid ${skill.icon} text-lg text-white`}></i>
                      </div>
                      <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-violet-400 transition-colors">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-white/60 group-hover:text-white/70 transition-colors">
                        {skill.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[400px] mx-auto sm:mx-0 sm:w-auto px-4 sm:px-0">
                <Link href="/projects" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto group relative px-8 py-4 rounded-xl overflow-hidden bg-violet-600 text-white font-medium">
                    <div className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-violet-600 via-violet-500 to-violet-600 bg-[length:200%_100%] group-hover:bg-[position:100%_0] animate-shimmer" />
                    <div className="relative flex items-center justify-center gap-2">
                      View Our Work
                      <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </button>
                </Link>
                <Link href="/start-project" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto group relative px-8 py-4 rounded-xl overflow-hidden border border-violet-500/20 font-medium hover:bg-violet-500/10 transition-colors">
                    <span className="relative text-white/80 group-hover:text-white transition-colors flex items-center justify-center gap-2">
                      Start a Project
                      <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </span>
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mentorship Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Enhanced Background with larger grid and better blending */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/10 to-black" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.015)_2px,transparent_2px)] bg-[size:48px_48px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(98,0,255,0.05),transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-violet-400 font-medium tracking-wide uppercase">
                  JOIN OUR COMMUNITY
                </span>
                <h2 className="text-4xl md:text-5xl font-bold">
                  Level Up Your Design Skills with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-600">
                    Expert Mentorship
                  </span>
                </h2>
                <p className="text-lg text-white/60 max-w-xl">
                  Get personalized guidance, real-world projects, and insider tips from industry experts. 
                  Transform your creative journey with our comprehensive mentorship program.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/mentorship" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-all hover:scale-[1.02] active:scale-[0.98]">
                    <span className="flex items-center justify-center gap-2">
                      Explore Mentorship Plans
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </button>
                </Link>
                <button
                  onClick={() => {
                    const footer = document.getElementById('footer')
                    if (footer) {
                      footer.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-black/40 backdrop-blur-sm border border-violet-500/20 text-white/80 font-medium hover:bg-black/60 hover:border-violet-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Contact for Details
                </button>
              </div>
            </div>

            {/* Right Column - Features Grid */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/10 to-transparent blur-3xl -z-10" />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-black/40 backdrop-blur-sm border border-violet-500/10 rounded-xl p-6 hover:border-violet-500/30 transition-all hover:scale-[1.02] hover:bg-black/50">
                    <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4">
                      <i className="fa-solid fa-graduation-cap text-2xl text-violet-400"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
                    <p className="text-white/60">Custom-tailored guidance for your unique creative journey</p>
                  </div>
                  <div className="bg-black/40 backdrop-blur-sm border border-violet-500/10 rounded-xl p-6 hover:border-violet-500/30 transition-all hover:scale-[1.02] hover:bg-black/50">
                    <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4">
                      <i className="fa-solid fa-users text-2xl text-violet-400"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Community Access</h3>
                    <p className="text-white/60">Join a network of passionate designers and creators</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-black/40 backdrop-blur-sm border border-violet-500/10 rounded-xl p-6 hover:border-violet-500/30 transition-all hover:scale-[1.02] hover:bg-black/50">
                    <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4">
                      <i className="fa-solid fa-laptop-code text-2xl text-violet-400"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Real Projects</h3>
                    <p className="text-white/60">Work on actual client projects with expert guidance</p>
                  </div>
                  <div className="bg-black/40 backdrop-blur-sm border border-violet-500/10 rounded-xl p-6 hover:border-violet-500/30 transition-all hover:scale-[1.02] hover:bg-black/50">
                    <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4">
                      <i className="fa-solid fa-certificate text-2xl text-violet-400"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Certification</h3>
                    <p className="text-white/60">Earn recognition for your accomplished skills</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 