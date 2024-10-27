'use client'

import { useState, useEffect } from 'react'

export default function LiveWallpaper() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((prevOffset) => (prevOffset + 1) % 360)
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full blur-3xl opacity-20	" style={{
      background: `linear-gradient(${offset}deg, #06b6d4, #a855f7, #22c55e)`, // from-cyan-500/20 via-purple-500/20 to-green-500/20
      backgroundSize: '400% 400%',
      animation: 'gradient 15s ease infinite',
    }}>
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  )
}