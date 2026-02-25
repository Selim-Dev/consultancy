import BlogPreview from '@/components/landing/BlogPreview';
import CTABanner from '@/components/landing/CTABanner';
import FAQ from '@/components/landing/FAQ';
import FeaturedConsultants from '@/components/landing/FeaturedConsultants';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import Specialties from '@/components/landing/Specialties';
import Testimonials from '@/components/landing/Testimonials';
import WhyUs from '@/components/landing/WhyUs';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <HowItWorks />
      <WhyUs />
      <FeaturedConsultants />
      {/* <Specialties /> */}
      <Testimonials />
      {/* <FAQ /> */}
      <BlogPreview />
      <CTABanner />
      <Footer />
    </main>
  );
}
