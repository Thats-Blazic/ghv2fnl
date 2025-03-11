'use client'

import { motion } from 'framer-motion'
import { ProjectType } from '@/types'

interface ProjectFiltersProps {
  selectedType: ProjectType | 'all'
  onTypeClick: (type: ProjectType | 'all') => void
}

const projectTypes = [
  { id: 'all', label: 'ALL' },
  { id: 'thumbnail', label: 'THUMBNAILS' },
  { id: 'banner', label: 'BANNERS' },
  { id: 'branding', label: 'BRANDING' },
] as const

export default function ProjectFilters({ selectedType, onTypeClick }: ProjectFiltersProps) {
  return (
    <div className="flex gap-2 md:gap-4">
      {projectTypes.map(type => (
        <motion.button
          key={type.id}
          onClick={() => onTypeClick(type.id as ProjectType | 'all')}
          className={`relative px-4 md:px-6 py-2 border rounded-full text-xs md:text-sm transition-colors duration-300 whitespace-nowrap ${
            selectedType === type.id
              ? 'border-violet-600 text-white'
              : 'border-white/20 text-white/60 hover:text-white hover:border-white/40'
          }`}
        >
          <span className="font-medium">
            {type.label}
          </span>
        </motion.button>
      ))}
    </div>
  )
} 