import React from 'react';

interface SellersHeaderProps {
  totalSellers?: number;
}

export const SellersHeader: React.FC<SellersHeaderProps> = ({
  totalSellers,
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
        Seller Management
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        Manage seller accounts and verifications
        {totalSellers !== undefined && ` • ${totalSellers} total sellers`}
      </p>
    </div>
  );
};
