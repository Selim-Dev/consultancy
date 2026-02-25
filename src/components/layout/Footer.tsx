import { Heart, Mail, MapPin,Phone } from 'lucide-react';
import Link from 'next/link';

import TrustBadges from '@/components/ui/TrustBadges';

const quickLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'المستشارين', href: '/consultants' },
  { label: 'المدونة', href: '/blog' },
  { label: 'من نحن', href: '/about' },
  { label: 'سياسة الخصوصية', href: '/privacy' },
  { label: 'الشروط والأحكام', href: '/terms' },
];

const specialties = [
  'القلق والتوتر',
  'الاكتئاب',
  'العلاقات الزوجية',
  'الأطفال والمراهقين',
  'الإدمان والتعافي',
  'الصدمات النفسية',
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gradient-to-l from-teal/5 to-indigo/5 border-t border-border'>
      <div className='container mx-auto px-4 py-12'>
        {/* Trust Badges */}
        <div className='mb-12'>
          <TrustBadges />
        </div>

        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          {/* Column 1: روابط سريعة */}
          <div>
            <h3 className='text-lg font-bold text-text mb-4'>روابط سريعة</h3>
            <ul className='space-y-2'>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-text-muted hover:text-teal transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: التخصصات */}
          <div>
            <h3 className='text-lg font-bold text-text mb-4'>التخصصات</h3>
            <ul className='space-y-2'>
              {specialties.map((specialty) => (
                <li key={specialty}>
                  <Link
                    href={`/consultants?specialty=${encodeURIComponent(specialty)}`}
                    className='text-text-muted hover:text-teal transition-colors'
                  >
                    {specialty}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: تواصل معنا */}
          <div>
            <h3 className='text-lg font-bold text-text mb-4'>تواصل معنا</h3>
            <ul className='space-y-3'>
              <li className='flex items-center gap-2 text-text-muted'>
                <Mail className='w-5 h-5 text-teal' />
                <a
                  href='mailto:info@sakina.sa'
                  className='hover:text-teal transition-colors'
                >
                  info@sakina.sa
                </a>
              </li>
              <li className='flex items-center gap-2 text-text-muted'>
                <Phone className='w-5 h-5 text-teal' />
                <a
                  href='tel:+966920000000'
                  className='hover:text-teal transition-colors'
                >
                  920000000
                </a>
              </li>
              <li className='flex items-start gap-2 text-text-muted'>
                <MapPin className='w-5 h-5 text-teal mt-0.5' />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='pt-8 border-t border-border'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            {/* Logo & Copyright */}
            <div className='flex items-center gap-2'>
              <Heart className='w-5 h-5 text-teal' />
              <span className='text-text-muted text-sm'>
                © {currentYear} سكينة. جميع الحقوق محفوظة.
              </span>
            </div>

            {/* Additional Info */}
            <div className='text-text-muted text-sm text-center md:text-left'>
              منصة استشارات نفسية مرخصة من الهيئة السعودية للتخصصات الصحية
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
