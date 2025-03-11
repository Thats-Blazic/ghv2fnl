'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link 
      href={href}
      className={`relative py-2 px-4 text-sm font-medium transition-colors ${
        isActive ? 'text-white' : 'text-white/70 hover:text-white'
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute left-0 right-0 bottom-0 h-0.5 bg-violet-600"
          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
        />
      )}
      <motion.div
        className="absolute inset-0 bg-white/5 rounded-lg -z-10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  )
} 