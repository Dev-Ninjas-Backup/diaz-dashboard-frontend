import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Save } from 'lucide-react';

interface ContactUsHeaderProps {
  isPreviewMode: boolean;
  setIsPreviewMode: (value: boolean) => void;
  onSave: () => void;
  isLoading?: boolean;
}

const ContactUsHeader: React.FC<ContactUsHeaderProps> = ({
  isPreviewMode,
  setIsPreviewMode,
  onSave,
  isLoading = false,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/content');
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Contact Information
              </h1>
              <p className="text-sm text-gray-500">
                Manage contact details and working hours
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              {isPreviewMode ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={onSave}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:bg-blue-400"
            >
              <Save className="w-4 h-4" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsHeader;
