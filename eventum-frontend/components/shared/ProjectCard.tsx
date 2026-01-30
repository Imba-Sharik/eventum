"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CometCard } from "@/components/ui/comet-card";
import type { ProjectData } from "@/lib/types";

// Многоцветные градиенты (2-3 цвета)
const GRADIENTS = [
  "from-purple-600 via-pink-500 to-rose-500",
  "from-blue-600 via-cyan-500 to-teal-500",
  "from-orange-500 via-red-500 to-rose-600",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-violet-600 via-purple-500 to-fuchsia-500",
];

function getGradient(id: number): string {
  return GRADIENTS[id % GRADIENTS.length];
}

interface ProjectCardProps {
  project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="shrink-0 w-85 sm:w-100 h-120 py-6 px-2">
      <CometCard rotateDepth={10} translateDepth={10} className="h-full">
        <Link
          href={`/projects/${project.slug}`}
          className="block h-full cursor-pointer"
        >
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 transition-all duration-300 h-full flex flex-col">
            {/* Превью */}
            <div className="relative h-60 bg-gray-100 overflow-hidden shrink-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 340px, 400px"
                className="object-cover transition-transform duration-500"
                unoptimized={project.image.startsWith("http")}
              />
              {project.logo ? (
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg flex items-center justify-center w-16 h-16">
                  <Image
                    src={project.logo}
                    alt={`${project.client} logo`}
                    width={40}
                    height={40}
                    className="object-contain"
                    unoptimized={project.logo.startsWith("http")}
                  />
                </div>
              ) : (
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                  <span
                    className={`text-sm font-bold bg-linear-to-r ${getGradient(project.id)} bg-clip-text text-transparent`}
                  >
                    {project.date} 
                  </span>
                </div>
              )}
            </div>

            {/* Контент */}
            <div className="p-4 flex-1 flex flex-col">
              <div
                className={`text-sm font-semibold mb-2 uppercase tracking-wide bg-linear-to-r ${getGradient(project.id)} bg-clip-text text-transparent`}
              >
                {project.category} 12
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                {project.description}
              </p>
              <div
                className={`mt-auto flex items-center font-medium transition-all hover:translate-x-1 bg-linear-to-r ${getGradient(project.id)} bg-clip-text text-transparent`}
              >
                <span className="text-sm ">Подробнее</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        </Link>
      </CometCard>
    </div>
  );
}
