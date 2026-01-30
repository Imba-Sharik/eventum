"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "@/components/shared/ProjectCard";
import type { ProjectData } from "@/lib/types";

interface ProjectsProps {
  projects: ProjectData[];
}

export default function ProjectsSection({ projects }: ProjectsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="projects"
      className="relative w-full bg-linear-to-b from-white to-gray-50 pt-16 sm:pt-24 pb-8 sm:pb-12"
    >
      {/* Заголовок */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-10 grid grid-cols-1 md:grid-cols-[1.2fr_1.3fr] gap-8 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight">
              Наши проекты
              <br />
              говорят за нас
            </h2>
          </div>
          <div className="text-gray-700">
            <p>
              От корпоративных конференций до музыкальных фестивалей — мы
              создаем мероприятия любого масштаба и сложности. Каждый проект
              уникален и отражает индивидуальность наших клиентов.
            </p>
          </div>
        </div>
      </div>

      {/* Горизонтальный скролл */}
      <div className="relative group overflow-hidden">
        {/* Кнопки */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Скроллящийся ряд карточек */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-8 pt-4"
          style={
            {
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingLeft: "calc((100vw - min(100vw, 1280px)) / 2 + 1rem)",
              paddingRight: "calc((100vw - min(100vw, 1280px)) / 2 + 1rem)",
            } as React.CSSProperties
          }
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* Скрытие скроллбара */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
