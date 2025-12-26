import { MapPin } from 'lucide-react';

interface PreviewData {
  coverPhoto?: string | null;
  city?: string;
  state?: string;
  name?: string;
  make?: string;
  model?: string;
  buildYear?: string;
  price?: string;
}

interface RightPreviewSectionProps {
  data: PreviewData;
}

const RightPreviewSection = ({ data }: RightPreviewSectionProps) => {
  const { coverPhoto, city, state, name, make, model, buildYear, price } = data;

  // Format location string
  const location = [city, state].filter(Boolean).join(', ') || 'Florida';

  // Format listing name
  const listingName =
    name ||
    `${buildYear || '2018'} ${make || 'Viking'} ${model || '80 Enclosed Flybridge'}`;

  // Format price
  const formattedPrice = price
    ? `$${parseFloat(price).toLocaleString()}`
    : '$1,195,000';

  return (
    <div className="sticky top-6">
      <h2 className="text-lg font-semibold mb-4">Preview</h2>
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        {/* Cover Photo */}
        {coverPhoto ? (
          <img
            src={coverPhoto}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg mb-3"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
            <p className="text-gray-400 text-sm">No cover photo</p>
          </div>
        )}

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <MapPin className="w-4 h-4" />
          {location}
        </div>

        {/* Listing Name */}
        <h3 className="font-semibold text-base mb-3 line-clamp-2">
          {listingName}
        </h3>

        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-2 text-xs mb-3">
          <div>
            <p className="text-gray-500">Make</p>
            <p className="font-medium truncate">{make || 'Viking'}</p>
          </div>
          <div>
            <p className="text-gray-500">Model</p>
            <p className="font-medium truncate">{model || '80 Enclosed'}</p>
          </div>
          <div>
            <p className="text-gray-500">Year</p>
            <p className="font-medium">{buildYear || '2018'}</p>
          </div>
        </div>

        {/* Price */}
        <p className="text-cyan-600 font-semibold text-lg">
          Price: {formattedPrice}
        </p>
      </div>
    </div>
  );
};

export default RightPreviewSection;
