import type { ListingFilters as Filters } from '@/types/listing-types';
import { Download } from 'lucide-react';
import React from 'react';

interface ListingsFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onExport: () => void;
  sellers: string[];
}

export const ListingsFilters: React.FC<ListingsFiltersProps> = ({
  filters,
  onFilterChange,
  onExport,
  sellers,
}) => {
  const handleStatusChange = (status: string) => {
    onFilterChange({ ...filters, status });
  };

  const handleSellerChange = (seller: string) => {
    onFilterChange({ ...filters, seller });
  };

  const handlePriceRangeChange = (priceRange: string) => {
    onFilterChange({ ...filters, priceRange });
  };

  const handleSearchChange = (search: string) => {
    onFilterChange({ ...filters, search });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 flex-1">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search listings..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:min-w-60"
          />

          {/* Status Filter */}
          <div className="relative w-full sm:w-auto">
            <select
              value={filters.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="ONBOARDING_PENDING">Onboarding Pending</option>
              <option value="DRAFT">Draft</option>
              <option value="PENDING">Pending</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SOLD">Sold</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Seller Filter */}
          <div className="relative w-full sm:w-auto">
            <select
              value={filters.seller}
              onChange={(e) => handleSellerChange(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option>All Sellers</option>
              {sellers.map((seller) => (
                <option key={seller} value={seller}>
                  {seller}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Price Range */}
          <input
            type="text"
            placeholder="Price range..."
            value={filters.priceRange}
            onChange={(e) => handlePriceRangeChange(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:min-w-40"
          />
        </div>

        {/* Export Button */}
        <button
          onClick={onExport}
          className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full lg:w-auto justify-center"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>
    </div>
  );
};
