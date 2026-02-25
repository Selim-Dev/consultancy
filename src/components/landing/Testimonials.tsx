'use client';

import { MessageSquareQuote, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { landingContent } from '@/data/landing';

export default function Testimonials() {
  const { testimonials } = landingContent;
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
      className='py-20 md:py-32 relative overflow-hidden bg-[#0a0e1a]'
    >
      {/* Background effects */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,164,0.08)_0%,transparent_60%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.08)_0%,transparent_60%)]' />

      <div className='container mx-auto px-4 relative z-10'>
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className='inline-flex items-center gap-2 bg-white/6 border border-white/8 rounded-full px-4 py-1.5 mb-4'>
            <MessageSquareQuote className='w-3.5 h-3.5 text-teal' />
            <span className='text-teal text-sm font-medium'>
              قصص نجاح حقيقية
            </span>
          </div>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4'>
            آراء عملائنا
          </h2>
          <p className='text-lg text-white/50 max-w-2xl mx-auto'>
            اقرأ تجارب من سبقوك في رحلة التعافي والنمو النفسي
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group relative bg-white/4 backdrop-blur-sm border border-white/8 rounded-3xl p-6 transition-all duration-500 hover:bg-white/7 hover:border-white/15 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Glow on hover */}
              <div className='absolute inset-0 rounded-3xl bg-linear-to-br from-teal/10 to-indigo/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10' />

              {/* Quote icon */}
              <div className='mb-4'>
                <div className='w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center'>
                  <MessageSquareQuote className='w-5 h-5 text-teal' />
                </div>
              </div>

              {/* Quote Text */}
              <p className='text-white/60 leading-relaxed mb-5 line-clamp-4 text-sm'>
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Rating */}
              <div className='flex items-center gap-1 mb-3'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < testimonial.rating
                        ? 'fill-amber text-amber'
                        : 'text-white/10'
                    }`}
                  />
                ))}
              </div>

              {/* Alias */}
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 rounded-full bg-linear-to-br from-teal to-indigo flex items-center justify-center text-white text-xs font-bold'>
                  {testimonial.alias.charAt(0)}
                </div>
                <p className='text-sm font-semibold text-white/80'>
                  {testimonial.alias}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
