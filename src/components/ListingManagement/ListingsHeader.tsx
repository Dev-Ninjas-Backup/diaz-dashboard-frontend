import { Plus } from 'lucide-react';
import React from 'react';

interface ListingsHeaderProps {
  onAddListing: () => void;
}

export const ListingsHeader: React.FC<ListingsHeaderProps> = ({
  onAddListing,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Listings Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage all yacht listings and approvals
        </p>
      </div>
      <button
        onClick={onAddListing}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto justify-center"
      >
        <Plus className="w-4 h-4" />
        Add New Listing
      </button>
    </div>
  );
};
