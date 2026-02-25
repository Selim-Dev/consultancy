// مستشار
export interface Consultant {
  id: string;
  name: string;
  title: string; // مثل: "أخصائي نفسي إكلينيكي"
  specialties: string[];
  rating: number; // 1-5
  reviewCount: number;
  sessionsCompleted: number;
  pricePerSession: number; // بالريال السعودي
  currency: string; // "SAR"
  gender: 'male' | 'female';
  languages: string[];
  imageUrl: string;
  bio: string;
  experience: string[];
  availableSlots: TimeSlot[];
  reviews: Review[];
  cancellationPolicy: string;
}

// خانة زمنية
export interface TimeSlot {
  date: string; // "2025-02-15"
  time: string; // "14:00"
  available: boolean;
}

// تقييم
export interface Review {
  id: string;
  alias: string; // اسم مستعار
  rating: number;
  comment: string;
  date: string;
}

// محتوى الصفحة الرئيسية
export interface LandingContent {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  steps: { icon: string; title: string; description: string }[];
  features: { icon: string; title: string; description: string }[];
  specialties: string[];
  testimonials: { alias: string; rating: number; quote: string }[];
  faq: { question: string; answer: string }[];
  blogPosts: {
    title: string;
    excerpt: string;
    imageUrl: string;
    date: string;
  }[];
}

// طرق الدفع
export type PaymentMethod =
  | 'mada'
  | 'visa'
  | 'mastercard'
  | 'apple_pay'
  | 'stc_pay';
