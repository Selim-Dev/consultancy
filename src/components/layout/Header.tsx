'use client';

import { Heart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect,useState } from 'react';

import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'المستشارين', href: '/consultants' },
  { label: 'المدونة', href: '/blog' },
  { label: 'تواصل معنا', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent',
      )}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16 md:h-20'>
          {/* Logo - على اليمين في RTL */}
          <Link href='/' className='flex items-center gap-2 group'>
            <Heart className='w-6 h-6 md:w-7 md:h-7 text-teal group-hover:text-teal-dark transition-colors' />
            <span className='text-xl md:text-2xl font-bold text-text'>
              سكينة
            </span>
          </Link>

          {/* Desktop Navigation - في الوسط */}
          <nav className='hidden md:flex items-center gap-8'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-text hover:text-teal transition-colors font-medium'
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Login Button - على اليسار في RTL */}
          <div className='hidden md:block'>
            <Link
              href='/login'
              className='bg-teal text-white rounded-xl px-6 py-2.5 hover:bg-teal-dark transition-colors font-medium'
            >
              تسجيل الدخول
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='md:hidden p-2 text-text hover:text-teal transition-colors'
            aria-label='القائمة'
          >
            {isMobileMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden py-4 border-t border-border bg-white/95 backdrop-blur-md'>
            <nav className='flex flex-col gap-4'>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='text-text hover:text-teal transition-colors font-medium px-2 py-2'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href='/login'
                className='bg-teal text-white rounded-xl px-6 py-2.5 hover:bg-teal-dark transition-colors font-medium text-center mt-2'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                تسجيل الدخول
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
