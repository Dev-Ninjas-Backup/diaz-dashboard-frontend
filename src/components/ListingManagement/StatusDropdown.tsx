import { useUpdateListingStatusMutation } from '@/redux/features/listingManagement/listingManagement';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export type BoatListingStatus =
  | 'ONBOARDING_PENDING'
  | 'DRAFT'
  | 'PENDING'
  | 'ACTIVE'
  | 'INACTIVE'
  | 'SOLD';

interface StatusDropdownProps {
  listingId: string;
  currentStatus: BoatListingStatus;
  onStatusChange?: () => void;
}

const STATUS_OPTIONS: {
  value: BoatListingStatus;
  label: string;
  color: string;
}[] = [
  {
    value: 'ONBOARDING_PENDING',
    label: 'Onboarding Pending',
    color: 'bg-yellow-100 text-yellow-800',
  },
  { value: 'DRAFT', label: 'Draft', color: 'bg-gray-100 text-gray-800' },
  { value: 'PENDING', label: 'Pending', color: 'bg-blue-100 text-blue-800' },
  { value: 'ACTIVE', label: 'Active', color: 'bg-green-100 text-green-800' },
  { value: 'INACTIVE', label: 'Inactive', color: 'bg-gray-100 text-gray-800' },
  { value: 'SOLD', label: 'Sold', color: 'bg-purple-100 text-purple-800' },
];

export const StatusDropdown: React.FC<StatusDropdownProps> = ({
  listingId,
  currentStatus,
  onStatusChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateStatus, { isLoading }] = useUpdateListingStatusMutation();

  const currentOption = STATUS_OPTIONS.find(
    (opt) => opt.value === currentStatus,
  );

  const handleStatusChange = async (newStatus: BoatListingStatus) => {
    if (newStatus === currentStatus) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);

    try {
      await updateStatus({ id: listingId, status: newStatus }).unwrap();

      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: `Status changed to ${STATUS_OPTIONS.find((s) => s.value === newStatus)?.label}`,
        timer: 2000,
        showConfirmButton: false,
      });

      // Trigger refetch
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error: unknown) {
      const errorMessage =
        error &&
        typeof error === 'object' &&
        'data' in error &&
        error.data &&
        typeof error.data === 'object' &&
        'message' in error.data
          ? String(error.data.message)
          : 'Failed to update status';

      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: errorMessage,
      });
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${currentOption?.color} hover:opacity-80 transition-opacity disabled:opacity-50`}
      >
        {isLoading ? 'Updating...' : currentOption?.label}
        <ChevronDown className="w-3 h-3" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleStatusChange(option.value)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  option.value === currentStatus ? 'bg-gray-50 font-medium' : ''
                }`}
              >
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${option.color}`}
                >
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
