import {
  Pagination,
  PromoCodeForm,
  PromoCodeHeader,
  PromoCodeTable,
} from '@/components/PromoCodeManagement';
import { usePagination } from '@/hooks/use-pagination';
import {
  useCreatePromoCodesMutation,
  useDeletePromoCodesMutation,
  useGetAllPromoCodesQuery,
  useUpdatePromoCodesMutation,
} from '@/redux/features/subscription/promoCodeApi';
import type { CreatePromoCodeRequest, PromoCode } from '@/types';
import React, { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';

const ManagePromoCodes: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPromoCode, setSelectedPromoCode] = useState<PromoCode | null>(
    null,
  );

  const pagination = usePagination({ initialPage: 1, initialLimit: 10 });

  const queryParams = useMemo(() => {
    return {
      page: pagination.page,
      limit: pagination.limit,
    };
  }, [pagination.page, pagination.limit]);

  const {
    data: promoCodeData,
    isLoading,
    isError,
  } = useGetAllPromoCodesQuery(queryParams);

  const [createPromoCode, { isLoading: isCreating }] =
    useCreatePromoCodesMutation();
  const [updatePromoCode, { isLoading: isUpdating }] =
    useUpdatePromoCodesMutation();
  const [deletePromoCode] = useDeletePromoCodesMutation();

  useEffect(() => {
    if (promoCodeData?.metadata?.total) {
      pagination.setTotal(promoCodeData.metadata.total);
    }
  }, [promoCodeData?.metadata?.total]);

  const promoCodes = useMemo(() => {
    return promoCodeData?.data || [];
  }, [promoCodeData]);

  const handleAddPromoCode = () => {
    setSelectedPromoCode(null);
    setIsFormOpen(true);
  };

  const handleEditPromoCode = (promoCode: PromoCode) => {
    setSelectedPromoCode(promoCode);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedPromoCode(null);
  };

  const handleSubmitForm = async (data: CreatePromoCodeRequest) => {
    try {
      if (selectedPromoCode) {
        // Update existing promo code
        await updatePromoCode({
          promoId: selectedPromoCode.id,
          promoData: data,
        }).unwrap();

        Swal.fire({
          title: 'Success!',
          text: 'Promo code updated successfully.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      } else {
        // Create new promo code
        await createPromoCode({ promoData: data }).unwrap();

        Swal.fire({
          title: 'Success!',
          text: 'Promo code created successfully.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      }

      handleCloseForm();
    } catch (error: any) {
      console.error('Failed to save promo code:', error);
      Swal.fire({
        title: 'Error!',
        text:
          error?.data?.message ||
          'Failed to save promo code. Please try again.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  };

  const handleDeletePromoCode = async (id: string) => {
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
      try {
        await deletePromoCode({ promoId: id }).unwrap();

        Swal.fire({
          title: 'Deleted!',
          text: 'Promo code has been deleted successfully.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      } catch (error: any) {
        console.error('Failed to delete promo code:', error);
        Swal.fire({
          title: 'Error!',
          text: error?.data?.message || 'Failed to delete promo code.',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading promo codes...</p>
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
            <p className="text-red-600 font-medium">
              Failed to load promo codes
            </p>
            <p className="text-gray-600 mt-2">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <PromoCodeHeader
        onAddPromoCode={handleAddPromoCode}
        totalCodes={promoCodeData?.metadata?.total || 0}
      />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <PromoCodeTable
          promoCodes={promoCodes}
          onEdit={handleEditPromoCode}
          onDelete={handleDeletePromoCode}
        />

        {!isLoading && !isError && promoCodeData && (
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

      <PromoCodeForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        promoCode={selectedPromoCode}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
};

export default ManagePromoCodes;
