/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetListingByIdQuery } from '@/redux/features/listingManagement/listingManagement';
import {
  X,
  MapPin,
  Calendar,
  Eye,
  DollarSign,
  Anchor,
  Gauge,
  Fuel,
  Users,
  Bed,
  Droplet,
} from 'lucide-react';
import React from 'react';

interface ListingDetailsModalProps {
  listingId: string;
  onClose: () => void;
}

export const ListingDetailsModal: React.FC<ListingDetailsModalProps> = ({
  listingId,
  onClose,
}) => {
  const {
    data: listing,
    isLoading,
    isError,
  } = useGetListingByIdQuery(listingId);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-lg p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading details...</p>
        </div>
      </div>
    );
  }

  if (isError || !listing) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-lg p-8 max-w-md">
          <p className="text-red-600 font-medium">
            Failed to load listing details
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg max-w-6xl w-full my-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{listing.name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Listing ID: {listing.listingId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Close"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Images */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {listing.coverImages?.map((img: any) => (
                <img
                  key={img.id}
                  src={img.url}
                  alt={img.originalFilename}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
              ))}
              {listing.galleryImages?.map((img: any) => (
                <img
                  key={img.id}
                  src={img.url}
                  alt={img.originalFilename}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
              ))}
            </div>
          </div>

          {/* Key Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <DollarSign className="w-5 h-5" />
                <span className="text-sm font-medium">Price</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(listing.price)}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium">Year</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {listing.buildYear}
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-purple-600 mb-1">
                <Eye className="w-5 h-5" />
                <span className="text-sm font-medium">Views</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {listing.views}
              </p>
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Specifications
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <Anchor className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Make & Model</p>
                  <p className="font-medium text-gray-900">
                    {listing.make} {listing.model}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Gauge className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Length</p>
                  <p className="font-medium text-gray-900">
                    {listing.length?.toFixed(2)} ft
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Gauge className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Beam</p>
                  <p className="font-medium text-gray-900">
                    {listing.beam?.toFixed(2)} ft
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Droplet className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Draft</p>
                  <p className="font-medium text-gray-900">
                    {listing.draft?.toFixed(2)} ft
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Fuel className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Fuel Type</p>
                  <p className="font-medium text-gray-900">
                    {listing.fuelType || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Class</p>
                  <p className="font-medium text-gray-900">
                    {listing.class || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Bed className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Cabins</p>
                  <p className="font-medium text-gray-900">
                    {listing.cabinsNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Droplet className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Heads</p>
                  <p className="font-medium text-gray-900">
                    {listing.headsNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Gauge className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Engines</p>
                  <p className="font-medium text-gray-900">
                    {listing.enginesNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {listing.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {listing.description}
              </p>
            </div>
          )}

          {/* Location */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Location
            </h3>
            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">
                  {listing.city}, {listing.state}
                </p>
                <p className="text-sm text-gray-500">ZIP: {listing.zip}</p>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          {listing.user && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Seller Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    src={listing.user.avatarUrl}
                    alt={listing.user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {listing.user.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {listing.user.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      {listing.user.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Engines */}
          {listing.engines && listing.engines.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Engines
              </h3>
              <div className="space-y-3">
                {listing.engines.map((engine: any, index: number) => (
                  <div key={engine.id} className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-900 mb-2">
                      Engine {index + 1}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Make</p>
                        <p className="font-medium text-gray-900">
                          {engine.make}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Model</p>
                        <p className="font-medium text-gray-900">
                          {engine.model}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Horsepower</p>
                        <p className="font-medium text-gray-900">
                          {engine.horsepower} HP
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Hours</p>
                        <p className="font-medium text-gray-900">
                          {engine.hours}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Created</p>
                <p className="font-medium text-gray-900">
                  {formatDate(listing.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Last Updated</p>
                <p className="font-medium text-gray-900">
                  {formatDate(listing.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
