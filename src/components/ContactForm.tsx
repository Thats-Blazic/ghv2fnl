'use client'

import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        
        emailjs.sendForm(
          'service_x9dcrw9',
          'template_h80xxw8',
          form,
          'wGZ4StkkCqK8W3pBA'
        )
        .then(() => {
          alert('Message sent successfully!')
          form.reset()
        })
        .catch((error) => {
          console.error('Error:', error)
          alert('Failed to send message. Please try again.')
        })
      }}
      className="space-y-4"
    >
      <div>
        <input
          type="text"
          name="user_name"
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-white/50"
        />
      </div>
      <div>
        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-white/50"
        />
      </div>
      <div>
        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows={4}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-white/50 resize-none"
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors duration-200"
      >
        Send Message
      </motion.button>
    </form>
  )
} 