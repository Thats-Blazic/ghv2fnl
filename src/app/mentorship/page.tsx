'use client'

import dynamic from 'next/dynamic'
import { motion, LazyMotion, domAnimation } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Spotlight } from '@/components/ui/spotlight-new'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { mentors } from './constants'
import { useInView } from 'framer-motion'
import TeamMemberCard from '@/components/TeamMemberCard'

// Dinamički import težih komponenti
const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => <div className="animate-pulse bg-violet-600/10 rounded-xl h-[400px]" />
})

const Boxes = dynamic(() => import('@/components/ui/background-boxes').then(mod => mod.Boxes), {
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-transparent" />,
  ssr: false // Isključujemo SSR za kompleksnu animaciju
})

const teamMembers = [
  {
    name: "Ognjen Blažić",
    role: "Design Lead & Founder",
    experience: "6+ years in Design",
    image: "/projects/ognjen.jpg",
    description: "Specialized in branding and Graphic  Design with over 500 successful projects.",
    gradient: "from-violet-500 to-fuchsia-500",
    social: {
      whatsapp: "https://wa.me/+381628169744",
      linkedin: "https://www.linkedin.com/in/ognjenblazic/"
    }
  },
  {
    name: "Jason Kaiser",
    role: "Designer & Web Developer",
    experience: "6+ years in Development",
    image: "/projects/radisic.jpg",
    description: "Expert in Graphic Design and Web Development.",
    gradient: "from-blue-500 to-violet-500",
    social: {
      whatsapp: "https://wa.me/+38765052080",
      linkedin: "https://www.linkedin.com/in/jason-kaiser-1922022b8/"
    }
  },
  {
    name: "Petar Adamović",
    role: "Video Editor",
    experience: "3+ years in Motion",
    image: "/projects/peki.jpg",
    description: "Proffesional video editor with over 300 successful projects.",
    gradient: "from-pink-500 to-rose-500",
    social: {
      whatsapp: "https://wa.me/+381644317010",
      linkedin: "/"
    }
  }
];

const mentorshipPlans = [
  {
    title: "Basic Mentorship",
    originalPrice: "99",
    price: "65",
    duration: "1 Month",
    features: [
      "1-on-1 Weekly Sessions",
      "Portfolio Review",
      "Basic Design Principles",
      "Software Training",
      "Email Support"
    ],
    recommended: false,
    discount: true,
    theme: "green"
  },
  {
    title: "Pro Mentorship",
    price: "249",
    duration: "3 Months",
    features: [
      "2 Weekly Sessions",
      "Advanced Portfolio Development",
      "Real Project Experience",
      "Industry Best Practices",
      "24/7 Support",
      "Job Preparation Guide"
    ],
    recommended: true,
    theme: "violet"
  },
  {
    title: "Elite Mentorship",
    price: "499",
    duration: "6 Months",
    features: [
      "Unlimited Sessions",
      "Complete Career Guidance",
      "Client Acquisition Strategies",
      "Personal Brand Building",
      "Priority Support",
      "Business Development Tips"
    ],
    recommended: false,
    theme: "gold"
  }
]

interface JourneyStep {
  number: string;
  title: string;
  description: string;
}

const journeySteps: JourneyStep[] = [
  {
    number: "01",
    title: "Skill Assessment",
    description: "Whether you're starting from scratch or an experienced designer looking to level up, we'll assess your current skills and create a personalized learning path."
  },
  {
    number: "02",
    title: "Goal-Based Planning",
    description: "Based on your goals - whether it's landing a job, freelancing, or improving your design skills - we'll create a tailored roadmap for your success."
  },
  {
    number: "03",
    title: "Weekly Challenges",
    description: "Get hands-on experience with weekly assignments tailored to your skill level and goals. Each task builds your portfolio while developing your skills."
  },
  {
    number: "04",
    title: "Portfolio Building", 
    description: "Create an impressive portfolio through practical assignments and real-world projects that will help you attract clients and employers."
  },
  {
    number: "05",
    title: "Growth & Support",
    description: "Stay motivated with continuous support and guidance. Success and failure are on the same path - we'll help you stay on track."
  },
  {
    number: "06",
    title: "Career Launch",
    description: "After 6 months of dedicated work, you'll be ready for one of three paths: agency employment, successful freelancing, or joining our team."
  }
];

