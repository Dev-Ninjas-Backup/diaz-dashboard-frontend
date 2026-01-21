import { Trash2 } from 'lucide-react';
import React from 'react';

interface WhyUsSidebarProps {
  selectedSite: 'FLORIDA' | 'JUPITER';
  onSiteChange: (site: 'FLORIDA' | 'JUPITER') => void;
  hasData: boolean;
  onDelete: () => void;
}

const WhyUsSidebar: React.FC<WhyUsSidebarProps> = ({
  selectedSite,
  onSiteChange,
  hasData,
  onDelete,
}) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Site Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label
          htmlFor="site"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Site <span className="text-red-500">*</span>
        </label>
        <select
          id="site"
          name="site"
          value={selectedSite}
          onChange={(e) =>
            onSiteChange(e.target.value as 'FLORIDA' | 'JUPITER')
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="FLORIDA">Florida</option>
          <option value="JUPITER">Jupiter</option>
        </select>
        <p className="text-xs text-gray-500 mt-2">
          Select the site for which you want to manage Why Us content
        </p>
      </div>

      {/* Delete Button */}
      {hasData && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Danger Zone
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Delete the Why Us content for {selectedSite}
          </p>
          <button
            onClick={onDelete}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete Why Us
          </button>
        </div>
      )}
    </div>
  );
};

export default WhyUsSidebar;
