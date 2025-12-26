import {
  ListingsFilters,
  ListingsHeader,
  ListingsTable,
  Pagination,
} from '@/components/ListingManagement';
import { usePagination } from '@/hooks/use-pagination';
import { useGetAllListingQuery } from '@/redux/features/listingManagement/listingManagement';
import type { ListingFilters } from '@/types/listing-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

const ListingManagement: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ListingFilters>({
    search: '',
    status: '',
    seller: 'All Sellers',
    priceRange: '',
  });

  const pagination = usePagination({ initialPage: 1, initialLimit: 10 });

  const queryParams = useMemo(() => {
    const params: Record<string, string | number> = {
      page: pagination.page,
      limit: pagination.limit,
    };

    if (filters.search && filters.search.trim()) {
      params.search = filters.search.trim();
    }

    if (filters.status && filters.status.trim()) {
      params.status = filters.status.trim();
    }

    return params;
  }, [pagination.page, pagination.limit, filters.search, filters.status]);

  const {
    data: listingData,
    isLoading,
    isError,
  } = useGetAllListingQuery(queryParams);

  useEffect(() => {
    if (listingData?.total) {
      pagination.setTotal(listingData.total);
    }
  }, [listingData?.total]);

  const uniqueSellers = useMemo((): string[] => {
    if (!listingData?.items) return [];
    const sellers = listingData.items.map(
      (item: any) => item.seller?.name || item.name || 'Unknown',
    );
    return Array.from(new Set(sellers)) as string[];
  }, [listingData]);

  const filteredListings = useMemo(() => {
    if (!listingData?.items) return [];
    return listingData.items;
  }, [listingData, filters]);

  const handleAddListing = () => {
    navigate('/listings/add');
  };

  const handleView = (id: string) => {
    console.log('Viewing listing:', id);
    // Navigate to listing detail page
    // navigate(`/listings/${id}`);
  };

  const handleEdit = (id: string) => {
    console.log('Editing listing:', id);
    // Navigate to edit page
    // navigate(`/listings/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    console.log('Deleting listing:', id);
    // Implement delete functionality
  };

  const handleExportCSV = () => {
    console.log('Exporting CSV...');
    // Implement CSV export functionality
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading listings...</p>
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
            <p className="text-red-600 font-medium">Failed to load listings</p>
            <p className="text-gray-600 mt-2">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <ListingsHeader onAddListing={handleAddListing} />

      <ListingsFilters
        filters={filters}
        onFilterChange={setFilters}
        onExport={handleExportCSV}
        sellers={uniqueSellers}
      />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <ListingsTable
          listings={filteredListings}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {!isLoading && !isError && listingData && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={pagination.goToPage}
            hasNextPage={pagination.hasNextPage}
            hasPrevPage={pagination.hasPrevPage}
            limit={pagination.limit}
            onLimitChange={pagination.setLimit}
            totalItems={pagination.totalItems}
          />
        )}
      </div>
    </div>
  );
};

export default ListingManagement;
