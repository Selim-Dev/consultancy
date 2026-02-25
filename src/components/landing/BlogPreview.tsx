import { ArrowLeft,Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { landingContent } from '@/data/landing';

import Card from '@/components/ui/Card';

export default function BlogPreview() {
  const { blogPosts } = landingContent;

  return (
    <section className='py-16 md:py-24 bg-bg'>
      <div className='container mx-auto px-4'>
        {/* Section Title */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-text mb-4'>
            مقالات مفيدة
          </h2>
          <p className='text-lg text-text-muted max-w-2xl mx-auto'>
            اقرأ مقالاتنا لتتعرف أكثر على الصحة النفسية وطرق العناية بها
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className='overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1'
            >
              {/* Image */}
              <div className='relative w-full h-48'>
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className='object-cover'
                />
              </div>

              {/* Content */}
              <div className='p-6'>
                {/* Date */}
                <div className='flex items-center gap-2 text-sm text-text-muted mb-3'>
                  <Calendar className='w-4 h-4' />
                  <span>
                    {new Date(post.date).toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                {/* Title */}
                <h3 className='text-xl font-bold text-text mb-3 line-clamp-2'>
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className='text-text-muted leading-relaxed mb-4 line-clamp-3'>
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <Link
                  href='#'
                  className='inline-flex items-center gap-2 text-teal font-semibold hover:gap-3 transition-all duration-200'
                >
                  اقرأ المزيد
                  <ArrowLeft className='w-4 h-4' />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
