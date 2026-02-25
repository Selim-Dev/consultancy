'use client';

import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';

import { PaymentMethod, TimeSlot } from '@/data/types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSlot: TimeSlot | null;
  consultantName: string;
  consultantPrice: number;
  currency: string;
}

type BookingStep = 1 | 2 | 3 | 'confirmation';

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  reason: string;
  paymentMethod: PaymentMethod | null;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedSlot,
  consultantName,
  consultantPrice,
  currency,
}: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    reason: '',
    paymentMethod: null,
  });

  if (!isOpen || !selectedSlot) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleNext = () => {
    if (currentStep === 1) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(3);
    else if (currentStep === 3) setCurrentStep('confirmation');
  };

  const handleBack = () => {
    if (currentStep === 2) setCurrentStep(1);
    else if (currentStep === 3) setCurrentStep(2);
  };

  const handlePaymentSelect = (method: PaymentMethod) => {
    setFormData({ ...formData, paymentMethod: method });
  };

  const paymentMethods = [
    { id: 'mada' as PaymentMethod, name: 'مدى', logo: '💳' },
    { id: 'visa' as PaymentMethod, name: 'فيزا', logo: '💳' },
    { id: 'mastercard' as PaymentMethod, name: 'ماستركارد', logo: '💳' },
    { id: 'apple_pay' as PaymentMethod, name: 'Apple Pay', logo: '' },
    { id: 'stc_pay' as PaymentMethod, name: 'STC Pay', logo: '📱' },
  ];

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        {/* رأس النافذة */}
        <div className='sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between'>
          <h2 className='text-2xl font-bold text-text'>
            {currentStep === 'confirmation' ? 'تم تأكيد الحجز' : 'حجز موعد'}
          </h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
          >
            <X className='w-6 h-6 text-text-muted' />
          </button>
        </div>

        {/* مؤشر الخطوات */}
        {currentStep !== 'confirmation' && (
          <div className='px-6 py-4 border-b border-border'>
            <div className='flex items-center justify-between'>
              {[1, 2, 3].map((step) => (
                <div key={step} className='flex items-center flex-1'>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= step
                        ? 'bg-teal text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        currentStep > step ? 'bg-teal' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className='flex items-center justify-between mt-2'>
              <span className='text-xs text-text-muted'>تأكيد الموعد</span>
              <span className='text-xs text-text-muted'>معلومات سريعة</span>
              <span className='text-xs text-text-muted'>الدفع</span>
            </div>
          </div>
        )}

        {/* محتوى الخطوات */}
        <div className='p-6'>
          {/* الخطوة 1: تأكيد الموعد */}
          {currentStep === 1 && (
            <div className='space-y-6'>
              <div className='text-center'>
                <h3 className='text-xl font-bold text-text mb-2'>
                  تأكيد الموعد
                </h3>
                <p className='text-text-muted'>
                  يرجى مراجعة تفاصيل الموعد قبل المتابعة
                </p>
              </div>

              <div className='bg-linear-to-l from-teal/10 to-indigo/10 rounded-xl p-6 space-y-4'>
                <div className='flex items-center gap-3'>
                  <User className='w-5 h-5 text-teal' />
                  <div>
                    <div className='text-sm text-text-muted'>المستشار</div>
                    <div className='font-semibold text-text'>
                      {consultantName}
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <Calendar className='w-5 h-5 text-teal' />
                  <div>
                    <div className='text-sm text-text-muted'>التاريخ</div>
                    <div className='font-semibold text-text'>
                      {formatDate(selectedSlot.date)}
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <Clock className='w-5 h-5 text-teal' />
                  <div>
                    <div className='text-sm text-text-muted'>الوقت</div>
                    <div className='font-semibold text-text'>
                      {selectedSlot.time}
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <CreditCard className='w-5 h-5 text-teal' />
                  <div>
                    <div className='text-sm text-text-muted'>التكلفة</div>
                    <div className='font-semibold text-text'>
                      {consultantPrice} {currency}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* الخطوة 2: معلومات سريعة */}
          {currentStep === 2 && (
            <div className='space-y-6'>
              <div className='text-center'>
                <h3 className='text-xl font-bold text-text mb-2'>
                  معلومات سريعة
                </h3>
                <p className='text-text-muted'>
                  نحتاج بعض المعلومات الأساسية لإتمام الحجز
                </p>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-text mb-2'>
                    الاسم الكامل
                  </label>
                  <input
                    type='text'
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className='w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal'
                    placeholder='أدخل اسمك الكامل'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-text mb-2'>
                    رقم الجوال
                  </label>
                  <input
                    type='tel'
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className='w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal'
                    placeholder='05xxxxxxxx'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-text mb-2'>
                    البريد الإلكتروني
                  </label>
                  <input
                    type='email'
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className='w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal'
                    placeholder='example@email.com'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-text mb-2'>
                    سبب الاستشارة (اختياري)
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData({ ...formData, reason: e.target.value })
                    }
                    rows={3}
                    className='w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal resize-none'
                    placeholder='اكتب سبب الاستشارة بشكل مختصر...'
                  />
                </div>
              </div>
            </div>
          )}

          {/* الخطوة 3: اختيار طريقة الدفع */}
          {currentStep === 3 && (
            <div className='space-y-6'>
              <div className='text-center'>
                <h3 className='text-xl font-bold text-text mb-2'>
                  اختر طريقة الدفع
                </h3>
                <p className='text-text-muted'>
                  جميع المعاملات آمنة ومشفرة بتقنية TLS
                </p>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentSelect(method.id)}
                    className={`p-4 border-2 rounded-xl transition-all duration-200 hover:shadow-md ${
                      formData.paymentMethod === method.id
                        ? 'border-teal bg-teal/5'
                        : 'border-border hover:border-teal/50'
                    }`}
                  >
                    <div className='flex items-center justify-center gap-3'>
                      <span className='text-3xl'>{method.logo}</span>
                      <span className='font-semibold text-text'>
                        {method.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className='bg-blue-50 border border-blue-200 rounded-xl p-4'>
                <p className='text-sm text-text-muted leading-relaxed'>
                  <strong className='text-text'>ملاحظة:</strong> سيتم خصم المبلغ
                  بعد تأكيد الحجز. يمكنك الإلغاء وفقاً لسياسة الإلغاء الخاصة
                  بالمستشار.
                </p>
              </div>
            </div>
          )}

          {/* شاشة التأكيد النهائي */}
          {currentStep === 'confirmation' && (
            <div className='space-y-6 text-center py-8'>
              <div className='flex justify-center'>
                <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center'>
                  <CheckCircle className='w-12 h-12 text-green-600' />
                </div>
              </div>

              <div>
                <h3 className='text-2xl font-bold text-text mb-2'>
                  تم تأكيد حجزك بنجاح!
                </h3>
                <p className='text-text-muted'>
                  تم إرسال تفاصيل الموعد إلى بريدك الإلكتروني
                </p>
              </div>

              <div className='bg-linear-to-l from-teal/10 to-indigo/10 rounded-xl p-6 space-y-3 text-right'>
                <div className='flex items-center justify-between'>
                  <span className='text-text-muted'>المستشار:</span>
                  <span className='font-semibold text-text'>
                    {consultantName}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-text-muted'>التاريخ:</span>
                  <span className='font-semibold text-text'>
                    {formatDate(selectedSlot.date)}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-text-muted'>الوقت:</span>
                  <span className='font-semibold text-text'>
                    {selectedSlot.time}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-text-muted'>رقم الحجز:</span>
                  <span className='font-semibold text-text'>
                    #BK{Math.floor(Math.random() * 100000)}
                  </span>
                </div>
              </div>

              <div className='bg-amber/10 border border-amber/20 rounded-xl p-4'>
                <p className='text-sm text-text-muted leading-relaxed'>
                  <strong className='text-text'>تذكير:</strong> يمكنك الانضمام
                  للجلسة قبل 10 دقائق من الموعد المحدد. سنرسل لك تذكيراً قبل
                  الموعد بـ 24 ساعة.
                </p>
              </div>

              <button
                onClick={onClose}
                className='w-full bg-linear-to-l from-teal to-indigo text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200'
              >
                حسناً، شكراً
              </button>
            </div>
          )}
        </div>

        {/* أزرار التنقل */}
        {currentStep !== 'confirmation' && (
          <div className='sticky bottom-0 bg-white border-t border-border p-6 flex items-center justify-between gap-4'>
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className='flex items-center gap-2 px-6 py-3 border border-border text-text rounded-xl hover:bg-gray-50 transition-colors'
              >
                <ChevronRight className='w-5 h-5' />
                رجوع
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={
                (currentStep === 2 &&
                  (!formData.name || !formData.phone || !formData.email)) ||
                (currentStep === 3 && !formData.paymentMethod)
              }
              className='flex-1 flex items-center justify-center gap-2 bg-linear-to-l from-teal to-indigo text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {currentStep === 3 ? 'تأكيد الدفع' : 'التالي'}
              <ChevronLeft className='w-5 h-5' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
