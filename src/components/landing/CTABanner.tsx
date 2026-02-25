'use client';

import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className='py-20 md:py-28 bg-bg'>
      <div className='container mx-auto px-4'>
        <div
          className={`relative max-w-5xl mx-auto rounded-4xl overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className='absolute inset-0 bg-linear-to-l from-teal to-indigo' />
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15)_0%,transparent_50%)]' />
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.1)_0%,transparent_50%)]' />

          {/* Grid pattern */}
          <div
            className='absolute inset-0 opacity-[0.05]'
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className='relative px-8 py-14 md:px-16 md:py-20 text-center'>
            <div className='inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6'>
              <Sparkles className='w-4 h-4 text-white' />
              <span className='text-white/90 text-sm font-medium'>
                ابدأ اليوم مجاناً
              </span>
            </div>

            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4'>
              صحتك النفسية أولوية
            </h2>
            <p className='text-lg text-white/70 max-w-2xl mx-auto mb-8'>
              لا تنتظر أكثر. احجز جلستك الأولى مع مستشار متخصص واتخذ الخطوة
              الأولى نحو حياة أفضل.
            </p>

            <div className='flex flex-wrap justify-center gap-4'>
              <Link
                href='/consultants'
                className='group inline-flex items-center gap-3 bg-white text-teal-dark rounded-2xl px-8 py-4 text-lg font-semibold hover:bg-white/95 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5'
              >
                احجز جلستك الآن
                <ArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform' />
              </Link>
              <Link
                href='/consultants'
                className='inline-flex items-center gap-3 border-2 border-white/30 text-white rounded-2xl px-8 py-4 text-lg font-medium hover:bg-white/10 hover:border-white/50 transition-all duration-300'
              >
                تصفح المستشارين
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
