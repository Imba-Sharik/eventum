'use client'

import Link from 'next/link'
import { WebcamPixelGrid } from '@/components/ui/webcam-pixel-grid'

interface ErrorPageProps {
  code?: string
  title: string
  description: string
  showHomeButton?: boolean
}

export default function ErrorPage({
  code = '404',
  title,
  description,
  showHomeButton = true,
}: ErrorPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* WebcamPixelGrid background */}
      <div className="absolute inset-0">
        <WebcamPixelGrid
          gridCols={48}
          gridRows={32}
          colorMode="webcam"
          backgroundColor="#0a0a0a"
          maxElevation={20}
          motionSensitivity={0.3}
          gapRatio={0.15}
          darken={0.2}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content overlay */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4 px-4">
          <h1 className="text-[12rem] font-bold text-white leading-none drop-shadow-2xl">
            {code}
          </h1>
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            {title}
          </h2>
          <p className="text-white/70 max-w-md text-lg mx-auto">
            {description}
          </p>
          {showHomeButton && (
            <Link
              href="/"
              className="inline-block mt-6 px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
            >
              Вернуться на главную
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
