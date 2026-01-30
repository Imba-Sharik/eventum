"use client"

import Image from "next/image"
import { AuroraText } from "@/components/ui/aurora-text"

interface UnderDevelopmentProps {
  description?: string
}

export function UnderDevelopment({
  description = "Страница находится в разработке. Скоро здесь появится контент!"
}: UnderDevelopmentProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-8">
        <Image
          src="/404_image.gif"
          alt="Страница в разработке"
          width={300}
          height={300}
          className="mx-auto"
          priority
          unoptimized
        />
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Страница в <AuroraText>разработке</AuroraText>
      </h1>
      
      <p className="text-lg text-gray-600 max-w-md">
        {description}
      </p>
      
    </div>
  )
}