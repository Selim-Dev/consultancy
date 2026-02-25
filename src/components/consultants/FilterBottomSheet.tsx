'use client';

import {
  ChevronDown,
  DollarSign,
  Filter,
  Languages,
  Star,
  Stethoscope,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface FilterSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  options: string[];
}

export default function FilterBottomSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([
    'specialty',
    'gender',
    'language',
    'price',
    'rating',
  ]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const filterSections: FilterSection[] = [
    {
      id: 'specialty',
      title: 'التخصص',
      icon: <Stethoscope className='w-5 h-5' />,
      options: [
        'القلق',
        'الاكتئاب',
        'العلاقات الزوجية',
        'العلاقات الأسرية',
        'الأطفال',
        'المراهقين',
        'الإدمان',
        'الصدمات النفسية',
        'ضغوط العمل',
        'اضطرابات النوم',
      ],
    },
    {
      id: 'gender',
      title: 'الجنس',
      icon: <Users className='w-5 h-5' />,
      options: ['ذكر', 'أنثى'],
    },
    {
      id: 'language',
      title: 'اللغة',
      icon: <Languages className='w-5 h-5' />,
      options: ['العربية', 'الإنجليزية', 'الفرنسية'],
    },
    {
      id: 'price',
      title: 'نطاق السعر',
      icon: <DollarSign className='w-5 h-5' />,
      options: [
        'أقل من 250 ريال',
        '250 - 350 ريال',
        '350 - 450 ريال',
        'أكثر من 450 ريال',
      ],
    },
    {
      id: 'rating',
      title: 'التقييم',
      icon: <Star className='w-5 h-5' />,
      options: ['4.5 وأعلى', '4.0 وأعلى', '3.5 وأعلى', 'جميع التقييمات'],
    },
  ];

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleFilter = (sectionId: string, option: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[sectionId] || [];
      const isSelected = currentFilters.includes(option);

      return {
        ...prev,
        [sectionId]: isSelected
          ? currentFilters.filter((item) => item !== option)
          : [...currentFilters, option],
      };
    });
  };

  const isFilterSelected = (sectionId: string, option: string) => {
    return selectedFilters[sectionId]?.includes(option) || false;
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  const applyFilters = () => {
    setIsOpen(false);
    // In a real app, this would trigger filtering logic
  };

  const hasActiveFilters = Object.values(selectedFilters).some(
    (filters) => filters.length > 0
  );

  const totalActiveFilters = Object.values(selectedFilters).reduce(
    (sum, filters) => sum + filters.length,
    0
  );

  return (
    <>
      {/* Trigger Button - Mobile Only */}
      <button
        onClick={() => setIsOpen(true)}
        className='md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-linear-to-l from-teal to-indigo text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:shadow-xl transition'
      >
        <Filter className='w-5 h-5' />
        <span className='font-semibold'>الفلاتر</span>
        {totalActiveFilters > 0 && (
          <span className='bg-white text-teal text-xs px-2 py-0.5 rounded-full font-bold'>
            {totalActiveFilters}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className='md:hidden fixed inset-0 bg-black/50 z-50 transition-opacity'
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '85vh' }}
      >
        {/* Handle Bar */}
        <div className='flex justify-center pt-3 pb-2'>
          <div className='w-12 h-1 bg-border rounded-full' />
        </div>

        {/* Header */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-border'>
          <h2 className='text-xl font-bold text-text'>الفلاتر</h2>
          <button
            onClick={() => setIsOpen(false)}
            className='p-2 hover:bg-bg rounded-lg transition'
          >
            <X className='w-6 h-6 text-text-muted' />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className='overflow-y-auto px-6 py-4' style={{ maxHeight: 'calc(85vh - 180px)' }}>
          <div className='space-y-4'>
            {filterSections.map((section) => {
              const isOpenSection = openSections.includes(section.id);
              const activeCount = selectedFilters[section.id]?.length || 0;

              return (
                <div
                  key={section.id}
                  className='border-b border-border last:border-b-0 pb-4 last:pb-0'
                >
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className='w-full flex items-center justify-between mb-3 hover:text-teal transition'
                  >
                    <div className='flex items-center gap-2'>
                      <span className='text-teal'>{section.icon}</span>
                      <span className='font-semibold text-text'>
                        {section.title}
                      </span>
                      {activeCount > 0 && (
                        <span className='bg-teal text-white text-xs px-2 py-0.5 rounded-full'>
                          {activeCount}
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-text-muted transition-transform ${
                        isOpenSection ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Section Options */}
                  {isOpenSection && (
                    <div className='space-y-2 pr-7'>
                      {section.options.map((option) => {
                        const isSelected = isFilterSelected(section.id, option);

                        return (
                          <label
                            key={option}
                            className='flex items-center gap-2 cursor-pointer group'
                          >
                            <input
                              type='checkbox'
                              checked={isSelected}
                              onChange={() => toggleFilter(section.id, option)}
                              className='w-4 h-4 rounded border-border text-teal focus:ring-teal focus:ring-offset-0 cursor-pointer'
                            />
                            <span className='text-sm text-text-muted group-hover:text-text transition'>
                              {option}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className='flex items-center gap-3 px-6 py-4 border-t border-border bg-bg'>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className='flex-1 border border-teal text-teal rounded-xl px-6 py-3 font-semibold hover:bg-teal/10 transition'
            >
              مسح الكل
            </button>
          )}
          <button
            onClick={applyFilters}
            className={`${hasActiveFilters ? 'flex-1' : 'w-full'} bg-linear-to-l from-teal to-indigo text-white rounded-xl px-6 py-3 font-semibold hover:shadow-lg transition`}
          >
            تطبيق
          </button>
        </div>
      </div>
    </>
  );
}
