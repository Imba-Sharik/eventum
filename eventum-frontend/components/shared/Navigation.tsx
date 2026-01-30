"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  { id: 'about', label: 'О нас' },
  { id: 'projects', label: 'Проекты' },
  { id: 'partners', label: 'Партнеры' },
  { id: 'contacts', label: 'Контакты' },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setOpen(false);
    if (pathname !== '/') {
      router.push(`/#${id}`);
    } else {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: `#${id}`, offsetY: 80 },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-xl z-50 border-b border-white/10">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center max-w-7xl">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold text-white hover:text-white/80 transition-colors font-bebas tracking-wider"
        >
          Eventum
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex gap-10 text-white font-montserrat">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="hover:text-white/70 transition-colors text-sm font-medium tracking-wide"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="text-white p-2">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black/95 border-white/10 w-80">
            <SheetTitle className="sr-only">Навигация</SheetTitle>
            <div className="px-6 pt-6">
              <span className="text-white/50 font-montserrat text-sm uppercase tracking-widest">
                Меню
              </span>
              <nav className="mt-10">
                <ul className="space-y-6 font-montserrat">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className="text-white hover:text-white/70 transition-colors text-2xl font-light tracking-wide"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
