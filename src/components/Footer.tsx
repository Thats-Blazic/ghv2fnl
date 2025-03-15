'use client'

import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const ContactForm = dynamic(() => import('../components/ContactForm'), {
  loading: () => <div className="animate-pulse bg-violet-600/10 rounded-xl h-[400px]" />
})

export default function Footer() {
  return (
    <footer id="footer" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(98,0,255,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How can we help you?<br />
              Let's get in touch
              <span className="ml-2">👋</span>
            </h2>
            
            <p className="text-white/60 mb-12">
              We are available to assist you. Any day, any time, even on Sundays.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <Link 
                  href="https://discord.com/invite/GHOSTFORCE"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/60 group-hover:text-white/90 transition-colors">
                    <i className="fab fa-discord text-2xl transition-colors"></i>
                  </div>
                  <div>
                    <h3 className="text-white group-hover:text-white/90 transition-colors">Discord</h3>
                    <p className="text-white/60 text-sm">Join our community</p>
                  </div>
                </Link>

                <a 
                  href="https://www.instagram.com/ghostforcedesign/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/60 group-hover:text-white/90 transition-colors">
                    <i className="fab fa-instagram text-2xl transition-colors"></i>
                  </div>
                  <div>
                    <h3 className="text-white group-hover:text-white/90 transition-colors">Instagram</h3>
                    <p className="text-white/60 text-sm">Follow our design journey</p>
                  </div>
                </a>
              </div>

              <div className="space-y-6">
                <a 
                  href="https://www.behance.net/ghostforcestudio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/60 group-hover:text-white/90 transition-colors">
                    <i className="fab fa-behance text-2xl transition-colors"></i>
                  </div>
                  <div>
                    <h3 className="text-white group-hover:text-white/90 transition-colors">Behance</h3>
                    <p className="text-white/60 text-sm">Check our case studies</p>
                  </div>
                </a>

                <Link 
                  href="https://wa.me/+381628169744"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/60 group-hover:text-white/90 transition-colors">
                    <i className="fab fa-whatsapp text-2xl transition-colors"></i>
                  </div>
                  <div>
                    <h3 className="text-white group-hover:text-white/90 transition-colors">WhatsApp</h3>
                    <p className="text-white/60 text-sm">Chat with us</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Fill out the form below to get started
            </h2>
            <p className="text-white/60 mb-8">
              Let's discuss your project and see how I can help you achieve your goals.
            </p>
            
            <ContactForm />
          </div>
        </div>
      </div>
    </footer>
  )
} 