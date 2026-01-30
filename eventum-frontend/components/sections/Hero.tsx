"use client";

import LiquidGradient from '@/components/shared/LiquidGradient';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Homepage } from '@/lib/types';

gsap.registerPlugin(ScrollToPlugin);

interface HeroProps {
  data: Homepage;
}

export default function Hero({ data }: HeroProps) {
  const scrollToContacts = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: '#contacts', offsetY: 80 },
      ease: "power2.inOut"
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Liquid Gradient Background */}
      <LiquidGradient />

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-4 max-w-5xl mx-auto">
        {/* Main Heading with Gradient */}
        <h1 className="text-7xl md:text-8xl lg:text-[12rem] font-bold font-bebas tracking-wider bg-linear-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-none">
          {data.heroTitle}
        </h1>

        {/* Subtitle */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-medium font-montserrat tracking-wide">
          {data.heroSubtitle}
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg lg:text-xl text-white/60 font-light font-montserrat max-w-2xl mx-auto">
          {data.heroDescription}
        </p>

        {/* CTA Button */}
        <div className="pt-4">
          <button
            onClick={scrollToContacts}
            className="px-8 py-4 bg-white text-black font-montserrat font-semibold text-lg rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            {data.heroButtonText}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
