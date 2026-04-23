import React from 'react';

interface ContactInfoSidebarProps {
  selectedSite: 'FLORIDA' | 'JUPITER';
  onSiteChange: (site: 'FLORIDA' | 'JUPITER') => void;
}

const ContactInfoSidebar: React.FC<ContactInfoSidebarProps> = ({
  selectedSite,
  onSiteChange,
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
          Select the site for which you want to manage contact information
        </p>
      </div>
    </div>
  );
};

export default ContactInfoSidebar;
