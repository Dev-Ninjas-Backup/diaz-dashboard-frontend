import {
  SellerDetails,
  SellersHeader,
  SellersTable,
} from '@/components/SellerManagement';
import { useGetAllSellersQuery } from '@/redux/features/sellerManagement/sellerManagement';
import React, { useState } from 'react';

const SellerManagement: React.FC = () => {
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);

  // Fetch all sellers without pagination
  const { data: sellerData, isLoading, isError } = useGetAllSellersQuery({});

  const handleViewProfile = (id: string) => {
    setSelectedSellerId(id);
  };

  const handleBack = () => {
    setSelectedSellerId(null);
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading sellers...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 font-medium">Failed to load sellers</p>
            <p className="text-gray-600 mt-2">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  const sellers = Array.isArray(sellerData) ? sellerData : [];

  // If a seller is selected, show details view
  if (selectedSellerId) {
    return (
      <div className="p-4 md:p-6">
        <SellerDetails sellerId={selectedSellerId} onBack={handleBack} />
      </div>
    );
  }

  // Otherwise show list view
  return (
    <div className="p-4 md:p-6">
      <SellersHeader totalSellers={sellers.length} />

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <SellersTable sellers={sellers} onViewProfile={handleViewProfile} />
      </div>
    </div>
  );
};

export default SellerManagement;
