'use client';

import { Award, FileText, Star, XCircle } from 'lucide-react';
import { useState } from 'react';

import { Consultant } from '@/data/types';

interface ProfileTabsProps {
  consultant: Consultant;
}

type TabType = 'about' | 'experience' | 'specialties' | 'reviews' | 'policy';

export default function ProfileTabs({ consultant }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('about');

  const tabs = [
    { id: 'about' as TabType, label: 'نبذة عني', icon: FileText },
    { id: 'experience' as TabType, label: 'الخبرات', icon: Award },
    { id: 'specialties' as TabType, label: 'التخصصات', icon: Star },
    { id: 'reviews' as TabType, label: 'التقييمات', icon: Star },
    { id: 'policy' as TabType, label: 'سياسات الإلغاء', icon: XCircle },
  ];

  return (
    <div className='bg-white rounded-2xl shadow-sm border border-border overflow-hidden'>
      {/* التبويبات */}
      <div className='flex overflow-x-auto border-b border-border'>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'text-teal border-b-2 border-teal bg-teal/5'
                  : 'text-text-muted hover:text-text hover:bg-gray-50'
              }`}
            >
              <Icon className='w-5 h-5' />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* محتوى التبويبات */}
      <div className='p-6 md:p-8'>
        {activeTab === 'about' && (
          <div>
            <h3 className='text-xl font-bold text-text mb-4'>نبذة عني</h3>
            <p className='text-text-muted leading-relaxed'>{consultant.bio}</p>
          </div>
        )}

        {activeTab === 'experience' && (
          <div>
            <h3 className='text-xl font-bold text-text mb-4'>الخبرات</h3>
            <ul className='space-y-3'>
              {consultant.experience.map((exp, index) => (
                <li
                  key={index}
                  className='flex items-start gap-3 text-text-muted'
                >
                  <div className='w-2 h-2 rounded-full bg-teal mt-2 shrink-0' />
                  <span className='leading-relaxed'>{exp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'specialties' && (
          <div>
            <h3 className='text-xl font-bold text-text mb-4'>التخصصات</h3>
            <div className='flex flex-wrap gap-3'>
              {consultant.specialties.map((specialty, index) => (
                <div
                  key={index}
                  className='px-4 py-2 bg-linear-to-l from-teal/10 to-indigo/10 text-teal rounded-xl font-medium border border-teal/20'
                >
                  {specialty}
                </div>
              ))}
            </div>
            <p className='text-text-muted mt-6 leading-relaxed'>
              يتخصص {consultant.name} في مجالات متعددة تشمل{' '}
              {consultant.specialties.join('، ')}. يستخدم أساليب علاجية حديثة
              ومثبتة علمياً لتقديم أفضل رعاية ممكنة.
            </p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h3 className='text-xl font-bold text-text mb-6'>
              التقييمات ({consultant.reviewCount})
            </h3>
            <div className='space-y-4'>
              {consultant.reviews.map((review) => (
                <div
                  key={review.id}
                  className='p-4 bg-gray-50 rounded-xl border border-border'
                >
                  <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center gap-3'>
                      <span className='font-semibold text-text'>
                        {review.alias}
                      </span>
                      <div className='flex items-center gap-1'>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-amber text-amber'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className='text-sm text-text-muted'>
                      {new Date(review.date).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  <p className='text-text-muted leading-relaxed'>
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'policy' && (
          <div>
            <h3 className='text-xl font-bold text-text mb-4'>
              سياسات الإلغاء
            </h3>
            <div className='p-4 bg-amber/10 border border-amber/20 rounded-xl'>
              <p className='text-text-muted leading-relaxed'>
                {consultant.cancellationPolicy}
              </p>
            </div>
            <div className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl'>
              <p className='text-sm text-text-muted leading-relaxed'>
                <strong className='text-text'>ملاحظة:</strong> نحن نتفهم أن
                الظروف قد تتغير. يرجى إلغاء موعدك في أقرب وقت ممكن لإتاحة الفرصة
                لعملاء آخرين.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
