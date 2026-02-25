'use client';

import { Clock, Video } from 'lucide-react';
import { notFound } from 'next/navigation';
import { use, useState } from 'react';

import { consultants } from '@/data/consultants';
import { TimeSlot } from '@/data/types';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BookingModal from '@/components/profile/BookingModal';
import CalendarSlots from '@/components/profile/CalendarSlots';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';

interface ConsultantProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ConsultantProfilePage({
  params,
}: ConsultantProfilePageProps) {
  const { id } = use(params);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // البحث عن المستشار
  const consultant = consultants.find((c) => c.id === id);

  // إذا لم يتم العثور على المستشار، عرض صفحة 404
  if (!consultant) {
    notFound();
  }

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  return (
    <div className='min-h-screen bg-bg'>
      <Header />

      <main className='container mx-auto px-4 py-8 md:py-12'>
        <div className='max-w-6xl mx-auto space-y-8'>
          {/* رأس الملف الشخصي */}
          <ProfileHeader consultant={consultant} />

          {/* التبويبات */}
          <ProfileTabs consultant={consultant} />

          {/* تقويم المواعيد */}
          <CalendarSlots
            slots={consultant.availableSlots}
            onSlotSelect={handleSlotSelect}
          />

          {/* عنصر تجربة الانضمام للجلسة */}
          <div className='bg-linear-to-l from-teal/10 to-indigo/10 rounded-2xl p-6 md:p-8 border border-teal/20'>
            <div className='flex flex-col md:flex-row items-center gap-6'>
              <div className='shrink-0'>
                <div className='w-16 h-16 bg-linear-to-l from-teal to-indigo rounded-full flex items-center justify-center'>
                  <Video className='w-8 h-8 text-white' />
                </div>
              </div>

              <div className='flex-1 text-center md:text-right'>
                <h3 className='text-xl font-bold text-text mb-2'>
                  جلسات فيديو آمنة داخل المنصة
                </h3>
                <p className='text-text-muted leading-relaxed'>
                  جميع الجلسات تتم عبر نظام الفيديو الآمن داخل المنصة. لا حاجة
                  لتطبيقات خارجية. يمكنك الانضمام قبل 10 دقائق من الموعد لفحص
                  الكاميرا والميكروفون.
                </p>
              </div>

              <div className='shrink-0'>
                <div className='flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-teal/20'>
                  <Clock className='w-5 h-5 text-teal' />
                  <span className='text-sm font-medium text-text'>
                    انضم قبل 10 دقائق
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* نافذة الحجز */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedSlot={selectedSlot}
        consultantName={consultant.name}
        consultantPrice={consultant.pricePerSession}
        currency={consultant.currency}
      />
    </div>
  );
}
