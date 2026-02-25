import { Calendar,Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Consultant } from '@/data/types';

import Card from '@/components/ui/Card';

interface ConsultantCardProps {
  consultant: Consultant;
}

export default function ConsultantCard({ consultant }: ConsultantCardProps) {
  // Find the nearest available slot
  const nearestSlot = consultant.availableSlots.find((slot) => slot.available);
  const nearestDate = nearestSlot
    ? new Date(nearestSlot.date).toLocaleDateString('ar-SA', {
        month: 'short',
        day: 'numeric',
      })
    : 'غير متاح';

  return (
    <Link href={`/consultants/${consultant.id}`}>
      <Card className='p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer h-full'>
        <div className='flex flex-col h-full'>
          {/* Image & Basic Info */}
          <div className='flex items-start gap-4 mb-4'>
            <div className='relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0'>
              <Image
                src={consultant.imageUrl}
                alt={consultant.name}
                fill
                className='object-cover'
              />
            </div>

            <div className='flex-1 min-w-0'>
              <h3 className='text-lg font-bold text-text mb-1 truncate'>
                {consultant.name}
              </h3>
              <p className='text-sm text-text-muted mb-2 line-clamp-2'>
                {consultant.title}
              </p>

              {/* Rating */}
              <div className='flex items-center gap-1'>
                <Star className='w-4 h-4 fill-amber text-amber' />
                <span className='text-sm font-semibold text-text'>
                  {consultant.rating.toFixed(1)}
                </span>
                <span className='text-xs text-text-muted'>
                  ({consultant.reviewCount} تقييم)
                </span>
              </div>
            </div>
          </div>

          {/* Specialty */}
          <div className='mb-4'>
            <div className='flex flex-wrap gap-2'>
              {consultant.specialties.slice(0, 2).map((specialty, index) => (
                <span
                  key={index}
                  className='text-xs bg-teal/10 text-teal px-3 py-1 rounded-full'
                >
                  {specialty}
                </span>
              ))}
              {consultant.specialties.length > 2 && (
                <span className='text-xs bg-gray-100 text-text-muted px-3 py-1 rounded-full'>
                  +{consultant.specialties.length - 2}
                </span>
              )}
            </div>
          </div>

          {/* Price & Next Available */}
          <div className='mt-auto pt-4 border-t border-border flex items-center justify-between'>
            <div>
              <p className='text-xs text-text-muted mb-1'>السعر</p>
              <p className='text-lg font-bold text-teal'>
                {consultant.pricePerSession} {consultant.currency}
              </p>
            </div>

            <div className='text-left'>
              <p className='text-xs text-text-muted mb-1'>أقرب موعد</p>
              <div className='flex items-center gap-1 text-sm font-medium text-text'>
                <Calendar className='w-4 h-4' />
                <span>{nearestDate}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
