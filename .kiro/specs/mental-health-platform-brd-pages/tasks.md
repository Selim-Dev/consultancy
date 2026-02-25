# Implementation Plan: صفحات عرض BRD لمنصة الاستشارات النفسية

## Overview

بناء 4 صفحات عرض ثابتة (Static) لمنصة استشارات نفسية باللغة العربية (RTL) باستخدام Next.js 15 + TypeScript + Tailwind CSS 4. جميع البيانات وهمية — لا خادم خلفي ولا اختبارات. الهدف: لقطات شاشة احترافية لوثيقة BRD.

## Tasks

- [x] 1. إعداد نظام التصميم والألوان والخط العربي
  - [x] 1.1 تعديل `src/styles/globals.css` لإضافة ألوان المنصة (Teal/Indigo/Amber) وخط IBM Plex Sans Arabic ضمن `@theme`
    - إضافة متغيرات: `--color-teal`, `--color-indigo`, `--color-amber`, `--color-bg`, `--color-text`, `--color-text-muted`, `--color-border`
    - إضافة التدرجات اللونية الفاتحة والداكنة لكل لون
    - إضافة `--font-primary` للخط العربي
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 1.2 تعديل `src/app/layout.tsx` لتطبيق RTL والخط العربي
    - استيراد `IBM_Plex_Sans_Arabic` من `next/font/google`
    - تعيين `lang="ar"` و `dir="rtl"` على عنصر `<html>`
    - تطبيق `font-primary` و `bg-bg` و `text-text` على `<body>`
    - _Requirements: 1.3, 2.3, 2.4_

- [x] 2. إنشاء أنواع البيانات والبيانات الوهمية
  - [x] 2.1 إنشاء `src/data/types.ts` مع أنواع TypeScript
    - تعريف `Consultant`, `TimeSlot`, `Review`, `LandingContent`, `PaymentMethod`
    - _Requirements: 8.1_

  - [x] 2.2 إنشاء `src/data/consultants.ts` مع بيانات 6-8 مستشارين وهميين
    - أسماء عربية، تخصصات متنوعة (قلق، اكتئاب، علاقات، أطفال، إدمان، صدمات)
    - تقييمات بين 4.2-4.9، أسعار 200-450 ريال، مواعيد متاحة، تقييمات عملاء
    - استخدام صور placeholder (مثل `https://i.pravatar.cc/300?img=X`)
    - _Requirements: 8.1, 8.2, 8.4, 5.4_

  - [x] 2.3 إنشاء `src/data/landing.ts` مع محتوى الصفحة الرئيسية
    - نصوص تسويقية عربية بنبرة داعمة ومطمئنة
    - محتوى: hero, steps (3), features (4-6), specialties, testimonials, faq (5-7), blogPosts (3)
    - _Requirements: 8.1, 8.3, 8.4_

- [x] 3. إنشاء المكونات المشتركة (Shared Components)
  - [x] 3.1 إنشاء `src/components/ui/Card.tsx`
    - بطاقة عامة بزوايا مستديرة `rounded-2xl` وظل ناعم `shadow-sm` وحدود `border-border`
    - Props: `children`, `className?`
    - _Requirements: 1.4_

  - [x] 3.2 إنشاء `src/components/ui/TrustBadges.tsx`
    - 5 شارات: الدفع الآمن، التأكيد الفوري، جلسات فيديو، تشفير TLS، جاهزية ZATCA
    - أيقونات من `lucide-react`
    - _Requirements: 1.5, 4.11_

  - [x] 3.3 إنشاء `src/components/layout/Header.tsx`
    - شعار المنصة على اليمين (RTL)، روابط تنقل، زر تسجيل الدخول على اليسار
    - قائمة هامبرغر على الهاتف (responsive)
    - خلفية شفافة مع backdrop-blur عند التمرير
    - _Requirements: 2.2, 2.4, 3.1, 4.9_

  - [x] 3.4 إنشاء `src/components/layout/Footer.tsx`
    - 3 أعمدة: روابط سريعة، التخصصات، تواصل معنا
    - شارات الثقة (TrustBadges)، حقوق النشر
    - _Requirements: 4.10, 4.11_

  - [x] 3.5 إنشاء `src/components/consultants/ConsultantCard.tsx`
    - يعرض: صورة، اسم، تخصص، تقييم (نجوم)، سعر، أقرب موعد
    - رابط إلى `/consultants/{id}`
    - تأثيرات hover (shadow + translate)
    - Props: `consultant: Consultant`
    - _Requirements: 1.4, 1.5, 1.6, 4.4, 5.3, 5.5_

- [x] 4. Checkpoint — التحقق من المكونات المشتركة
  - Ensure all shared components compile correctly, ask the user if questions arise.

