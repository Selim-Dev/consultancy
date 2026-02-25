'use client';

import * as LucideIcons from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { landingContent } from '@/data/landing';

export default function WhyUs() {
  const { features } = landingContent;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='py-20 md:py-32 bg-white relative overflow-hidden'
    >
      {/* Background decoration */}
      <div className='absolute top-0 right-0 w-96 h-96 bg-indigo/3 rounded-full blur-[100px]' />
      <div className='absolute bottom-0 left-0 w-96 h-96 bg-teal/3 rounded-full blur-[100px]' />

      <div className='container mx-auto px-4 relative z-10'>
        {/* Section header */}
        <div className='text-center mb-16 md:mb-20'>
          <div className='inline-flex items-center gap-2 bg-indigo/10 rounded-full px-4 py-1.5 mb-4'>
            <span className='w-1.5 h-1.5 bg-indigo rounded-full' />
            <span className='text-indigo text-sm font-medium'>
              مميزاتنا
            </span>
          </div>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4'>
            لماذا تختار منصتنا؟
          </h2>
          <p className='text-lg text-text-muted max-w-2xl mx-auto'>
            نوفر لك بيئة آمنة ومريحة للحصول على الدعم النفسي الذي تستحقه
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
          {features.map((feature, index) => {
            const Icon =
              (
                LucideIcons as unknown as Record<
                  string,
                  React.ComponentType<{ className?: string }>
                >
              )[feature.icon] || LucideIcons.Circle;

            return (
              <div
                key={index}
                className={`group relative bg-white rounded-3xl p-7 border border-border hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:shadow-teal/5 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Hover gradient border effect */}
                <div className='absolute inset-0 rounded-3xl bg-linear-to-br from-teal/20 to-indigo/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl' />

                {/* Icon */}
                <div className='w-14 h-14 mb-5 bg-linear-to-br from-teal to-indigo rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-teal/10'>
                  <Icon className='w-7 h-7 text-white' />
                </div>

                {/* Title */}
                <h3 className='text-xl font-bold text-text mb-3'>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className='text-text-muted leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
