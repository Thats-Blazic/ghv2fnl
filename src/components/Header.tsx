'use client'

import { motion } from 'framer-motion'

export default function Header() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h1 className="text-[80px] font-bold leading-tight">
              Increase your CTR with
              <br />
              <span className="text-violet-500">Eye Catching Thumbnails</span>
            </h1>

            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Thumbnails That Make Small Channels Big and Big
              <br />
              Channels Unstoppable!
            </p>

            <div className="flex items-center justify-center gap-6 pt-4">
              <motion.a
                href="#projects"
                className="inline-flex items-center gap-2 px-8 py-4 bg-violet-500 text-white rounded-full font-medium hover:bg-violet-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">🚀</span>
                Let&apos;s Skyrocket!
              </motion.a>

              <motion.a
                href="#premium"
                className="inline-flex items-center px-8 py-4 bg-[#0f1116] text-white rounded-full font-medium hover:bg-[#16181f] transition-colors border border-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Premium Assets
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 h-full w-full [background-image:linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:50px_50px]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
      </div>
    </section>
  )
} 