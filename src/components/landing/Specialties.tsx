'use client';

import { Brain } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { landingContent } from '@/data/landing';

export default function Specialties() {
  const { specialties } = landingContent;
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
      className='py-20 md:py-32 bg-white relative overflow-hidden'
    >
      <div className='container mx-auto px-4'>
        {/* Section header */}
        <div className='text-center mb-14'>
          <div className='inline-flex items-center gap-2 bg-teal/10 rounded-full px-4 py-1.5 mb-4'>
            <Brain className='w-3.5 h-3.5 text-teal' />
            <span className='text-teal text-sm font-medium'>تخصصات متنوعة</span>
          </div>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4'>
            التخصصات المتاحة
          </h2>
          <p className='text-lg text-text-muted max-w-2xl mx-auto'>
            نغطي مجموعة واسعة من التخصصات النفسية لتلبية احتياجاتك
          </p>
        </div>

        {/* Specialties Chips */}
        <div className='flex flex-wrap justify-center gap-3 max-w-5xl mx-auto'>
          {specialties.map((specialty, index) => (
            <Link
              key={index}
              href={`/consultants?specialty=${encodeURIComponent(specialty)}`}
              className={`group px-6 py-3 bg-white border-2 border-border rounded-full text-text font-medium hover:border-teal hover:bg-teal/5 hover:text-teal transition-all duration-300 hover:shadow-lg hover:shadow-teal/5 hover:-translate-y-1 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {specialty}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
