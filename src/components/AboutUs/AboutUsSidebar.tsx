import React from 'react';
import type { AboutUsSidebarProps } from './types';

export const AboutUsSidebar: React.FC<AboutUsSidebarProps> = ({
  selectedSite,
  onSiteChange,
  updatedAt,
}) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Site Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label
          htmlFor="site"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Site *
        </label>
        <select
          id="site"
          name="site"
          value={selectedSite}
          onChange={onSiteChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="FLORIDA">Florida</option>
          <option value="JUPITER">Jupiter</option>
        </select>
        <p className="text-xs text-gray-500 mt-2">
          Select which site this content applies to
        </p>
      </div>

      {/* Page Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Page Info</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium">Type:</span> Static Page
          </p>
          <p>
            <span className="font-medium">Site:</span> {selectedSite}
          </p>
          {updatedAt && (
            <p>
              <span className="font-medium">Last Updated:</span>{' '}
              {new Date(updatedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
