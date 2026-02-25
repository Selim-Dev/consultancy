'use client';

import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

import { landingContent } from '@/data/landing';

export default function FAQ() {
  const { faq } = landingContent;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='py-20 md:py-32 bg-bg relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/2 rounded-full blur-[100px]' />

      <div className='container mx-auto px-4 relative z-10'>
        {/* Section header */}
        <div className='text-center mb-14'>
          <div className='inline-flex items-center gap-2 bg-teal/10 rounded-full px-4 py-1.5 mb-4'>
            <HelpCircle className='w-3.5 h-3.5 text-teal' />
            <span className='text-teal text-sm font-medium'>أسئلة شائعة</span>
          </div>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4'>
            الأسئلة الشائعة
          </h2>
          <p className='text-lg text-text-muted max-w-2xl mx-auto'>
            إجابات على أكثر الأسئلة شيوعاً حول خدماتنا
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className='max-w-3xl mx-auto space-y-3'>
          {faq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'border-teal/30 shadow-lg shadow-teal/5'
                    : 'border-border hover:border-teal/20'
                }`}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className='w-full px-6 py-5 flex items-center justify-between text-right transition-colors'
                >
                  <span
                    className={`text-lg font-semibold pr-4 transition-colors duration-200 ${
                      isOpen ? 'text-teal' : 'text-text'
                    }`}
                  >
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen ? 'bg-teal text-white rotate-180' : 'bg-bg text-text-muted'
                    }`}
                  >
                    <ChevronDown className='w-4 h-4' />
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className='overflow-hidden'>
                    <div className='px-6 pb-5 pt-0'>
                      <div className='h-px bg-border mb-4' />
                      <p className='text-text-muted leading-relaxed'>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
