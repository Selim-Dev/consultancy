'use client';

import { Calendar, Clock } from 'lucide-react';
import { useState } from 'react';

import { TimeSlot } from '@/data/types';

interface CalendarSlotsProps {
  slots: TimeSlot[];
  onSlotSelect: (slot: TimeSlot) => void;
}

export default function CalendarSlots({
  slots,
  onSlotSelect,
}: CalendarSlotsProps) {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // تجميع المواعيد حسب التاريخ
  const slotsByDate = slots.reduce(
    (acc, slot) => {
      if (!acc[slot.date]) {
        acc[slot.date] = [];
      }
      acc[slot.date].push(slot);
      return acc;
    },
    {} as Record<string, TimeSlot[]>
  );

  const handleSlotClick = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedSlot(slot);
      onSlotSelect(slot);
    }
  };

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString('ar-SA', { weekday: 'long' });
    const dayNumber = date.toLocaleDateString('ar-SA', { day: 'numeric' });
    const month = date.toLocaleDateString('ar-SA', { month: 'long' });
    return { dayName, dayNumber, month };
  };

  return (
    <div className='bg-white rounded-2xl shadow-sm border border-border p-6 md:p-8'>
      <div className='flex items-center gap-3 mb-6'>
        <Calendar className='w-6 h-6 text-teal' />
        <h3 className='text-xl font-bold text-text'>المواعيد المتاحة</h3>
      </div>

      <div className='space-y-6'>
        {Object.entries(slotsByDate).map(([date, dateSlots]) => {
          const { dayName, dayNumber, month } = formatDate(date);
          return (
            <div key={date}>
              {/* رأس التاريخ */}
              <div className='flex items-center gap-3 mb-3'>
                <div className='flex items-center gap-2 text-text'>
                  <span className='font-bold text-lg'>{dayName}</span>
                  <span className='text-text-muted'>
                    {dayNumber} {month}
                  </span>
                </div>
              </div>

              {/* خانات الوقت */}
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
                {dateSlots.map((slot, index) => (
                  <button
                    key={`${slot.date}-${slot.time}-${index}`}
                    onClick={() => handleSlotClick(slot)}
                    disabled={!slot.available}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      slot.available
                        ? selectedSlot?.date === slot.date &&
                          selectedSlot?.time === slot.time
                          ? 'bg-linear-to-l from-teal to-indigo text-white shadow-md'
                          : 'bg-teal/10 text-teal hover:bg-teal/20 hover:shadow-sm hover:-translate-y-0.5'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Clock className='w-4 h-4' />
                    <span>{slot.time}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ملاحظة */}
      <div className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl'>
        <p className='text-sm text-text-muted leading-relaxed'>
          <strong className='text-text'>ملاحظة:</strong> جميع المواعيد بتوقيت
          الرياض (GMT+3). يمكنك الانضمام للجلسة قبل 10 دقائق من الموعد المحدد.
        </p>
      </div>
    </div>
  );
}
