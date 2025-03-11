'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Player from '@vimeo/player'

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
}

interface VideoModalProps {
  video: Video;
  onClose: () => void;
  onComplete: () => void;
  isWatched: boolean;
  language: 'sr' | 'en';
}

const translations = {
  sr: {
    watched: 'Pogledano'
  },
  en: {
    watched: 'Watched'
  }
}

export default function VideoModal({ video, onClose, onComplete, isWatched, language }: VideoModalProps) {
  const playerRef = useRef<HTMLIFrameElement>(null)
  const t = translations[language]

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  useEffect(() => {
    if (!playerRef.current) return

    const player = new Player(playerRef.current)
    
    player.on('ended', () => {
      onComplete()
    })

    return () => {
      player.off('ended')
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-5xl bg-[#0A0A0A] rounded-2xl overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="aspect-video">
            <iframe
              ref={playerRef}
              src={video.url}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ border: 0 }}
            />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold">{video.title[language]}</h3>
              {isWatched && (
                <div className="flex items-center gap-2 text-green-400">
                  <i className="fa-solid fa-check"></i>
                  <span className="text-sm">{t.watched}</span>
                </div>
              )}
            </div>
            <p className="text-white/60 mb-4">{video.description[language]}</p>
            
            <div className="flex items-center gap-4 text-sm text-white/40">
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-user"></i>
                <span>{video.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-clock"></i>
                <span>{video.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-calendar"></i>
                <span>{new Date(video.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 