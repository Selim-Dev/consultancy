'use client';

import { useState } from 'react';

import { consultants } from '@/data/consultants';

import ConsultantCard from '@/components/consultants/ConsultantCard';
import FilterBottomSheet from '@/components/consultants/FilterBottomSheet';
import Filters from '@/components/consultants/Filters';
import SearchBar from '@/components/consultants/SearchBar';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function ConsultantsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter consultants based on search query
  const filteredConsultants = consultants.filter((consultant) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        consultant.name.toLowerCase().includes(query) ||
        consultant.title.toLowerCase().includes(query) ||
        consultant.specialties.some((s) => s.toLowerCase().includes(query)) ||
        consultant.bio.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    return true;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-bg">
        {/* Search Section */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <h1 className="mb-4 text-3xl font-bold text-text">
              دليل المستشارين
            </h1>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-8 lg:flex-row-reverse">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block">
              <Filters />
            </aside>

            {/* Consultants Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-text-muted">
                  {filteredConsultants.length === consultants.length
                    ? `${consultants.length} مستشار متاح`
                    : `${filteredConsultants.length} من ${consultants.length} مستشار`}
                </p>
              </div>

              {/* Consultants Grid */}
              {filteredConsultants.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredConsultants.map((consultant) => (
                    <ConsultantCard key={consultant.id} consultant={consultant} />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg bg-white p-12 text-center shadow-sm">
                  <p className="text-lg text-text-muted">
                    لم يتم العثور على مستشارين يطابقون معايير البحث
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-teal hover:text-teal-dark"
                  >
                    مسح البحث
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <FilterBottomSheet />
      </main>

      <Footer />
    </div>
  );
}
