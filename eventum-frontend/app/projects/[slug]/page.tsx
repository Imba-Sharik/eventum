import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/strapi";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Проект не найден",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: project.title,
    description: project.detailedDescription || project.description,
    image: project.image,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: {
      "@type": "Organization",
      name: "Eventum",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://eventum.ru",
    },
    ...(project.client && {
      sponsor: {
        "@type": "Organization",
        name: project.client,
      },
    }),
  };

  return (
    <main className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Hero Section */}
        <div className="relative h-[60vh] bg-gray-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            unoptimized={project.image.startsWith('http')}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

          {/* Breadcrumb */}
          <div className="absolute top-8 left-0 right-0 z-10">
            <div className="container mx-auto px-4 max-w-7xl">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Назад к проектам</span>
              </Link>
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-10 pb-12">
            <div className="container mx-auto px-4 max-w-7xl">
              {project.logo && (
                <div className="inline-flex items-center justify-center bg-white rounded-full p-3 mb-4 shadow-lg">
                  <Image
                    src={project.logo}
                    alt={`${project.client} logo`}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                    unoptimized={project.logo.startsWith('http')}
                  />
                </div>
              )}
              <div className="text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">
                {project.category} <span className="text-white/60">•</span> {project.date}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {project.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 max-w-4xl py-16">
          {project.client && (
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Клиент</div>
              <div className="text-xl font-medium text-gray-900">
                {project.client}
              </div>
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {project.detailedDescription || project.description}
            </p>
          </div>
        </div>

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="hidden md:block bg-white relative overflow-x-clip">
            <DraggableCardContainer className="relative flex min-h-80 items-center justify-center">
              {project.gallery.map((image, index) => {
                const positions = [
                  "absolute bottom-8 left-[25%] rotate-[-5deg]",
                  "absolute bottom-12 left-[45%] rotate-[7deg]",
                  "absolute bottom-6 left-[55%] rotate-[-3deg]",
                  "absolute bottom-16 left-[35%] rotate-[10deg]",
                  "absolute bottom-10 left-[50%] rotate-[-8deg]",
                  "absolute bottom-14 left-[30%] rotate-[4deg]",
                ];
                return (
                  <DraggableCardBody
                    key={index}
                    className={`${positions[index % positions.length]} min-h-0! h-64! w-64! p-0 overflow-hidden z-50`}
                  >
                    <Image
                      src={image}
                      alt={`${project.title} - фото ${index + 1}`}
                      width={256}
                      height={256}
                      className="pointer-events-none relative z-10 h-64 w-64 object-cover"
                      unoptimized={image.startsWith('http')}
                    />
                  </DraggableCardBody>
                );
              })}
            </DraggableCardContainer>
          </section>
        )}

        {/* Back Button */}
        <div className="container mx-auto px-4 max-w-4xl py-12">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Вернуться к проектам</span>
          </Link>
        </div>
    </main>
  );
}
