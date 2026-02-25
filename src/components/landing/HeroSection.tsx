'use client';

import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Shield,
  Sparkles,
  Star,
  Video,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { landingContent } from '@/data/landing';

const floatingStats = [
  { icon: Star, label: '+٥٠٠٠ جلسة ناجحة', color: 'text-amber' },
  { icon: Shield, label: 'سرية تامة ١٠٠٪', color: 'text-teal' },
  { icon: Heart, label: '+٩٨٪ رضا العملاء', color: 'text-rose-500' },
];

export default function HeroSection() {
  const { hero } = landingContent;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className='relative min-h-screen flex items-center overflow-hidden bg-[#0a0e1a]' dir='rtl'>
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,164,0.15)_0%,transparent_50%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.15)_0%,transparent_50%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,164,0.05)_0%,transparent_70%)]' />
      </div>
      <div className='absolute top-20 right-[10%] w-72 h-72 bg-teal/10 rounded-full blur-[100px] animate-pulse' />
      <div className='absolute bottom-20 left-[10%] w-96 h-96 bg-indigo/10 rounded-full blur-[120px] animate-pulse [animation-delay:1s]' />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[150px]' />
      <div
        className='absolute inset-0 opacity-[0.03]'
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className='absolute inset-0 overflow-hidden'>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className='absolute w-1 h-1 bg-teal/30 rounded-full animate-pulse'
            style={{ top: `${15 + i * 15}%`, left: `${10 + i * 16}%`, animationDelay: `${i * 0.5}s`, animationDuration: `${2 + i * 0.5}s` }}
          />
        ))}
      </div>

      <div className='container mx-auto px-4 relative z-10 pt-24 pb-16'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className='inline-flex items-center gap-2 bg-teal/10 border border-teal/20 rounded-full px-4 py-2 mb-8'>
              <Sparkles className='w-4 h-4 text-teal' />
              <span className='text-teal text-sm font-medium'>المنصة الأولى للصحة النفسية في المملكة</span>
            </div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.2]'>
              {hero.title.split(' ').map((word, i) => (
                <span key={i} className={i >= hero.title.split(' ').length - 1 ? 'bg-linear-to-l from-teal-light to-teal bg-clip-text text-transparent' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className='text-lg md:text-xl text-white/60 mb-10 leading-relaxed max-w-xl'>{hero.subtitle}</p>
            <div className='flex flex-wrap gap-4 mb-12'>
              <Link href='/consultants' className='group relative inline-flex items-center gap-3 bg-linear-to-l from-teal to-teal-dark text-white rounded-2xl px-8 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(14,165,164,0.3)] hover:-translate-y-0.5'>
                <span className='absolute inset-0 rounded-2xl bg-linear-to-l from-teal-light to-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                <span className='relative'>{hero.ctaText}</span>
                <ArrowLeft className='relative w-5 h-5 group-hover:-translate-x-1 transition-transform' />
              </Link>
              <Link href='#how-it-works' className='inline-flex items-center gap-3 border border-white/10 text-white/80 rounded-2xl px-8 py-4 text-lg font-medium hover:bg-white/5 hover:border-white/20 transition-all duration-300'>
                <Video className='w-5 h-5' />
                كيف تعمل المنصة؟
              </Link>
            </div>
            <div className='flex flex-wrap gap-6'>
              {floatingStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className='flex items-center gap-2 text-white/50'>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                    <span className='text-sm'>{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`hidden lg:block transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className='relative'>
              <div className='relative bg-white/3 backdrop-blur-xl border border-white/8 rounded-3xl p-8 shadow-2xl'>
                <div className='absolute -inset-1 bg-linear-to-l from-teal/20 to-indigo/20 rounded-3xl blur-xl opacity-50' />
                <div className='relative space-y-6'>
                  <div className='flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/6'>
                    <div className='w-14 h-14 rounded-full bg-linear-to-br from-teal to-indigo flex items-center justify-center text-white text-xl font-bold shrink-0'>د</div>
                    <div className='flex-1 min-w-0'>
                      <h4 className='text-white font-semibold'>د. سارة الأحمد</h4>
                      <p className='text-white/40 text-sm'>أخصائية نفسية إكلينيكية</p>
                      <div className='flex items-center gap-1 mt-1'>
                        {[...Array(5)].map((_, i) => (<Star key={i} className='w-3 h-3 fill-amber text-amber' />))}
                        <span className='text-white/30 text-xs mr-1'>(٤.٩)</span>
                      </div>
                    </div>
                    <div className='bg-teal/20 text-teal text-xs font-medium px-3 py-1.5 rounded-full'>متاحة الآن</div>
                  </div>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='bg-white/5 rounded-xl p-4 border border-white/6 text-center'>
                      <Video className='w-6 h-6 text-teal mx-auto mb-2' />
                      <p className='text-white/80 text-sm font-medium'>جلسة فيديو</p>
                      <p className='text-white/30 text-xs mt-1'>٥٠ دقيقة</p>
                    </div>
                    <div className='bg-white/5 rounded-xl p-4 border border-white/6 text-center'>
                      <Shield className='w-6 h-6 text-indigo-light mx-auto mb-2' />
                      <p className='text-white/80 text-sm font-medium'>مشفرة بالكامل</p>
                      <p className='text-white/30 text-xs mt-1'>TLS 256-bit</p>
                    </div>
                  </div>
                  <div className='bg-teal/10 border border-teal/20 rounded-2xl rounded-br-sm p-4'>
                    <div className='flex items-start gap-3'>
                      <MessageCircle className='w-5 h-5 text-teal shrink-0 mt-0.5' />
                      <p className='text-white/60 text-sm leading-relaxed'>&ldquo;أشعر براحة كبيرة بعد الجلسة. شكراً لك دكتورة.&rdquo;</p>
                    </div>
                  </div>
                  <button className='w-full bg-linear-to-l from-teal to-teal-dark text-white rounded-xl py-3.5 font-semibold text-sm hover:shadow-lg transition-all duration-300'>
                    احجز جلستك الآن — ١٩٩ ر.س
                  </button>
                </div>
              </div>
              <div className='absolute -top-4 -left-4 bg-white/6 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-xl animate-[bounce_3s_ease-in-out_infinite]'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center'><Heart className='w-4 h-4 text-green-400' /></div>
                  <div><p className='text-white/80 text-xs font-medium'>جلسة مكتملة</p><p className='text-white/40 text-[10px]'>منذ ٣ دقائق</p></div>
                </div>
              </div>
              <div className='absolute -bottom-4 -right-4 bg-white/6 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-xl animate-[bounce_3s_ease-in-out_infinite] [animation-delay:1.5s]'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 bg-amber/20 rounded-full flex items-center justify-center'><Star className='w-4 h-4 text-amber' /></div>
                  <div><p className='text-white/80 text-xs font-medium'>تقييم جديد ٥/٥</p><p className='text-white/40 text-[10px]'>منذ ٥ دقائق</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-bg to-transparent' />
    </section>
  );
}
