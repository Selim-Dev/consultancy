'use client';

import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { consultants } from '@/data/consultants';

import ConsultantCard from '@/components/consultants/ConsultantCard';

export default function FeaturedConsultants() {
  const featuredConsultants = consultants.slice(0, 4);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='py-20 md:py-32 bg-bg relative overflow-hidden'
    >
      <div className='absolute top-0 left-0 right-0 h-px bg-linear-to-l from-transparent via-border to-transparent' />

      <div className='container mx-auto px-4'>
        {/* Section header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className='inline-flex items-center gap-2 bg-amber/10 rounded-full px-4 py-1.5 mb-4'>
            <Sparkles className='w-3.5 h-3.5 text-amber' />
            <span className='text-amber-light text-sm font-medium'>
              الأعلى تقييماً
            </span>
          </div>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4'>
            المستشارون المميزون
          </h2>
          <p className='text-lg text-text-muted max-w-2xl mx-auto'>
            تعرّف على نخبة من المستشارين النفسيين المعتمدين والمتخصصين
          </p>
        </div>

        {/* Consultants Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12'>
          {featuredConsultants.map((consultant, index) => (
            <div
              key={consultant.id}
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <ConsultantCard consultant={consultant} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <Link
            href='/consultants'
            className='group inline-flex items-center gap-3 bg-linear-to-l from-teal to-teal-dark text-white rounded-2xl px-8 py-4 font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-teal/20 hover:-translate-y-0.5'
          >
            عرض جميع المستشارين
            <ArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform' />
          </Link>
        </div>
      </div>
    </section>
  );
}
