'use client'

import { motion } from 'framer-motion'

export default function PageTransition() {
  return (
    <motion.div
      className="fixed inset-0 bg-black z-[60] pointer-events-none"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    />
  )
} 