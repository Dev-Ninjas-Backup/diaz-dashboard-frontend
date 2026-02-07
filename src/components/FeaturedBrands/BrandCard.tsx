import { Trash2, Upload } from 'lucide-react';
import React from 'react';
import type { FeaturedBrandItem } from './types';

interface BrandCardProps {
  brand: FeaturedBrandItem;
  onDelete: (id: string) => void;
  onUpdate: (id: string, file: File) => void;
  isDeleting?: boolean;
}

const BrandCard: React.FC<BrandCardProps> = ({
  brand,
  onDelete,
  onUpdate,
  isDeleting = false,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpdate(brand.id, file);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg space-y-3 relative group hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {brand.featuredbrandLogo?.url && (
            <img
              src={brand.featuredbrandLogo.url}
              alt={brand.featuredbrandLogo.originalFilename}
              className="w-full h-32 object-contain border border-gray-200 rounded p-2 bg-white"
            />
          )}
        </div>
        <button
          onClick={() => onDelete(brand.id)}
          disabled={isDeleting}
          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Delete brand"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="text-xs text-gray-600 space-y-1">
        <p>
          <span className="font-medium">File:</span>{' '}
          {brand.featuredbrandLogo?.originalFilename || 'N/A'}
        </p>
        <p>
          <span className="font-medium">Size:</span>{' '}
          {brand.featuredbrandLogo?.size
            ? `${(brand.featuredbrandLogo.size / 1024).toFixed(2)} KB`
            : 'N/A'}
        </p>
        <p>
          <span className="font-medium">Site:</span> {brand.site}
        </p>
      </div>

      <label className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
        <Upload className="w-4 h-4" />
        <span className="text-sm">Update Logo</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default BrandCard;
