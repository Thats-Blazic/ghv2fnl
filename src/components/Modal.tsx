'use client'

import { Project } from '@/types'
import { Dialog } from '@headlessui/react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ModalProps {
  project: Project
  isOpen: boolean
  onClose: () => void
}

export default function Modal({ project, isOpen, onClose }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          <div className="relative fixed inset-0 overflow-y-auto">
            <div className="relative flex min-h-full items-center justify-center p-4">
              <Dialog.Panel>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative bg-[#111] rounded-xl overflow-hidden max-w-4xl mx-auto"
                >
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Image */}
                  <div className="relative aspect-video">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-violet-600/20 rounded-full text-violet-400 text-sm">
                        {project.category}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                    <p className="text-white/70 mb-4">{project.description}</p>

                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <div className="flex items-center gap-2">
                        <span>{project.client}</span>
                      </div>
                      {project.views && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-2">
                            <span>{project.views}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
} 