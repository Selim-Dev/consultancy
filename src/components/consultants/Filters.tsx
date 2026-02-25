'use client';

import {
  ChevronDown,
  DollarSign,
  Languages,
  Star,
  Stethoscope,
  Users,
} from 'lucide-react';
import { useState } from 'react';

interface FilterSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  options: string[];
}

export default function Filters() {
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

  const hasActiveFilters = Object.values(selectedFilters).some(
    (filters) => filters.length > 0
  );

  return (
    <div className='hidden md:block w-80 shrink-0'>
      <div className='sticky top-24'>
        <div className='bg-white rounded-2xl shadow-sm border border-border p-6'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-bold text-text'>الفلاتر</h2>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className='text-sm text-teal hover:text-teal-dark transition'
              >
                مسح الكل
              </button>
            )}
          </div>

          {/* Filter Sections */}
          <div className='space-y-4'>
            {filterSections.map((section) => {
              const isOpen = openSections.includes(section.id);
              const activeCount =
                selectedFilters[section.id]?.length || 0;

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
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Section Options */}
                  {isOpen && (
                    <div className='space-y-2 pr-7'>
                      {section.options.map((option) => {
                        const isSelected = isFilterSelected(
                          section.id,
                          option
                        );

                        return (
                          <label
                            key={option}
                            className='flex items-center gap-2 cursor-pointer group'
                          >
                            <input
                              type='checkbox'
                              checked={isSelected}
                              onChange={() =>
                                toggleFilter(section.id, option)
                              }
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
      </div>
    </div>
  );
}
