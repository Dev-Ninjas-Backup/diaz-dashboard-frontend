import {
  SellerDetails,
  SellersHeader,
  SellersTable,
} from '@/components/SellerManagement';
import { useGetAllSellersQuery } from '@/redux/features/sellerManagement/sellerManagement';
import React, { useState } from 'react';

const SellerManagement: React.FC = () => {
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [isVerified, setIsVerified] = useState<boolean | undefined>(undefined);
  const [sortBy, setSortBy] = useState<
    'name' | 'boatsCount' | 'totalSalesValue' | 'createdAt' | undefined
  >(undefined);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const {
    data: sellerResponse,
    isLoading,
    isError,
  } = useGetAllSellersQuery({
    page,
    limit,
    search: search || undefined,
    isVerified,
    sortBy,
    sortOrder,
  });

  const handleViewProfile = (id: string) => {
    setSelectedSellerId(id);
  };

  const handleBack = () => {
    setSelectedSellerId(null);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilterChange = (verified: boolean | undefined) => {
    setIsVerified(verified);
    setPage(1);
  };

  const handleSort = (
    field: 'name' | 'boatsCount' | 'totalSalesValue' | 'createdAt',
  ) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
    setPage(1);
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

  const sellers = sellerResponse?.data || [];
  const metadata = sellerResponse?.metadata || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  };

  if (selectedSellerId) {
    return (
      <div className="p-4 md:p-6">
        <SellerDetails sellerId={selectedSellerId} onBack={handleBack} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <SellersHeader totalSellers={metadata.total} />

      {/* Search and Filter */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name, email, or username..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          aria-label="Filter sellers by verification status"
          value={
            isVerified === undefined ? 'all' : isVerified ? 'verified' : 'unverified'
          }
          onChange={(e) =>
            handleFilterChange(
              e.target.value === 'all'
                ? undefined
                : e.target.value === 'verified',
            )
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Sellers</option>
          <option value="verified">Verified Only</option>
          <option value="unverified">Unverified Only</option>
        </select>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <SellersTable
          sellers={sellers}
          onViewProfile={handleViewProfile}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
        />

        {/* Pagination */}
        {metadata.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {(metadata.page - 1) * metadata.limit + 1} to{' '}
              {Math.min(metadata.page * metadata.limit, metadata.total)} of{' '}
              {metadata.total} sellers
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === metadata.totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerManagement;
