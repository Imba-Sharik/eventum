"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";


const circleTexts = [
  {
    words: "EVENTS • CREATIVE • DESIGN • PREMIUM • ",
    radius: 180,
    duration: 20,
    direction: 1,
  },
  {
    words: "EVENTUM • AGENCY • INTERACTIVE • DIGITAL • ",
    radius: 240,
    duration: 25,
    direction: -1,
  },
  {
    words: "EXPERIENCE • PRODUCTION • CONCERTS • FESTIVALS • ",
    radius: 300,
    duration: 30,
    direction: 1,
  },
];

export default function Preloader() {
  const [counter, setCounter] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counterAnimation = gsap.to(
      { value: 0 },
      {
        value: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: function () {
          setCounter(Math.round(this.targets()[0].value));
        },
        onComplete: () => {
          setIsComplete(true);
        },
      }
    );

    return () => {
      counterAnimation.kill();
    };
  }, []);

  useEffect(() => {
    if (isComplete && preloaderRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
        },
      });

      tl.to(circlesRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
      })
        .to(
          counterRef.current,
          {
            scale: 2,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
          },
          "-=0.4"
        )
        .to(preloaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
        });
    }
  }, [isComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black"
    >
      <div ref={circlesRef} className="relative">
        {circleTexts.map((circle, index) => (
          <CircleText
            key={index}
            words={circle.words}
            radius={circle.radius}
            duration={circle.duration}
            direction={circle.direction}
          />
        ))}
      </div>

      <span
        ref={counterRef}
        className="absolute font-bebas text-6xl md:text-8xl text-white tracking-wider"
      >
        {counter}%
      </span>
    </div>
  );
}

interface CircleTextProps {
  words: string;
  radius: number;
  duration: number;
  direction: number;
}

function CircleText({ words, radius, duration, direction }: CircleTextProps) {
  const repeatedText = words.repeat(3);
  const characters = repeatedText.split("");
  const angleStep = 360 / characters.length;

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        animation: `spin ${duration}s linear infinite ${direction === -1 ? "reverse" : ""}`,
      }}
    >
      {characters.map((char, index) => (
        <span
          key={index}
          className="absolute left-1/2 font-bebas text-sm md:text-base text-white"
          style={{
            transform: `
              translateX(-50%)
              rotate(${index * angleStep}deg)
              translateY(-${radius}px)
            `,
            transformOrigin: "center center",
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
