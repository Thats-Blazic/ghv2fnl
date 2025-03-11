'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface TeamMemberProps {
  name: string
  role: string
  experience: string
  image: string
  description: string
  social: {
    whatsapp?: string
    linkedin?: string
  }
}

export default function TeamMemberCard({ name, role, experience, image, description, social }: TeamMemberProps) {
  return (
    <motion.div
      className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-violet-900/20 to-black border border-violet-500/20 transition-all duration-300 hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex flex-col items-center text-center">
          {/* Image container */}
          <div className="relative w-32 h-32 mb-4 rounded-xl overflow-hidden border-2 border-violet-500/30 shadow-lg shadow-violet-500/20">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              priority
              unoptimized={true}
              loader={({ src }) => src}
            />
            {/* Hover overlay with animation */}
            <motion.div 
              className="absolute inset-0 bg-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          
          {/* Name and role */}
          <h3 className="text-2xl font-bold group-hover:text-violet-400 transition-colors mb-1">{name}</h3>
          <div className="mb-2">
            <span className="px-3 py-1 text-sm rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
              {role}
            </span>
          </div>
          <p className="text-white/60 mb-4">{experience}</p>
          
          {/* Description */}
          <p className="text-white/70 mb-6">{description}</p>
          
          {/* Social links */}
          <div className="flex items-center gap-3">
            {social.whatsapp && (
              <Link 
                href={social.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center backdrop-blur-sm border border-violet-500/20 hover:bg-violet-500/30 transition-colors"
              >
                <i className="fa-brands fa-whatsapp text-violet-300"></i>
              </Link>
            )}
            {social.linkedin && (
              <Link 
                href={social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center backdrop-blur-sm border border-violet-500/20 hover:bg-violet-500/30 transition-colors"
              >
                <i className="fa-brands fa-linkedin-in text-violet-300"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
} 