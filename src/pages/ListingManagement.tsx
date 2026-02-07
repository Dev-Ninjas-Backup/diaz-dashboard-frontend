/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ListingsFilters,
  ListingsHeader,
  ListingsTable,
  Pagination,
} from '@/components/ListingManagement';
import { usePagination } from '@/hooks/use-pagination';
import {
  useDeleteListingMutation,
  useGetAllListingQuery,
} from '@/redux/features/listingManagement/listingManagement';
import type { ListingFilters } from '@/types/listing-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const url = 'https://development.floridayachttrader.com';
const ListingManagement: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ListingFilters>({
    search: '',
    status: '',
    seller: 'All Sellers',
    priceRange: '',
  });
  const [deleteListing] = useDeleteListingMutation();

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

  const filteredListings = useMemo(() => {
    if (!listingData?.items) return [];
    return listingData.items;
  }, [listingData, filters]);

  const handleAddListing = () => {
    navigate('/listings/add');
  };

  const handleView = (id: string) => {
    window.open(`${url}/search-listing/${id}`, '_blank');
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      await deleteListing(id)
        .unwrap()
        .then(() => {
          Swal.fire(
            'Deleted!',
            'Listing has been deleted successfully.',
            'success',
          );
        })
        .catch((error) => {
          Swal.fire('Error!', 'Failed to delete listing.', 'error');
          console.error('❌ Failed to delete listing:', error);
        });
    }
  };

  const handleExportCSV = () => {
    if (!filteredListings || filteredListings.length === 0) {
      Swal.fire('No Data', 'There are no listings to export.', 'info');
      return;
    }

    const headers = [
      'Listing ID',
      'Yacht Name',
      'Make',
      'Model',
      'Year',
      'Price',
      'Status',
      'Views',
      'Seller Name',
      'Seller Email',
      'Created Date',
    ];

    const rows = filteredListings.map((listing: any) => [
      listing.listingId || '',
      listing.name || '',
      listing.make || '',
      listing.model || '',
      listing.year || '',
      listing.price || '',
      listing.status || '',
      listing.views || 0,
      listing.seller?.name || '',
      listing.seller?.email || '',
      listing.createdAt
        ? new Date(listing.createdAt).toLocaleDateString('en-US')
        : '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row: any) =>
        row
          .map((cell: any) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(','),
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `listings_${new Date().toISOString().split('T')[0]}.csv`,
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire('Success', 'CSV exported successfully!', 'success');
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
      />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <ListingsTable
          listings={filteredListings}
          onView={handleView}
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
