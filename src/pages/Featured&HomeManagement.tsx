import FeaturedSection from '@/components/FeaturedAndHomeComponents/FeaturedSection';
import HomeBannersSection from '@/components/FeaturedAndHomeComponents/HomeBannersSection';
import { useFeaturedBoatsQuery } from '@/redux/features/adminBannerApi/adminBannerApi';
import React, { useState } from 'react';

type Tab = 'featured' | 'FLORIDA';

const FeaturedAndHomeManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('featured');
  const { data: featuredBoatsData, isLoading: isFeaturedBoatsLoading } =
    useFeaturedBoatsQuery({}, { refetchOnMountOrArgChange: true });

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Featured & Homepage Control
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage featured yachts and homepage content
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-2 p-2 bg-[#ECECF0] rounded-full max-w-full sm:max-w-max overflow-x-auto">
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              activeTab === 'featured'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Featured Boats
          </button>
          <button
            onClick={() => setActiveTab('FLORIDA')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              activeTab === 'FLORIDA'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Page Banners
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'featured' ? (
        <FeaturedSection
          featuredBoatsData={featuredBoatsData}
          isLoading={isFeaturedBoatsLoading}
        />
      ) : (
        <HomeBannersSection website="FLORIDA" />
      )}
    </div>
  );
};

export default FeaturedAndHomeManagement;