export default function MentorshipPage() {
  const router = useRouter()
  const [activeMentor, setActiveMentor] = useState(mentors[0])
  const [count, setCount] = useState(0)
  const counterRef = useRef(null)
  const isInView = useInView(counterRef)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isInView) {
      interval = setInterval(() => {
        setCount(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 1
        })
      }, 20)
    }
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-black text-white overflow-hidden">
        {/* Hero Section */}
        <section className="min-h-[80vh] relative flex items-center justify-center py-12">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(98,0,255,0.3),transparent_70%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
            <div className="absolute inset-0 bg-grid-white/[0.03]" />
          </div>
          
          {/* Spotlight */}
          <Spotlight 
            translateY={0}
            width={1200}
            height={800}
            smallWidth={600}
            duration={4}
            className="opacity-40"
            gradientFirst="radial-gradient(circle at center, hsla(265, 100%, 85%, .15) 0, hsla(265, 100%, 55%, .05) 50%, transparent 100%)"
            gradientSecond="radial-gradient(circle at center, hsla(265, 100%, 85%, .1) 0, hsla(265, 100%, 55%, .05) 50%, transparent 100%)"
            gradientThird="radial-gradient(circle at center, hsla(265, 100%, 85%, .05) 0, hsla(265, 100%, 45%, .05) 50%, transparent 100%)"
          />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 px-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8"
              >
                Level Up Your Design Skills
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0"
              >
                Join our mentorship program and learn directly from industry experts.
                Get personalized guidance, hands-on experience, and accelerate your growth.
              </motion.p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 px-4 sm:px-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-center"
                >
                  <button
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative px-8 py-4 rounded-xl overflow-hidden bg-violet-600 text-white font-medium"
                  >
                    <div className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-violet-600 via-violet-500 to-violet-600 bg-[length:200%_100%] group-hover:bg-[position:100%_0]" />
                    <div className="relative flex items-center gap-2">
                      View Mentorship Plans
                      <i className="fa-solid fa-arrow-down opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"></i>
                    </div>
                  </button>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-center"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const footer = document.getElementById('footer');
                      if (footer) {
                        footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="group relative px-8 py-4 rounded-xl overflow-hidden border border-white/10 font-medium cursor-pointer"
                  >
                    <div className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-white/0 via-white/5 to-white/0 bg-[length:200%_100%] group-hover:bg-[position:100%_0]" />
                    <div className="relative text-white/80 group-hover:text-white transition-colors flex items-center gap-2">
                      Contact Us
                      <i className="fa-solid fa-message text-white/60 group-hover:text-white transition-colors"></i>
                    </div>
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* How Mentorship Works Section */}
        <section className="py-12 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(98,0,255,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-violet-600/10 border border-violet-500/20 backdrop-blur-sm mb-4 text-violet-400"
              >
                MENTORSHIP PROCESS
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-400"
              >
                Your Journey to Mastery
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-white/60 max-w-2xl mx-auto"
              >
                Step-by-step guidance tailored to your goals, helping you transform from beginner to professional through personalized mentorship
              </motion.p>
            </div>

            {/* Journey Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {journeySteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.4,
                      delay: Math.min(index * 0.05, 0.3) // Smanjeni delay za mobilne uređaje
                    }
                  }}
                  viewport={{ once: true, margin: "50px" }}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.01, 
                    transition: { duration: 0.2 } 
                  }}
                  className="relative group"
                >
                  {/* Card Background with Gradient - pojednostavljen za mobilne uređaje */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/[0.05] to-transparent rounded-2xl group-hover:from-violet-600/[0.08] transition-all duration-300" />
                  
                  {/* Main Card Content */}
                  <div className="relative p-6 md:p-8 rounded-2xl border border-violet-500/10 bg-black/20 overflow-hidden">
                    {/* Glowing Orb Effects - prikazuju se samo na desktop uređajima */}
                    <div className="hidden md:block absolute -top-12 -right-12 w-24 h-24 bg-violet-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="hidden md:block absolute -bottom-12 -left-12 w-24 h-24 bg-violet-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Number Badge - pojednostavljen za mobilne uređaje */}
                    <div className="relative z-10 mb-4 md:mb-6">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center">
                        <span className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-violet-200">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 space-y-2 md:space-y-3">
                      <h3 className="text-xl md:text-2xl font-bold text-white md:bg-clip-text md:text-transparent md:bg-gradient-to-r md:from-white md:via-violet-200 md:to-white">
                        {step.title}
                      </h3>
                      <p className="text-white/70 text-sm md:text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Hover Border Effect - samo za desktop */}
                    <div className="hidden md:block absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl border-2 border-violet-500/20" />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/10 to-transparent my-8" />
        </div>

        {/* Team Section */}
        <section className="py-12 relative overflow-hidden">
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(98,0,255,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none" />
          <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-violet-600/10 border border-violet-500/20 backdrop-blur-sm mb-4 text-violet-400"
              >
                MEET THE TEAM
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-400"
              >
                Learn From Industry Experts
              </motion.h2>
            </div>

            {/* Team Members Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TeamMemberCard
                    name={member.name}
                    role={member.role}
                    experience={member.experience}
                    image={member.image}
                    description={member.description}
                    social={member.social}
                  />
                </motion.div>
              ))}
            </div>

            {/* Enhanced Stats Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-24 text-center"
              ref={counterRef}
            >
              <div className="inline-flex items-center gap-6 px-8 py-4 bg-violet-600/10 rounded-2xl border border-violet-500/20 backdrop-blur-sm">
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  {count}+
                </div>
                <div className="text-left">
                  <div className="text-white/60 text-sm">Active</div>
                  <div className="text-white font-medium text-lg">Members</div>
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/10 to-transparent my-8" />
        </div>

        {/* Your Path After Mentorship Section */}
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(98,0,255,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Your Path After Mentorship
              </h2>
              <p className="text-base sm:text-lg text-white/60 max-w-3xl mx-auto px-4">
                After 6 months of dedicated mentorship, you'll be ready to choose your career path
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {/* Agency Employment Card */}
              <motion.div 
                whileHover={{ 
                  scale: 1.02,
                  borderColor: "rgba(34, 197, 94, 0.2)", // green-500/20
                  backgroundColor: "rgba(34, 197, 94, 0.05)" // green-500/5
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-black/30 backdrop-blur-md border border-green-500/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden group cursor-pointer"
              >
                <div className="w-16 h-16 bg-green-900/30 border border-green-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-green-400 mb-4">Agency Employment</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/70">Portfolio that attracts top agencies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/70">Interview preparation and coaching</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/70">Agency connections and referrals</span>
                  </li>
                </ul>
              </motion.div>

              {/* Freelance Success Card */}
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  borderColor: "rgba(59, 130, 246, 0.2)", // blue-500/20
                  backgroundColor: "rgba(59, 130, 246, 0.05)" // blue-500/5
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-black/30 backdrop-blur-md border border-blue-500/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden group cursor-pointer"
              >
                <div className="w-16 h-16 bg-blue-900/30 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4">Freelance Success</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/70">Client acquisition strategies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/70">Pricing and proposal templates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/70">Business management skills</span>
                  </li>
                </ul>
              </motion.div>

              {/* Join Our Team Card */}
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  borderColor: "rgba(139, 92, 246, 0.2)", // violet-500/20
                  backgroundColor: "rgba(139, 92, 246, 0.05)" // violet-500/5
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-black/30 backdrop-blur-md border border-violet-500/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden group cursor-pointer"
              >
                <div className="w-16 h-16 bg-violet-900/30 border border-violet-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-violet-400 mb-4">Join Our Team</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-violet-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/70">Work on exciting industry projects</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-violet-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/70">Collaborate with our design team</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-violet-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/70">Growth opportunities within our studio</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <div className="text-center">
              <Link 
                href="#plans"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-xl font-medium transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                Start Your Journey Now
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/10 to-transparent my-8" />
        </div>

        {/* Pricing Plans */}
        <section id="pricing" className="py-12 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(98,0,255,0.25),transparent_50%)]" />
          <div className="absolute inset-0 bg-grid-white/[0.03]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-violet-600/10 border border-violet-500/20 backdrop-blur-sm mb-4"
              >
                PRICING
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-400"
              >
                Choose Your Mentorship Plan
              </motion.h2>
            </div>

            {/* U delu sa selektorom mentora */}
            <div className="mb-16 flex flex-col items-center">
              <h3 className="text-center text-xl sm:text-2xl font-medium text-white mb-6 sm:mb-8 px-4">
                Choose your mentor's expertise:
              </h3>
              
              <div className="flex flex-row justify-center gap-3 sm:gap-8 md:gap-12 w-full px-2 sm:px-4">
                {mentors.map((mentor) => (
                  <motion.div
                    key={mentor.id}
                    onClick={() => setActiveMentor(mentor)}
                    className={`relative group cursor-pointer transition-all duration-300 flex flex-col items-center 
                      w-[110px] sm:w-[150px] md:w-[180px]
                      ${activeMentor.id === mentor.id ? 'scale-105' : 'hover:scale-105'}`}
                  >
                    {/* Mentor Avatar Container */}
                    <div className="flex justify-center w-full">
                      <div className={`relative 
                        w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
                        rounded-xl overflow-hidden border-2 transition-all duration-300 
                        ${activeMentor.id === mentor.id 
                          ? 'border-violet-500 shadow-lg shadow-violet-500/25' 
                          : 'border-transparent hover:border-violet-500/50'
                        }`}>
                        <Image
                          src={mentor.image}
                          alt={mentor.name}
                          fill
                          className="object-cover object-center"
                          priority
                        />
                      </div>
                    </div>

                    {/* Mentor Info */}
                    <div className="mt-4 w-full text-center">
                      <p className="text-sm sm:text-base font-medium text-white">
                        {mentor.name}
                      </p>
                      <div className="mt-2 flex justify-center">
                        <p className={`
                          text-xs sm:text-sm font-medium px-2 sm:px-4 py-1 sm:py-1.5
                          rounded-full text-center inline-block
                          ${activeMentor.id === mentor.id 
                            ? 'bg-violet-500/20 text-violet-400' 
                            : 'bg-white/5 text-white/60'
                          }`}>
                          {mentor.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {mentorshipPlans.map((plan, index) => (
                <motion.div
                  key={plan.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                  className={`relative group ${plan.recommended ? 'lg:-mt-4 lg:mb-4 z-10' : ''}`}
                >
                  <div className={`relative bg-[#0A0A0A] rounded-2xl p-8 border ${
                    plan.theme === 'violet' 
                      ? 'border-violet-500/50 lg:p-10'
                      : plan.theme === 'gold'
                        ? 'border-yellow-500/50'
                        : 'border-white/10'
                  } backdrop-blur-sm overflow-visible`}>
                    {/* Most Popular Badge */}
                    {plan.recommended && (
                      <div className="absolute -top-3 right-6 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-violet-600/20 rounded-full border border-violet-500/20 backdrop-blur-sm">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.8, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-2 h-2 rounded-full bg-violet-400"
                        />
                        <span className="text-xs font-medium text-violet-400">Most Popular</span>
                      </div>
                    )}

                    {/* Price Section */}
                    <div className="text-center mb-8">
                      <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                        {plan.title}
                      </h3>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {plan.discount && (
                          <span className="text-2xl font-medium text-white/40 line-through">
                            €{activeMentor.pricing.basic}
                          </span>
                        )}
                        <span className={`text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                          plan.theme === 'violet'
                            ? 'from-white via-violet-400 to-violet-600'
                            : plan.theme === 'gold'
                              ? 'from-yellow-200 via-yellow-400 to-yellow-600'
                              : plan.discount
                                ? 'from-green-400 to-green-600'
                                : 'from-white to-white/60'
                        }`}>
                          €{plan.title === "Basic Mentorship" 
                              ? activeMentor.pricing.basic 
                              : plan.title === "Pro Mentorship"
                                ? activeMentor.pricing.pro
                                : activeMentor.pricing.elite}
                        </span>
                        <span className="text-white/40">/{plan.duration}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            plan.theme === 'violet'
                              ? 'bg-violet-600/20'
                              : plan.theme === 'gold'
                                ? 'bg-yellow-600/20'
                                : 'bg-white/10'
                          }`}>
                            <svg 
                              className={`w-3 h-3 ${
                                plan.theme === 'violet'
                                  ? 'text-violet-400'
                                  : plan.theme === 'gold'
                                    ? 'text-yellow-400'
                                    : 'text-white/60'
                              }`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-white/70">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="relative z-50" style={{ pointerEvents: 'auto' }}>
                      <button
                        onClick={() => {
                          console.log('Click detected!');
                          const url = `/mentorship/checkout?plan=${encodeURIComponent(plan.title)}&mentor=${encodeURIComponent(activeMentor.id)}`;
                          console.log('Redirecting to:', url);
                          window.location.href = url;
                        }}
                        className={`w-full py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                          plan.theme === 'violet'
                            ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-600/20'
                            : plan.theme === 'gold'
                              ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg shadow-yellow-500/20'
                              : plan.discount
                                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20'
                                : 'bg-white/5 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        Get Started
                      </button>
                    </div>

                    {/* Info Text ispod dugmeta */}
                    {plan.recommended && (
                      <div className="mt-3 text-center">
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-violet-600/10 rounded-lg">
                          <svg className="w-3.5 h-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-xs text-violet-400">Best value for most students</span>
                        </div>
                      </div>
                    )}

                    {/* Background Effects */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${
                      plan.theme === 'violet'
                        ? 'from-violet-600 to-purple-600'
                        : plan.theme === 'gold'
                          ? 'from-yellow-400 to-yellow-600'
                          : plan.discount
                            ? 'from-green-500 to-emerald-500'
                            : 'from-white/10 to-white/5'
                    } rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500`} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-violet-600/10 rounded-xl border border-violet-500/20 backdrop-blur-sm">
                <i className="fa-solid fa-circle-info text-violet-400 text-lg"></i>
                <span className="text-white/60">All plans include access to our Video Tutorials</span>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/10 to-transparent my-8" />
        </div>
      </main>
    </LazyMotion>
  )
} 