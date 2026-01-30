"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import type { About } from "@/lib/types";

interface AboutProps {
  data: About;
}

export default function About({ data }: AboutProps) {
  return (
    <section id="about" className="relative py-12 md:py-20 bg-white">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <h2 className="text-4xl font-medium lg:text-5xl">
            {data.title}
          </h2>
          <p>{data.description}</p>
        </div>

        <div className="grid divide-y md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
          {data.statistics?.map((stat, index) => (
            <div
              key={stat.id}
              className="space-y-4 py-6 text-center first:pt-0 last:pb-0 md:py-0"
            >
              <div className="text-5xl font-bold">
                {stat.prefix}
                <NumberTicker
                  value={stat.value}
                  delay={index * 0.2}
                  useGrouping={false}
                />
                {stat.suffix && ` ${stat.suffix}`}
              </div>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
