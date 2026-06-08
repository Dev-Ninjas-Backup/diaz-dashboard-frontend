import type { Listing } from '@/types/listing-types';
import { Edit, Eye, Trash2 } from 'lucide-react';
import React from 'react';
import type { BoatListingStatus } from './StatusDropdown';
import { StatusDropdown } from './StatusDropdown';

interface ListingsTableProps {
  listings: Listing[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusUpdate?: () => void;
}

export const ListingsTable: React.FC<ListingsTableProps> = ({
  listings,
  onView,
  onEdit,
  onDelete,
  onStatusUpdate,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (listings.length === 0) {
    return (
      <div className="px-4 md:px-6 py-12 text-center">
        <p className="text-gray-500">No listings found</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Listing ID
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Yacht
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seller
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Views
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {listings.map((listing) => (
              <tr
                key={listing.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-blue-600">
                    {listing.listingId}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {listing.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {listing.make} {listing.model} • {listing.year}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-900">
                      {listing.seller.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {listing.seller.email}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-cyan-600">
                    {formatPrice(listing.price)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <StatusDropdown
                    listingId={listing.id}
                    currentStatus={listing.status as BoatListingStatus}
                    onStatusChange={onStatusUpdate}
                  />
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">{listing.views}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">
                    {formatDate(listing.createdAt)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(listing.id)}
                      className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(listing.id)}
                      className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(listing.id)}
                      className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-gray-200">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {listing.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {listing.make} {listing.model} • {listing.year}
                </p>
              </div>
              <StatusDropdown
                listingId={listing.id}
                currentStatus={listing.status as BoatListingStatus}
                onStatusChange={onStatusUpdate}
              />
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Listing ID</p>
                <p className="text-sm font-medium text-blue-600">
                  {listing.listingId}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Price</p>
                <p className="text-sm font-semibold text-cyan-600">
                  {formatPrice(listing.price)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Seller</p>
                <p className="text-sm text-gray-900 truncate">
                  {listing.seller.name}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Views</p>
                <p className="text-sm text-gray-900">{listing.views}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">
                {formatDate(listing.createdAt)}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onView(listing.id)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="View"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onEdit(listing.id)}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(listing.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
