import { Upload, X } from 'lucide-react';
import React, { useState } from 'react';
import type { FeaturedBrandFormData } from './types';

interface AddBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FeaturedBrandFormData) => void;
  isSubmitting: boolean;
}

const AddBrandModal: React.FC<AddBrandModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState<FeaturedBrandFormData>({
    logo: null,
    logoPreview: null,
    site: 'FLORIDA',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          logo: file,
          logoPreview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.logo) {
      onSubmit(formData);
      setFormData({
        logo: null,
        logoPreview: null,
        site: 'FLORIDA',
      });
    }
  };

  const handleClose = () => {
    setFormData({
      logo: null,
      logoPreview: null,
      site: 'FLORIDA',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Add Featured Brand
          </h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Close modal"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Logo <span className="text-red-500">*</span>
            </label>
            {formData.logoPreview ? (
              <div className="space-y-2">
                <img
                  src={formData.logoPreview}
                  alt="Logo preview"
                  className="w-full h-40 object-contain border border-gray-200 rounded p-2 bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, logo: null, logoPreview: null })
                  }
                  className="w-full px-3 py-2 text-sm text-red-600 border border-red-300 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Remove Logo
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  Click to upload brand logo
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WEBP (Max 5MB)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.logo || isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Adding...' : 'Add Brand'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrandModal;
