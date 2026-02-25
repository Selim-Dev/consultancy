import { Star, Video } from 'lucide-react';
import Image from 'next/image';

import { Consultant } from '@/data/types';

interface ProfileHeaderProps {
  consultant: Consultant;
}

export default function ProfileHeader({ consultant }: ProfileHeaderProps) {
  return (
    <div className='bg-white rounded-2xl shadow-sm border border-border p-6 md:p-8'>
      <div className='flex flex-col md:flex-row gap-6'>
        {/* صورة المستشار */}
        <div className='shrink-0'>
          <div className='relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden'>
            <Image
              src={consultant.imageUrl}
              alt={consultant.name}
              fill
              className='object-cover'
            />
          </div>
        </div>

        {/* معلومات المستشار */}
        <div className='flex-1'>
          <h1 className='text-2xl md:text-3xl font-bold text-text mb-2'>
            {consultant.name}
          </h1>
          <p className='text-lg text-text-muted mb-4'>{consultant.title}</p>

          {/* التقييم وعدد الجلسات */}
          <div className='flex flex-wrap items-center gap-4 mb-4'>
            {/* التقييم */}
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(consultant.rating)
                        ? 'fill-amber text-amber'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className='text-text font-semibold'>
                {consultant.rating}
              </span>
              <span className='text-text-muted text-sm'>
                ({consultant.reviewCount} تقييم)
              </span>
            </div>

            {/* عدد الجلسات المكتملة */}
            <div className='flex items-center gap-2 text-text-muted'>
              <Video className='w-5 h-5' />
              <span className='text-sm'>
                {consultant.sessionsCompleted} جلسة مكتملة
              </span>
            </div>
          </div>

          {/* التخصصات */}
          <div className='flex flex-wrap gap-2 mb-4'>
            {consultant.specialties.map((specialty, index) => (
              <span
                key={index}
                className='px-3 py-1 bg-teal/10 text-teal rounded-lg text-sm font-medium'
              >
                {specialty}
              </span>
            ))}
          </div>

          {/* اللغات */}
          <div className='flex items-center gap-2 text-text-muted text-sm'>
            <span className='font-medium'>اللغات:</span>
            <span>{consultant.languages.join('، ')}</span>
          </div>
        </div>

        {/* السعر وزر الحجز */}
        <div className='flex flex-col items-center md:items-end justify-between gap-4 md:border-r md:border-border md:pr-6'>
          <div className='text-center md:text-left'>
            <div className='text-3xl font-bold text-teal mb-1'>
              {consultant.pricePerSession} {consultant.currency}
            </div>
            <div className='text-sm text-text-muted'>للجلسة الواحدة</div>
          </div>

          <button className='w-full md:w-auto bg-linear-to-l from-teal to-indigo text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5'>
            احجز موعدك الآن
          </button>
        </div>
      </div>
    </div>
  );
}