- [x] 5. بناء الصفحة الرئيسية (Landing Page)
  - [x] 5.1 إنشاء `src/components/landing/HeroSection.tsx`
    - عنوان رئيسي + عنوان فرعي + زر CTA + تدرج خلفية من Teal إلى Indigo
    - _Requirements: 1.2, 4.1_

  - [x] 5.2 إنشاء `src/components/landing/HowItWorks.tsx`
    - 3 خطوات مرقمة بأيقونات: اختر مستشارك ← احجز موعدك ← ابدأ جلستك
    - _Requirements: 4.2_

  - [x] 5.3 إنشاء `src/components/landing/WhyUs.tsx`
    - 4-6 بطاقات مزايا بأيقونات من lucide-react
    - _Requirements: 4.3_

  - [x] 5.4 إنشاء `src/components/landing/FeaturedConsultants.tsx`
    - عرض أول 3-4 مستشارين باستخدام ConsultantCard
    - _Requirements: 4.4_

  - [x] 5.5 إنشاء `src/components/landing/Specialties.tsx`
    - شرائح (Chips) قابلة للنقر بتخصصات المنصة
    - _Requirements: 4.5_

  - [x] 5.6 إنشاء `src/components/landing/Testimonials.tsx`
    - اقتباسات عملاء بأسماء مستعارة وتقييمات
    - _Requirements: 4.6_

  - [x] 5.7 إنشاء `src/components/landing/FAQ.tsx`
    - أكورديون أسئلة وأجوبة (5-7 أسئلة) مع toggle
    - _Requirements: 4.7_

  - [x] 5.8 إنشاء `src/components/landing/BlogPreview.tsx`
    - 3 بطاقات مقالات وهمية
    - _Requirements: 4.8_

  - [x] 5.9 تعديل `src/app/page.tsx` لتجميع أقسام الصفحة الرئيسية
    - استيراد Header + جميع أقسام Landing + Footer وترتيبها
    - _Requirements: 2.1, 4.1-4.11_

- [x] 6. بناء صفحة دليل المستشارين (Consultant Directory)
  - [x] 6.1 إنشاء `src/components/consultants/SearchBar.tsx`
    - حقل بحث نصي مع أيقونة بحث من lucide-react
    - _Requirements: 5.1_

  - [x] 6.2 إنشاء `src/components/consultants/Filters.tsx`
    - فلاتر جانبية: تخصص، جنس، لغة، نطاق سعر، تقييم
    - مرئية على سطح المكتب فقط (`hidden md:block`)
    - _Requirements: 3.3, 5.2_

  - [x] 6.3 إنشاء `src/components/consultants/FilterBottomSheet.tsx`
    - نفس الفلاتر كورقة سفلية (Bottom Sheet) على الهاتف
    - مرئية على الهاتف فقط (`md:hidden`)
    - _Requirements: 3.2, 5.2_

  - [x] 6.4 إنشاء `src/app/consultants/page.tsx`
    - تجميع: Header + SearchBar + Filters/FilterBottomSheet + شبكة ConsultantCards + Footer
    - عرض جميع المستشارين الوهميين (6-8)
    - _Requirements: 2.1, 5.1-5.5_

- [x] 7. بناء صفحة المستشار (Consultant Profile)
  - [x] 7.1 إنشاء `src/components/profile/ProfileHeader.tsx`
    - صورة + اسم + تخصص + تقييم + عدد جلسات + سعر
    - _Requirements: 6.1_

  - [x] 7.2 إنشاء `src/components/profile/ProfileTabs.tsx`
    - تبويبات: نبذة عني، الخبرات، التخصصات، التقييمات، سياسات الإلغاء
    - _Requirements: 6.2_

  - [x] 7.3 إنشاء `src/components/profile/CalendarSlots.tsx`
    - تقويم أسبوعي مع خانات زمنية قابلة للاختيار
    - عند النقر على خانة يتم تفعيل BookingModal
    - _Requirements: 6.3, 6.4_

  - [x] 7.4 إنشاء `src/components/profile/BookingModal.tsx`
    - Modal من 3 خطوات + شاشة تأكيد نهائي:
      1. تأكيد الموعد (عرض التاريخ والوقت المختار)
      2. معلومات سريعة (حقول نموذج بسيطة)
      3. اختيار طريقة الدفع (مدى، فيزا، ماستركارد، Apple Pay، STC Pay)
      4. شاشة تأكيد فوري (تفاصيل الموعد + رسالة تأكيد)
    - _Requirements: 6.4, 6.5, 6.6, 6.7, 6.8_

  - [x] 7.5 إنشاء `src/app/consultants/[id]/page.tsx`
    - تجميع: Header + ProfileHeader + ProfileTabs + CalendarSlots + BookingModal + عنصر تجربة الانضمام + Footer
    - جلب بيانات المستشار من البيانات الوهمية حسب `id`
    - استدعاء `notFound()` إذا كان المعرّف غير صالح
    - _Requirements: 2.1, 6.1-6.9_

- [ ] 8. Checkpoint — التحقق من الصفحات الثلاث الأساسية
  - Ensure all three main pages compile and render correctly, ask the user if questions arise.

- [ ]\* 9. بناء صفحة ردهة الانضمام المسبق (Pre-Join Lobby) — اختياري
  - إنشاء `src/app/lobby/page.tsx`
  - معاينة كاميرا وهمية (placeholder) مع مؤشر حالة التشغيل
  - مؤشر حالة ميكروفون مع شريط مستوى صوت وهمي
  - نصائح الخصوصية والسرية باللغة العربية
  - زر "ابدأ الجلسة" بارز في أسفل الصفحة
  - Header + Footer مشتركان
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 10. Final Checkpoint — التحقق النهائي
  - Ensure all pages compile and render correctly, ask the user if questions arise.

## Notes

- Task 9 (ردهة الانضمام) marked with `*` is optional and can be skipped
- جميع البيانات ثابتة في ملفات TypeScript — لا API ولا خادم خلفي
- لا اختبارات — المشروع للعرض التوضيحي فقط
- الألوان والخط معرّفة في Tailwind CSS 4 `@theme` — تُستخدم مباشرة كـ utility classes
- كل مكون يستخدم أيقونات من `lucide-react` وتأثيرات hover/transition من Tailwind
