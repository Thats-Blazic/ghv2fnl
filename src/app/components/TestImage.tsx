'use client'

import Image from 'next/image'

export default function TestImage() {
  return (
    <div className="relative w-full h-[300px]">
      <Image
        src="https://i.ibb.co/gbSFFbDM/ivan-marketing-tajne.jpg"
        alt="Test marketing image"
        fill
        className="object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
} 