import React, { useState, useRef } from 'react';
import { GripVertical, Trash2, Plus } from 'lucide-react';

interface FeaturedYacht {
  id: number;
  name: string;
  manufacturer: string;
  year: string;
  price: string;
  image: string;
}

const DEMO_FEATURED_YACHTS: FeaturedYacht[] = [
  {
    id: 1,
    name: '2015 Lagoon 450 F Catamaran',
    manufacturer: 'Lagoon',
    year: '2015',
    price: '$425,000',
    image:
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=300&h=200&fit=crop',
  },
];

const FeaturedSection: React.FC = () => {
  const [featuredYachts, setFeaturedYachts] =
    useState<FeaturedYacht[]>(DEMO_FEATURED_YACHTS);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/html'));
    const newYachts = [...featuredYachts];
    const draggedItem = newYachts[dragIndex];
    newYachts.splice(dragIndex, 1);
    newYachts.splice(dropIndex, 0, draggedItem);
    setFeaturedYachts(newYachts);
  };

  const handleRemoveYacht = (id: number) => {
    setFeaturedYachts(featuredYachts.filter((yacht) => yacht.id !== id));
  };

  const handleAddFeaturedBoat = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const newYacht: FeaturedYacht = {
          id: Date.now(),
          name: 'New Yacht',
          manufacturer: 'Brand',
          year: '2024',
          price: '$0',
          image: reader.result as string,
        };
        setFeaturedYachts([...featuredYachts, newYacht]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragDropImage = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newYacht: FeaturedYacht = {
          id: Date.now(),
          name: 'New Yacht',
          manufacturer: 'Brand',
          year: '2024',
          price: '$0',
          image: reader.result as string,
        };
        setFeaturedYachts([...featuredYachts, newYacht]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-900 mb-4">
          Drag to reorder featured yachts
        </h3>
      </div>

      {/* Featured Yachts List */}
      <div className="space-y-3 mb-4">
        {featuredYachts.map((yacht, index) => (
          <div
            key={yacht.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors cursor-move bg-white"
          >
            {/* Drag Handle */}
            <GripVertical className="w-5 h-5 text-gray-400 shrink-0" />

            {/* Yacht Image */}
            <div className="w-20 h-16 rounded-lg shrink-0 overflow-hidden">
              {yacht.image ? (
                <img
                  src={yacht.image}
                  alt={yacht.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-blue-400 to-blue-600" />
              )}
            </div>

            {/* Yacht Info */}
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900">
                {yacht.name}
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                {yacht.manufacturer} • {yacht.year}
              </p>
            </div>

            {/* Price */}
            <div className="text-sm font-semibold text-cyan-600">
              {yacht.price}
            </div>

            {/* Delete Button */}
            <button
              onClick={() => handleRemoveYacht(yacht.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Featured Boat Button */}
      <div onDragOver={handleDragOver} onDrop={handleDragDropImage}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />
        <button
          onClick={handleAddFeaturedBoat}
          className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Featured Boat
        </button>
      </div>
    </div>
  );
};

export default FeaturedSection;
