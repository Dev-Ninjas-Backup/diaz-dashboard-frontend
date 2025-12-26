import type { SellerData } from '@/types/seller-types';
import React from 'react';

interface SellersTableProps {
  sellers: SellerData[];
  onViewProfile: (id: string) => void;
}

export const SellersTable: React.FC<SellersTableProps> = ({
  sellers,
  onViewProfile,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-cyan-500',
      'bg-orange-500',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Seller Name
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Boats
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Sales
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sellers.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-4 md:px-6 py-8 text-center text-sm text-gray-500"
              >
                No sellers found
              </td>
            </tr>
          ) : (
            sellers.map((seller) => (
              <tr
                key={seller.sellerId}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    {seller.avatarUrl ? (
                      <img
                        src={seller.avatarUrl}
                        alt={seller.name}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div
                        className={`${getAvatarColor(seller.name)} w-10 h-10 rounded-full flex items-center justify-center shrink-0`}
                      >
                        <span className="text-white text-sm font-semibold">
                          {getInitials(seller.name)}
                        </span>
                      </div>
                    )}
                    {/* Name */}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {seller.name}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm text-gray-900">
                    @{seller.username}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm text-gray-900">{seller.email}</span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm text-gray-900">
                    {seller.boatsCount}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm font-medium text-cyan-600">
                    {formatPrice(seller.totalSalesValue)}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <button
                    onClick={() => onViewProfile(seller.sellerId)}
                    className="text-sm text-gray-700 hover:text-gray-900 font-medium border border-gray-300 hover:border-gray-400 px-4 py-1.5 rounded-lg transition-colors"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
