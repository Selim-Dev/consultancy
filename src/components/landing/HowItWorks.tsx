'use client';

import * as LucideIcons from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { landingContent } from '@/data/landing';

export default function HowItWorks() {
  const { steps } = landingContent;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id='how-it-works'
      className='py-20 md:py-32 bg-bg relative overflow-hidden'
    >
      {/* Subtle background decoration */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-teal/2 rounded-full blur-[100px]' />

      <div className='container mx-auto px-4 relative z-10'>
        {/* Section header */}
        <div className='text-center mb-16 md:mb-20'>
          <div className='inline-flex items-center gap-2 bg-teal/10 rounded-full px-4 py-1.5 mb-4'>
            <span className='w-1.5 h-1.5 bg-teal rounded-full' />
            <span className='text-teal text-sm font-medium'>خطوات بسيطة</span>
          </div>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4'>
            كيف تعمل المنصة؟
          </h2>
          <p className='text-lg text-text-muted max-w-2xl mx-auto'>
            ثلاث خطوات بسيطة تفصلك عن بداية رحلتك نحو صحة نفسية أفضل
          </p>
        </div>

        {/* Steps */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto'>
          {steps.map((step, index) => {
            const Icon =
              (
                LucideIcons as unknown as Record<
                  string,
                  React.ComponentType<{ className?: string }>
                >
              )[step.icon] || LucideIcons.Circle;

            return (
              <div
                key={index}
                className={`relative text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Connector line (between cards on desktop) */}
                {index < steps.length - 1 && (
                  <div className='hidden md:block absolute top-16 -left-6 lg:-left-8 w-12 lg:w-16 h-[2px] bg-linear-to-l from-teal/40 to-transparent' />
                )}

                {/* Step number floating */}
                <div className='absolute -top-3 right-1/2 translate-x-1/2 md:right-4 md:translate-x-0 w-8 h-8 bg-linear-to-br from-teal to-indigo rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-teal/20 z-10'>
                  {index + 1}
                </div>

                {/* Card */}
                <div className='group bg-white rounded-3xl p-8 pt-10 border border-border hover:border-teal/30 transition-all duration-300 hover:shadow-xl hover:shadow-teal/5 hover:-translate-y-2'>
                  {/* Icon */}
                  <div className='w-20 h-20 mx-auto mb-6 bg-linear-to-br from-teal/10 to-indigo/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                    <Icon className='w-10 h-10 text-teal' />
                  </div>

                  {/* Title */}
                  <h3 className='text-xl font-bold text-text mb-3'>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className='text-text-muted leading-relaxed'>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
