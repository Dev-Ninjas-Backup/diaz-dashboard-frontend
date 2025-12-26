import type { Listing } from '@/types/listing-types';
import { Edit2, Eye, Trash2 } from 'lucide-react';
import React from 'react';

interface ListingsTableProps {
  listings: Listing[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const STATUS_COLORS: Record<string, string> = {
  ONBOARDING_PENDING: 'bg-yellow-100 text-yellow-800',
  DRAFT: 'bg-gray-100 text-gray-800',
  PENDING: 'bg-blue-100 text-blue-800',
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-gray-100 text-gray-800',
  SOLD: 'bg-purple-100 text-purple-800',
};

const STATUS_LABELS: Record<string, string> = {
  ONBOARDING_PENDING: 'Onboarding Pending',
  DRAFT: 'Draft',
  PENDING: 'Pending',
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  SOLD: 'Sold',
};

export const ListingsTable: React.FC<ListingsTableProps> = ({
  listings,
  onView,
  onEdit,
  onDelete,
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

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Listing ID
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Yacht
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Seller
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Views
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {listings.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="px-4 md:px-6 py-8 text-center text-sm text-gray-500"
              >
                No listings found
              </td>
            </tr>
          ) : (
            listings.map((listing) => (
              <tr
                key={listing.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm font-medium text-blue-600">
                    {listing.listingId}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {listing.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {listing.make} {listing.model} • {listing.year}
                    </span>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-900">
                      {listing.seller.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {listing.seller.email}
                    </span>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm font-medium text-cyan-600">
                    {formatPrice(listing.price)}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      STATUS_COLORS[listing.status]
                    }`}
                  >
                    {STATUS_LABELS[listing.status]}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm text-gray-900">{listing.views}</span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm text-gray-900">
                    {formatDate(listing.createdAt)}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
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
                      <Edit2 className="w-4 h-4" />
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
