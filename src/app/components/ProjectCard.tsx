'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Project } from '@/types'
import { useState } from 'react'
import Modal from '@/components/Modal'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Dodajemo console.log za debugging
  console.log('Project data:', project);

  if (!project?.image) {
    console.warn('Project is missing image:', project);
    return null;
  }

  return (
    <>
      <motion.div 
        className="group relative cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative aspect-video rounded-xl overflow-hidden bg-[#111] border border-white/10">
          <Image
            src={project.image}
            alt={project.title || 'Project thumbnail'}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            {project.category && (
              <span className="inline-block px-2 py-1 bg-violet-600/20 rounded-md text-violet-400 text-xs font-medium mb-2">
                {project.category}
              </span>
            )}
            <h3 className="text-lg font-bold mb-1 line-clamp-2">
              {project.title}
            </h3>
            <p className="text-sm text-white/70">
              {project.client}
            </p>
            {project.views && (
              <div className="flex items-center gap-2 text-sm text-white/50 mt-2">
                <span>{project.views}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <Modal 
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
} 